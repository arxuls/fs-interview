import { initContract } from "@ts-rest/core";
import { z } from "zod";

import {
  dispatchSchema,
  dispatchStatsQuerySchema,
  dispatchStatsSchema,
  listDispatchQuerySchema,
  updateDispatchSchema,
} from "./dispatches";

const c = initContract();

export const contract = c.router({
  healthCheck: {
    method: "GET",
    path: "/health",
    responses: {
      200: z.literal("OK"),
    },
  },
  dispatches: c.router({
    list: {
      method: "GET",
      path: "/dispatches",
      summary: "List all dispatches, optionally filtered by status",
      query: listDispatchQuerySchema,
      responses: {
        200: z.array(dispatchSchema),
      },
    },
    stats: {
      method: "GET",
      path: "/dispatches/stats",
      summary: "Total tons per status for a given date",
      query: dispatchStatsQuerySchema,
      responses: {
        200: dispatchStatsSchema,
      },
    },
    update: {
      method: "PATCH",
      path: "/dispatches/:id",
      summary: "Update a dispatch",
      pathParams: z.object({ id: z.coerce.number() }),
      body: updateDispatchSchema,
      responses: {
        200: dispatchSchema,
        404: z.object({ message: z.string() }),
      },
    },
  }),
});

export type AppContract = typeof contract;
