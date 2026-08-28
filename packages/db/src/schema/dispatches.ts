import { date, doublePrecision, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const dispatchStatus = pgEnum("dispatch_status", [
  "pending",
  "in_transit",
  "delivered",
  "cancelled",
]);

export const dispatches = pgTable("dispatches", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  truckPlate: text("truck_plate").notNull(),
  material: text("material").notNull(),
  tons: doublePrecision("tons").notNull(),
  date: date("date").notNull(),
  status: dispatchStatus("status").notNull().default("pending"),
  notes: text("notes"),
});
