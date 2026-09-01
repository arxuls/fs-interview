import type { Dispatch, DispatchStatus, UpdateDispatch } from "@interview-kit/api/dispatches";
import { db } from "@interview-kit/db";
import { dispatches } from "@interview-kit/db/schema/dispatches";
import { Injectable } from "@nestjs/common";
import { asc, desc, eq } from "drizzle-orm";

@Injectable()
export class DispatchesService {
  async findAll(status?: DispatchStatus): Promise<Dispatch[]> {
    return db
      .select()
      .from(dispatches)
      .where(status === undefined ? undefined : eq(dispatches.status, status))
      .orderBy(desc(dispatches.date), asc(dispatches.code));
  }

  async findOne(id: number): Promise<Dispatch | undefined> {
    const [dispatch] = await db.select().from(dispatches).where(eq(dispatches.id, id));
    return dispatch;
  }

  async update(id: number, data: UpdateDispatch): Promise<Dispatch | undefined> {
    if (Object.keys(data).length === 0) {
      return this.findOne(id);
    }
    const [updated] = await db
      .update(dispatches)
      .set(data)
      .where(eq(dispatches.id, id))
      .returning();
    return updated;
  }
}
