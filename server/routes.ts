
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { recruitmentApplicationInputSchema } from "@shared/schema";
import { z } from "zod";

const applicationAttempts = new Map<string, number[]>();
const APPLICATION_RATE_LIMIT = 5;
const APPLICATION_RATE_WINDOW_MS = 60 * 60 * 1000;
let lastRateLimitCleanup = 0;

function isRateLimited(ip: string) {
  const now = Date.now();
  if (now - lastRateLimitCleanup > 10 * 60 * 1000) {
    applicationAttempts.forEach((timestamps, key) => {
      const active = timestamps.filter((timestamp) => now - timestamp < APPLICATION_RATE_WINDOW_MS);
      if (active.length) applicationAttempts.set(key, active);
      else applicationAttempts.delete(key);
    });
    lastRateLimitCleanup = now;
  }
  const recent = (applicationAttempts.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < APPLICATION_RATE_WINDOW_MS,
  );
  if (recent.length >= APPLICATION_RATE_LIMIT) {
    applicationAttempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  applicationAttempts.set(ip, recent);
  return false;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.waitlist.create.path, async (req, res) => {
    try {
      const input = api.waitlist.create.input.parse(req.body);
      
      // Check for duplicates
      const existing = await storage.getWaitlistEntryByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "This email is already on the waitlist." });
      }

      const entry = await storage.createWaitlistEntry(input);
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post("/api/applications", async (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({
        message: "Too many application attempts. Please wait and try again.",
      });
    }

    // Hidden honeypot: discard automated submissions without storing user data.
    if (typeof req.body?.faxNumber === "string" && req.body.faxNumber.length > 0) {
      return res.status(201).json({ received: true });
    }

    try {
      const input = recruitmentApplicationInputSchema.parse(req.body);
      const existing = await storage.getRecruitmentApplicationByEmail(
        input.applicationType,
        input.email,
      );
      if (existing) {
        return res.status(409).json({
          message:
            input.applicationType === "vendor"
              ? "An application for this business contact email has already been received."
              : "A driver application for this email has already been received.",
        });
      }

      const application = await storage.createRecruitmentApplication({
        ...input,
        source: input.applicationType === "vendor" ? "/vendors" : "/drivers",
      });
      return res.status(201).json({
        id: application.id,
        applicationType: application.applicationType,
        status: application.status,
        createdAt: application.createdAt,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0]?.message ?? "Please check your application details.",
          field: err.errors[0]?.path.join("."),
        });
      }
      if (typeof err === "object" && err !== null && "code" in err && err.code === "23505") {
        return res.status(409).json({
          message: "An application with this email address has already been received.",
        });
      }
      console.error(
        "Recruitment application save failed:",
        err instanceof Error ? err.name : "UnknownError",
      );
      return res.status(500).json({
        message: "We couldn’t save your application just now. Please try again later.",
      });
    }
  });

  // Seed with a test entry if empty
  const testEmail = "test@example.com";
  const existing = await storage.getWaitlistEntryByEmail(testEmail);
  if (!existing) {
    await storage.createWaitlistEntry({ email: testEmail });
    console.log("Seeded database with test waitlist entry");
  }

  return httpServer;
}
