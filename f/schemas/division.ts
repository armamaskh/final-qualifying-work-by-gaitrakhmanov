import { z } from "zod";

export type divisionSchemaType = z.infer<typeof divisionSchema>;
export const divisionSchema = z.object({
   name: z.string().min(4),
   order: z.number().optional() });


