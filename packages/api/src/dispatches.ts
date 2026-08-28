import { z } from "zod";

export const dispatchStatusSchema = z.enum(["pending", "in_transit", "delivered", "cancelled"]);

export const dispatchSchema = z.object({
  id: z.number(),
  code: z.string(),
  truckPlate: z.string(),
  material: z.string(),
  tons: z.number(),
  date: z.string(),
  status: dispatchStatusSchema,
  notes: z.string().nullable(),
});

export const updateDispatchSchema = z
  .object({
    truckPlate: z.string().min(1).optional(),
    material: z.string().min(1).optional(),
    tons: z.number().positive().optional(),
    status: dispatchStatusSchema.optional(),
    notes: z.string().nullable().optional(),
  })
  .strict();

export type Dispatch = z.infer<typeof dispatchSchema>;
export type DispatchStatus = z.infer<typeof dispatchStatusSchema>;
export type UpdateDispatch = z.infer<typeof updateDispatchSchema>;
