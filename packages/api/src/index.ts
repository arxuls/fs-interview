import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { dispatchSchema, updateDispatchSchema } from "./dispatches";

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
      summary: "List all dispatches",
      responses: {
        200: z.array(dispatchSchema),
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
