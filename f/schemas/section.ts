import { z } from "zod";

export type sectionSchemaType = z.infer<typeof sectionSchema>;
export const sectionSchema = z.object({
   name: z.string().min(4),
   section_type: z.string().optional() });


