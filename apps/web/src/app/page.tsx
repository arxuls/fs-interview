"use client";
import { useState } from "react";

import type { Dispatch, DispatchStatus } from "@interview-kit/api/dispatches";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { STATUS_LABELS, STATUS_ORDER, STATUS_STYLES } from "@/lib/dispatch-status";

import { tsr } from "@/utils/ts-rest";
import { DispatchFilter } from "@/components/dispatch-filter";
import { DispatchStats } from "@/components/dispatch-stats";

export default function Home() {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<DispatchStatus | undefined>(undefined);

  const { data, isLoading, error } = tsr.dispatches.list.useQuery({
    queryKey: ["dispatches", "list", { status }],
    queryData: { query: { status } },
    placeholderData: keepPreviousData,
  });
  const { mutate: updateDispatch } = tsr.dispatches.update.useMutation({
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["dispatches"] }),
  });

  function changeStatus(id: number, status: DispatchStatus) {
    updateDispatch({ params: { id }, body: { status } });
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-xl font-semibold">Dispatch control</h1>
      <p className="text-muted-foreground mb-6 text-sm">Daily tracking of ore dispatches</p>
      <DispatchStats />
      <DispatchFilter value={status} onChange={setStatus} />

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
                      {STATUS_ORDER.map((value) => (
                        <option key={value} value={value}>
                          {STATUS_LABELS[value]}
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
