import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  color: z.string(),
});
