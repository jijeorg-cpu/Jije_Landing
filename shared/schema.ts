
import { boolean, pgEnum, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries).pick({
  email: true,
});

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

export const applicationTypeEnum = pgEnum("application_type", ["vendor", "driver"]);
export const applicationStatusEnum = pgEnum("application_status", [
  "New",
  "Contacted",
  "Under Review",
  "Approved",
  "Declined",
]);

export const recruitmentApplications = pgTable(
  "recruitment_applications",
  {
    id: serial("id").primaryKey(),
    applicationType: applicationTypeEnum("application_type").notNull(),
    status: applicationStatusEnum("status").notNull().default("New"),
    source: text("source").notNull().default("jije.ca"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    cityArea: text("city_area").notNull(),
    contactConsent: boolean("contact_consent").notNull(),
    marketingConsent: boolean("marketing_consent").notNull().default(false),

    businessName: text("business_name"),
    businessType: text("business_type"),
    businessAddress: text("business_address"),
    websiteOrInstagram: text("website_or_instagram"),
    businessDescription: text("business_description"),
    currentOperations: text("current_operations"),

    vehicleType: text("vehicle_type"),
    isAtLeast18: boolean("is_at_least_18"),
    deliveryExperience: text("delivery_experience"),
    preferredAvailability: text("preferred_availability"),
    deliveryInterest: text("delivery_interest"),

    additionalComments: text("additional_comments"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    applicationTypeEmailUnique: uniqueIndex("recruitment_application_type_email_unique").on(
      table.applicationType,
      table.email,
    ),
  }),
);

const cleanedString = z.string().transform((value) =>
  value.replace(/[\u0000-\u001f\u007f]/g, "").trim(),
);
const requiredText = (max: number, message: string) =>
  cleanedString.pipe(z.string().min(1, message).max(max));
const optionalShortText = cleanedString.pipe(z.string().max(200)).optional().or(z.literal(""));
const optionalLongText = cleanedString.pipe(z.string().max(1500)).optional().or(z.literal(""));
const canadianFriendlyPhone = cleanedString
  .pipe(
    z
      .string()
      .min(7, "Enter a valid phone number.")
      .max(30, "Enter a valid phone number.")
      .regex(/^[0-9+().\-\s]+$/, "Enter a valid phone number.")
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
      }, "Enter a valid phone number."),
  );

const baseApplicationSchema = z.object({
  applicationType: z.enum(["vendor", "driver"]),
  source: z.string().trim().max(100).default("jije.ca"),
  firstName: requiredText(80, "First name is required."),
  lastName: requiredText(80, "Last name is required."),
  email: cleanedString.pipe(z.string().email("Enter a valid email address.").max(254)),
  phone: canadianFriendlyPhone,
  cityArea: cleanedString.pipe(z.string().min(2, "City or area is required.").max(120)),
  contactConsent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required so we can follow up about your application." }),
  }),
  marketingConsent: z.boolean().default(false),
  additionalComments: optionalLongText,
  faxNumber: z.string().max(0).optional().default(""),
});

const vendorApplicationSchema = baseApplicationSchema.extend({
  applicationType: z.literal("vendor"),
  businessName: cleanedString.pipe(
    z.string().min(2, "Business name is required.").max(160),
  ),
  businessType: z.enum(["Restaurant", "Grocery/Market", "Chef", "Caterer", "Other"]),
  businessAddress: optionalShortText,
  websiteOrInstagram: optionalShortText,
  businessDescription: optionalLongText,
  currentOperations: z.enum(["Pickup", "Delivery", "Both"]).optional().or(z.literal("")),
});

const driverApplicationSchema = baseApplicationSchema.extend({
  applicationType: z.literal("driver"),
  vehicleType: z.enum(["Car", "Bicycle", "E-bike", "Scooter/Motorcycle", "Other"]),
  isAtLeast18: z.literal(true, {
    errorMap: () => ({ message: "You must confirm that you are at least 18 years old." }),
  }),
  deliveryExperience: z.enum(["Yes", "No"]).optional().or(z.literal("")),
  preferredAvailability: z
    .array(z.enum(["Weekdays", "Weekends", "Evenings", "Flexible"]))
    .max(4)
    .optional()
    .default([]),
  deliveryInterest: z
    .enum(["Delivery only", "Shopping and delivery", "Either"])
    .optional()
    .or(z.literal("")),
});

export const recruitmentApplicationInputSchema = z
  .discriminatedUnion("applicationType", [vendorApplicationSchema, driverApplicationSchema])
  .transform((input) => ({
    ...input,
    email: input.email.toLowerCase(),
    preferredAvailability:
      input.applicationType === "driver" ? input.preferredAvailability.join(", ") : undefined,
  }));

export type RecruitmentApplicationInput = z.infer<typeof recruitmentApplicationInputSchema>;
export type RecruitmentApplication = typeof recruitmentApplications.$inferSelect;
