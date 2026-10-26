import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import { createServer } from "node:http";
import nodemailer from "nodemailer";
import type { RecruitmentApplication } from "@shared/schema";
import { notifyRecruitmentApplication } from "./recruitment-notifications";
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

test("routes save before notifying, survive mail failure, and do not notify rejected submissions", async () => {
  const original = {
    waitlist: storage.getWaitlistEntryByEmail,
    lookup: storage.getRecruitmentApplicationByEmail,
    create: storage.createRecruitmentApplication,
  };
  const events: string[] = [];
  let duplicate = false;
  let saveFails = false;
  storage.getWaitlistEntryByEmail = async () => ({ id: 1, email: "test@example.com", createdAt: null });
  storage.getRecruitmentApplicationByEmail = async () => duplicate ? application("vendor") : undefined;
  storage.createRecruitmentApplication = async (input) => {
    if (saveFails) throw new Error("Database unavailable");
    events.push(`saved:${input.applicationType}`);
    return application(input.applicationType);
  };
  const app = express();
  app.use(express.json());
  const server = createServer(app);
  try {
    await registerRoutes(server, app, async (entry) => {
      events.push(`notified:${entry.applicationType}`);
      throw new Error("SMTP unavailable");
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const submit = (body: unknown) => fetch(`http://127.0.0.1:${address.port}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const base = { firstName: "Test", lastName: "Applicant", email: "applicant@example.com",
      phone: "4165550100", cityArea: "Toronto", contactConsent: true };
    const vendor = { ...base, applicationType: "vendor", businessName: "Test Kitchen", businessType: "Restaurant" };
    const driver = { ...base, applicationType: "driver", vehicleType: "Bicycle", isAtLeast18: true };
    for (const body of [vendor, driver]) {
      const response = await submit(body);
      assert.equal(response.status, 201);
      assert.equal((await response.json()).id, 123);
    }
    assert.deepEqual(events, ["saved:vendor", "notified:vendor", "saved:driver", "notified:driver"]);
    duplicate = true;
    assert.equal((await submit(vendor)).status, 409);
    duplicate = false;
    assert.equal((await submit({})).status, 400);
    assert.equal((await submit({ faxNumber: "spam" })).status, 201);
    assert.equal((await submit(driver)).status, 429);
    assert.equal(events.length, 4);
  } finally {
    storage.getWaitlistEntryByEmail = original.waitlist;
    storage.getRecruitmentApplicationByEmail = original.lookup;
    storage.createRecruitmentApplication = original.create;
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
