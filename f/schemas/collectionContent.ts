import { z } from "zod";

export type collectionContentSchemaType = z.infer<typeof collectionContentSchema>;
export const collectionContentSchema = z.object({
   name: z.string().min(4),
   order: z.number().optional() });


