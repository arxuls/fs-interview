"use client";

import type { Dispatch, DispatchStatus } from "@interview-kit/api/dispatches";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { DispatchStats } from "@/components/dispatch-stats";
import { tsr } from "@/utils/ts-rest";

const STATUS_LABELS: Record<DispatchStatus, string> = {
  pending: "Pending",
  in_transit: "In transit",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLES: Record<DispatchStatus, string> = {
  pending: "bg-muted",
  in_transit: "bg-amber-100 dark:bg-amber-900",
  delivered: "bg-emerald-100 dark:bg-emerald-900",
  cancelled: "bg-red-100 dark:bg-red-900",
};

export default function Home() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<DispatchStatus | "all">("all");
  const { data, isLoading, error } = tsr.dispatches.list.useQuery({
    queryKey: ["dispatches", statusFilter],
    queryData: statusFilter === "all" ? { query: {} } : { query: { status: statusFilter } },
  });
  const { mutate: updateDispatch } = tsr.dispatches.update.useMutation({
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["dispatches"] }),
  });

  function changeStatus(id: number, status: DispatchStatus) {
    updateDispatch({ params: { id }, body: { status } });
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Dispatch control</h1>
          <p className="text-muted-foreground text-sm">Daily tracking of ore dispatches</p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Status</span>
          <select
            className="rounded-md border bg-background px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DispatchStatus | "all")}
          >
            <option value="all">All</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <DispatchStats />

      {isLoading && <p className="text-sm">Loading dispatches…</p>}
      {error !== null && (
        <p className="text-sm text-red-600">Could not load dispatches. Is the API running?</p>
      )}

      {data !== undefined && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b text-left">
                <th className="px-3 py-2 font-medium">Code</th>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Truck plate</th>
                <th className="px-3 py-2 font-medium">Material</th>
                <th className="px-3 py-2 text-right font-medium">Tons</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.body.map((dispatch: Dispatch) => (
                <tr key={dispatch.id} className="border-b last:border-b-0">
                  <td className="px-3 py-2 font-mono">{dispatch.code}</td>
                  <td className="px-3 py-2">{dispatch.date}</td>
                  <td className="px-3 py-2">{dispatch.truckPlate}</td>
                  <td className="px-3 py-2">{dispatch.material}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{dispatch.tons.toFixed(1)}</td>
                  <td className="px-3 py-2">
                    <select
                      className={`rounded-md border px-2 py-1 ${STATUS_STYLES[dispatch.status]}`}
                      value={dispatch.status}
                      onChange={(e) => changeStatus(dispatch.id, e.target.value as DispatchStatus)}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-muted-foreground px-3 py-2">{dispatch.notes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
