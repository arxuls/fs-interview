import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

import { dispatches } from "./schema/dispatches";

dotenv.config({ path: "../../apps/server/.env" });

const rows: (typeof dispatches.$inferInsert)[] = [
  {
    code: "DSP-001",
    truckPlate: "ABX-712",
    material: "Copper concentrate",
    tons: 32.5,
    date: "2026-08-24",
    status: "delivered",
  },
  {
    code: "DSP-002",
    truckPlate: "FQD-334",
    material: "Zinc concentrate",
    tons: 28.0,
    date: "2026-08-24",
    status: "delivered",
  },
  {
    code: "DSP-003",
    truckPlate: "HKT-905",
    material: "Copper concentrate",
    tons: 30.2,
    date: "2026-08-24",
    status: "cancelled",
    notes: "Truck mechanical failure",
  },
  {
    code: "DSP-004",
    truckPlate: "ABX-712",
    material: "Copper concentrate",
    tons: 33.1,
    date: "2026-08-25",
    status: "delivered",
  },
  {
    code: "DSP-005",
    truckPlate: "MRW-208",
    material: "Lead concentrate",
    tons: 26.4,
    date: "2026-08-25",
    status: "delivered",
  },
  {
    code: "DSP-006",
    truckPlate: "FQD-334",
    material: "Zinc concentrate",
    tons: 29.8,
    date: "2026-08-25",
    status: "in_transit",
  },
  {
    code: "DSP-007",
    truckPlate: "HKT-905",
    material: "Copper concentrate",
    tons: 31.0,
    date: "2026-08-26",
    status: "delivered",
  },
  {
    code: "DSP-008",
    truckPlate: "MRW-208",
    material: "Lead concentrate",
    tons: 27.6,
    date: "2026-08-26",
    status: "in_transit",
  },
  {
    code: "DSP-009",
    truckPlate: "PLC-441",
    material: "Zinc concentrate",
    tons: 28.9,
    date: "2026-08-26",
    status: "in_transit",
    notes: "Departure delayed by rain",
  },
  {
    code: "DSP-010",
    truckPlate: "ABX-712",
    material: "Copper concentrate",
    tons: 32.0,
    date: "2026-08-27",
    status: "pending",
  },
  {
    code: "DSP-011",
    truckPlate: "FQD-334",
    material: "Zinc concentrate",
    tons: 30.5,
    date: "2026-08-27",
    status: "pending",
  },
  {
    code: "DSP-012",
    truckPlate: "PLC-441",
    material: "Lead concentrate",
    tons: 25.7,
    date: "2026-08-27",
    status: "pending",
  },
];

async function seed() {
  const db = drizzle(process.env.DATABASE_URL ?? "");
  await db.delete(dispatches);
  await db.insert(dispatches).values(rows);
  console.log(`Seed done: ${rows.length} dispatches`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
