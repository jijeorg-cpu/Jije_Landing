import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import { createServer } from "node:http";
import nodemailer from "nodemailer";
import type { RecruitmentApplication } from "@shared/schema";
import { notifyRecruitmentApplication, sendRecruitmentReceipt } from "./recruitment-notifications";
import { registerRoutes } from "./routes";
import { storage } from "./storage";

const application = (type: "vendor" | "driver") => ({
  id: 123,
  applicationType: type,
  status: "New",
  firstName: "Test",
  lastName: "Applicant",
  email: "applicant@example.com",
  phone: "4165550100",
  cityArea: "Toronto",
  businessName: type === "vendor" ? "Test Kitchen" : null,
  businessType: type === "vendor" ? "Restaurant" : null,
  vehicleType: type === "driver" ? "Bicycle" : null,
  createdAt: new Date("2026-10-25T12:00:00Z"),
} as RecruitmentApplication);

test("notifications use the configured team addresses and type-specific text", async () => {
  const previousFrom = process.env.RECRUITMENT_EMAIL_FROM;
  const previousTo = process.env.RECRUITMENT_EMAIL_TO;
  process.env.RECRUITMENT_EMAIL_FROM = "sender@example.com";
  process.env.RECRUITMENT_EMAIL_TO = "team@example.com";
  try {
    for (const type of ["vendor", "driver"] as const) {
      const stream = nodemailer.createTransport({ streamTransport: true, buffer: true });
      const transport = {
        async sendMail(options: Parameters<typeof stream.sendMail>[0]) {
          assert.deepEqual(options.from, { name: "Jíjé Recruitment", address: "sender@example.com" });
          assert.equal(options.to, "team@example.com");
          assert.match(options.subject!, new RegExp(`${type} application #123`));
          assert.match(options.text as string, type === "vendor" ? /Test Kitchen/ : /Bicycle/);
          assert.match(options.text as string, /not an approved account or offer/);
          const message = await stream.sendMail(options);
          assert.ok(message.message);
          return { ...message, accepted: ["team@example.com"], rejected: [] };
        },
      };
      await notifyRecruitmentApplication(application(type), transport);
    }
    await assert.rejects(notifyRecruitmentApplication(application("vendor"), {
      async sendMail() { throw new Error("SMTP unavailable"); },
    }), /SMTP unavailable/);
    await assert.rejects(notifyRecruitmentApplication(application("driver"), {
      async sendMail() { return { accepted: [], rejected: ["team@example.com"] }; },
    }), /not accepted/);
    delete process.env.RECRUITMENT_EMAIL_TO;
    await assert.rejects(notifyRecruitmentApplication(application("driver"), {
      async sendMail() { assert.fail("Must not send without a configured recipient"); },
    }));
  } finally {
    if (previousFrom === undefined) delete process.env.RECRUITMENT_EMAIL_FROM;
    else process.env.RECRUITMENT_EMAIL_FROM = previousFrom;
    if (previousTo === undefined) delete process.env.RECRUITMENT_EMAIL_TO;
    else process.env.RECRUITMENT_EMAIL_TO = previousTo;
  }
});

test("approved receipts address only the applicant and preserve type-specific copy", async () => {
  const previousFrom = process.env.RECRUITMENT_EMAIL_FROM;
  process.env.RECRUITMENT_EMAIL_FROM = "admin@jije.ca";
  try {
    for (const type of ["vendor", "driver"] as const) {
      const stream = nodemailer.createTransport({ streamTransport: true, buffer: true });
      await sendRecruitmentReceipt(application(type), {
        async sendMail(options: Parameters<typeof stream.sendMail>[0]) {
          assert.deepEqual(options.from, { name: "Jíjé Recruitment", address: "admin@jije.ca" });
          assert.equal(options.replyTo, "admin@jije.ca");
          assert.equal(options.to, "applicant@example.com");
          assert.equal(options.cc, undefined);
          assert.equal(options.bcc, undefined);
          assert.equal(options.subject, `Jíjé — ${type} interest registration received`);
          assert.equal(options.text, [
            `Hi ${type === "vendor" ? "Test Kitchen" : "Test"},`,
            "",
            type === "vendor"
              ? "Thanks for your interest in partnering with Jíjé!"
              : "Thanks for your interest in delivering with Jíjé!",
            "",
            type === "vendor"
              ? "We’ve received your submission and are excited to explore how we can help your business reach more customers through our marketplace."
              : "We’ve received your submission and are excited to explore how you could help connect customers with food and groceries through our marketplace.",
            "",
            "Our team will review your information and be in touch with the next steps.",
            "",
            type === "vendor" ? "We look forward to working with you!" : "We look forward to exploring this opportunity with you!",
            "",
            "Please note: This confirms your interest registration only—not approval or account creation or activation. Commercial terms and launch timing are not yet finalized.",
            "",
            "The Jíjé Team",
          ].join("\n"));
          assert.equal(options.disableFileAccess, true);
          assert.equal(options.disableUrlAccess, true);
          const message = await stream.sendMail(options);
          assert.ok(message.message);
          return { ...message, accepted: ["applicant@example.com"], rejected: [] };
        },
      });
      await assert.rejects(sendRecruitmentReceipt(application(type), {
        async sendMail() { throw new Error("SMTP unavailable"); },
      }), /SMTP unavailable/);
      await assert.rejects(sendRecruitmentReceipt(application(type), {
        async sendMail() { return { accepted: [], rejected: ["applicant@example.com"] }; },
      }), /not accepted/);
    }
    await assert.rejects(sendRecruitmentReceipt({
      ...application("vendor"), email: "invalid\r\nBcc: other@example.com",
    }, {
      async sendMail() { assert.fail("Must reject invalid recipient headers"); },
    }));
    delete process.env.RECRUITMENT_EMAIL_FROM;
    await assert.rejects(sendRecruitmentReceipt(application("driver"), {
      async sendMail() { assert.fail("Must not send without configured sender"); },
    }));
  } finally {
    if (previousFrom === undefined) delete process.env.RECRUITMENT_EMAIL_FROM;
    else process.env.RECRUITMENT_EMAIL_FROM = previousFrom;
  }
});

test("routes isolate both mail channels and suppress mail for unsaved submissions", async () => {
  const original = {
    waitlist: storage.getWaitlistEntryByEmail,
    lookup: storage.getRecruitmentApplicationByEmail,
    create: storage.createRecruitmentApplication,
  };
  const events: string[] = [];
  let duplicate = false;
  let saveError: Error | undefined;
  let teamFails = false;
  let receiptFails = false;
  storage.getWaitlistEntryByEmail = async () => ({ id: 1, email: "test@example.com", createdAt: null });
  storage.getRecruitmentApplicationByEmail = async () => duplicate ? application("vendor") : undefined;
  storage.createRecruitmentApplication = async (input) => {
    if (saveError) throw saveError;
    events.push(`saved:${input.applicationType}`);
    return application(input.applicationType);
  };
  const app = express();
  app.set("trust proxy", "loopback");
  app.use(express.json());
  const server = createServer(app);
  try {
    await registerRoutes(server, app, async (entry) => {
      events.push(`notified:${entry.applicationType}`);
      if (teamFails) throw new Error("SMTP unavailable");
    }, async (entry) => {
      events.push(`receipt:${entry.applicationType}`);
      if (receiptFails) throw new Error("Receipt SMTP unavailable");
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    let requestNumber = 0;
    const submit = (body: unknown, ip = `192.0.2.${++requestNumber}`) => fetch(`http://127.0.0.1:${address.port}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
      body: JSON.stringify(body),
    });
    const base = { firstName: "Test", lastName: "Applicant", email: "applicant@example.com",
      phone: "4165550100", cityArea: "Toronto", contactConsent: true };
    const vendor = { ...base, applicationType: "vendor", businessName: "Test Kitchen", businessType: "Restaurant" };
    const driver = { ...base, applicationType: "driver", vehicleType: "Bicycle", isAtLeast18: true };
    for (const body of [vendor, driver]) {
      for (const failures of [[false, false], [true, false], [false, true], [true, true]]) {
        [teamFails, receiptFails] = failures;
        events.length = 0;
        const response = await submit(body);
        assert.equal(response.status, 201);
        const result = await response.json();
        assert.equal(result.id, 123);
        assert.equal(result.applicationType, body.applicationType);
        assert.deepEqual(events, [
          `saved:${body.applicationType}`, `notified:${body.applicationType}`, `receipt:${body.applicationType}`,
        ]);
      }
    }
    events.length = 0;
    duplicate = true;
    for (const body of [vendor, driver]) assert.equal((await submit(body)).status, 409);
    duplicate = false;
    for (const body of [vendor, driver]) {
      saveError = new Error("Database unavailable");
      assert.equal((await submit(body)).status, 500);
      saveError = Object.assign(new Error("Concurrent duplicate"), { code: "23505" });
      assert.equal((await submit(body)).status, 409);
    }
    saveError = undefined;
    assert.equal((await submit({})).status, 400);
    assert.equal((await submit({ faxNumber: "spam" })).status, 201);
    for (let i = 0; i < 5; i++) assert.equal((await submit({}, "198.51.100.1")).status, 400);
    assert.equal((await submit(driver, "198.51.100.1")).status, 429);
    assert.deepEqual(events, []);
  } finally {
    storage.getWaitlistEntryByEmail = original.waitlist;
    storage.getRecruitmentApplicationByEmail = original.lookup;
    storage.createRecruitmentApplication = original.create;
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
