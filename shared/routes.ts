
import { z } from 'zod';
import { insertWaitlistEntrySchema, waitlistEntries } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  conflict: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  waitlist: {
    create: {
      method: 'POST' as const,
      path: '/api/waitlist' as const,
      input: insertWaitlistEntrySchema,
      responses: {
        201: z.custom<typeof waitlistEntries.$inferSelect>(),
        409: errorSchemas.conflict, // For duplicate emails
        400: errorSchemas.validation,
      },
    },
  },
};

export type WaitlistEntryInput = z.infer<typeof api.waitlist.create.input>;
export type WaitlistEntryResponse = z.infer<typeof api.waitlist.create.responses[201]>;
