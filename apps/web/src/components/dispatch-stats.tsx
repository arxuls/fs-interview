"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/dispatch-status";
import { tsr } from "@/utils/ts-rest";

export function DispatchStats() {
  const [date, setDate] = useState("");

  const { data, isLoading, error } = tsr.dispatches.stats.useQuery({
    queryKey: ["dispatches", "stats", date],
    queryData: { query: { date } },
    enabled: date !== "",
  });

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center gap-2">
        <Label htmlFor="stats-date" className="text-muted-foreground text-sm">
          Tons per status on
        </Label>
        <Input
          id="stats-date"
          type="date"
          className="w-auto"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {date === "" && (
        <p className="text-muted-foreground text-sm">Pick a date to see the daily totals.</p>
      )}
      {isLoading && <p className="text-sm">Loading totals…</p>}
      {error !== null && <p className="text-sm text-red-600">Could not load the totals.</p>}

      {data !== undefined && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATUS_ORDER.map((status) => (
            <Card key={status}>
              <CardHeader>
                <CardTitle className="text-muted-foreground text-xs font-medium">
                  {STATUS_LABELS[status]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl tabular-nums">{data.body.totals[status].toFixed(1)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
