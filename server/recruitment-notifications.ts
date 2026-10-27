import nodemailer from "nodemailer";
import { z } from "zod";
import type { RecruitmentApplication } from "@shared/schema";

export function createRecruitmentMailTransport() {
  const user = z.string().email().parse(process.env.PURELYMAIL_SMTP_USER);
  const pass = process.env.PURELYMAIL_SMTP_PASSWORD;
  if (!pass) throw new Error("Recruitment SMTP password is not configured");
  return nodemailer.createTransport({
    host: "smtp.purelymail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    tls: { minVersion: "TLSv1.2" },
  });
}

type MailSender = Pick<ReturnType<typeof createRecruitmentMailTransport>, "sendMail">;

export async function sendRecruitmentReceipt(
  application: RecruitmentApplication,
  transport?: MailSender,
): Promise<void> {
  const from = z.string().email().parse(process.env.RECRUITMENT_EMAIL_FROM);
  const to = z.string().email().parse(application.email);
  const isVendor = application.applicationType === "vendor";
  const kind = isVendor ? "vendor" : "driver";
  // Plain text only: applicant names never become mail headers or HTML.
  const name = (isVendor ? application.businessName : application.firstName)
    ?.replace(/[\r\n]+/g, " ").trim() || "there";
  const text = [
    `Hi ${name},`,
    "",
    isVendor
      ? "Thanks for your interest in partnering with Jíjé!"
      : "Thanks for your interest in delivering with Jíjé!",
    "",
    isVendor
      ? "We’ve received your submission and are excited to explore how we can help your business reach more customers through our marketplace."
      : "We’ve received your submission and are excited to explore how you could help connect customers with food and groceries through our marketplace.",
    "",
    "Our team will review your information and be in touch with the next steps.",
    "",
    isVendor
      ? "We look forward to working with you!"
      : "We look forward to exploring this opportunity with you!",
    "",
    "Please note: This confirms your interest registration only—not approval or account creation or activation. Commercial terms and launch timing are not yet finalized.",
    "",
    "The Jíjé Team",
  ].join("\n");
  const result = await (transport ?? createRecruitmentMailTransport()).sendMail({
    from: { name: "Jíjé Recruitment", address: from },
    replyTo: from,
    to,
    subject: `Jíjé — ${kind} interest registration received`,
    text,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  if (!result.accepted?.length || result.rejected?.length) {
    throw new Error("Recruitment receipt recipient was not accepted");
  }
}

export async function notifyRecruitmentApplication(
  application: RecruitmentApplication,
  transport?: MailSender,
): Promise<void> {
  // Configuration is server-only. Never use applicant input for sender or recipient headers.
  const from = z.string().email().parse(process.env.RECRUITMENT_EMAIL_FROM);
  const to = z.string().email().parse(process.env.RECRUITMENT_EMAIL_TO);
  const kind = application.applicationType === "vendor" ? "Vendor" : "Driver";
  const details = [
    `Jíjé — new ${kind.toLowerCase()} interest registration`,
    "",
    `Application ID: ${application.id}`,
    `Received: ${application.createdAt.toISOString()}`,
    `Name: ${application.firstName} ${application.lastName}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `City / area: ${application.cityArea}`,
    application.applicationType === "vendor"
      ? `Business: ${application.businessName}\nBusiness type: ${application.businessType}`
      : `Vehicle: ${application.vehicleType}`,
    "",
    "The full application is saved in the recruitment database for authorized review.",
    "This is an interest registration, not an approved account or offer.",
    "Contains personal information. Share only with authorized Jíjé team members.",
  ].join("\n");
  const result = await (transport ?? createRecruitmentMailTransport()).sendMail({
    from: { name: "Jíjé Recruitment", address: from },
    to,
    subject: `Jíjé: new ${kind.toLowerCase()} application #${application.id}`,
    text: details,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  if (!result.accepted?.length || result.rejected?.length) {
    throw new Error("Recruitment email recipient was not accepted");
  }
}
