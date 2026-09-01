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

export const listDispatchQuerySchema = z.object({
  status: dispatchStatusSchema.optional(),
});

export const dispatchStatsQuerySchema = z.object({
  date: z.string().date(),
});

export const dispatchStatsSchema = z.object({
  date: z.string(),
  totals: z.object({
    pending: z.number(),
    in_transit: z.number(),
    delivered: z.number(),
    cancelled: z.number(),
  }),
});

export type Dispatch = z.infer<typeof dispatchSchema>;
export type DispatchStatus = z.infer<typeof dispatchStatusSchema>;
export type UpdateDispatch = z.infer<typeof updateDispatchSchema>;
export type DispatchStats = z.infer<typeof dispatchStatsSchema>;
