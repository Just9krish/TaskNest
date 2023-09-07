import { z } from "zod";

export const createTaskSchema = z.object({
  content: z
    .string()
    .min(8, { message: "Task content must be at least 8 characters" }),
  collectionId: z.number().nonnegative(),
  expiresAt: z.date().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
