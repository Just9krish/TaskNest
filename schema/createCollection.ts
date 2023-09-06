import { CollectionColors } from "@/lib/constant";
import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  color: z
    .string()
    .refine((color) => Object.keys(CollectionColors).includes(color)),
});

export type CreateCollectionType = z.infer<typeof createCollectionSchema>;
