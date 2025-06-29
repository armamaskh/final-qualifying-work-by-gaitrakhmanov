import { z } from "zod";

export type collectionSchemaType = z.infer<typeof collectionSchema>;
export const collectionSchema = z.object({
   name: z.string().min(4),
   description: z.string().optional(),
   cover: z.string().optional() });


