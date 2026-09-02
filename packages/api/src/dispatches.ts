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

export const listDispatchesQuerySchema = z.object({
  status: dispatchStatusSchema.optional(),
});

export const dispatchStatsQuerySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)")
    .refine((value) => {
      const parsedDate = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === value;
    }, "Fecha inválida")
    .refine((value) => value >= "2000-01-01", "El año debe ser 2000 o posterior"),
});

export const dispatchStatsSchema = z.object({
  pending: z.number(),
  in_transit: z.number(),
  delivered: z.number(),
  cancelled: z.number(),
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
export type DispatchStats = z.infer<typeof dispatchStatsSchema>;
export type UpdateDispatch = z.infer<typeof updateDispatchSchema>;
