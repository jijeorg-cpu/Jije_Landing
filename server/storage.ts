
import { db } from "./db";
import { waitlistEntries, type InsertWaitlistEntry, type WaitlistEntry } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
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
}

export const storage = new DatabaseStorage();
