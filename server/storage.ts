
import { db } from "./db";
import {
  recruitmentApplications,
  waitlistEntries,
  type InsertWaitlistEntry,
  type RecruitmentApplication,
  type RecruitmentApplicationInput,
  type WaitlistEntry,
} from "@shared/schema";
import { and, eq } from "drizzle-orm";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  createRecruitmentApplication(entry: RecruitmentApplicationInput): Promise<RecruitmentApplication>;
  getRecruitmentApplicationByEmail(
    applicationType: "vendor" | "driver",
    email: string,
  ): Promise<RecruitmentApplication | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const [newEntry] = await db.insert(waitlistEntries).values(entry).returning();
    return newEntry;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const [entry] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.email, email.toLowerCase()));
    return entry;
  }

  async createRecruitmentApplication(
    entry: RecruitmentApplicationInput,
  ): Promise<RecruitmentApplication> {
    const { faxNumber: _faxNumber, ...application } = entry;
    const [created] = await db
      .insert(recruitmentApplications)
      .values(application)
      .returning();
    return created;
  }

  async getRecruitmentApplicationByEmail(
    applicationType: "vendor" | "driver",
    email: string,
  ): Promise<RecruitmentApplication | undefined> {
    const [entry] = await db
      .select()
      .from(recruitmentApplications)
      .where(
        and(
          eq(recruitmentApplications.applicationType, applicationType),
          eq(recruitmentApplications.email, email.toLowerCase()),
        ),
      );
    return entry;
  }
}

export const storage = new DatabaseStorage();
