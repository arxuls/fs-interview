"use client";

import type { DispatchStatus } from "@interview-kit/api/dispatches";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { tsr } from "@/utils/ts-rest";

const STAT_LABELS: Record<DispatchStatus, string> = {
  pending: "Pendiente",
  in_transit: "En tránsito",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STAT_STYLES: Record<DispatchStatus, string> = {
  pending: "border-slate-300",
  in_transit: "border-amber-400",
  delivered: "border-emerald-500",
  cancelled: "border-red-400",
};

const STATUSES: DispatchStatus[] = ["pending", "in_transit", "delivered", "cancelled"];

function getToday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

export function DispatchStats() {
  const [selectedDate, setSelectedDate] = useState(getToday);
  const { data, isLoading, error } = tsr.dispatches.stats.useQuery({
    queryKey: ["dispatch-stats", selectedDate],
    queryData: { query: { date: selectedDate } },
    enabled: selectedDate !== "",
  });

  return (
    <section className="mb-8" aria-labelledby="dispatch-stats-title">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="dispatch-stats-title" className="text-lg font-semibold">
            Toneladas por estado
          </h2>
          <p className="text-muted-foreground text-sm">Consulta el resumen de una fecha.</p>
        </div>
        <label className="flex w-full max-w-xs flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Fecha</span>
          <Input
            type="date"
            min="2000-01-01"
            max="9999-12-31"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            aria-label="Fecha del resumen"
          />
        </label>
      </div>

      {isLoading && <p className="mb-4 text-sm">Cargando resumen...</p>}
      {error !== null && <p className="mb-4 text-sm text-red-600">No se pudo cargar el resumen.</p>}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATUSES.map((status) => (
          <Card key={status} className={`border-l-4 ${STAT_STYLES[status]}`}>
            <CardHeader>
              <CardTitle>{STAT_LABELS[status]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">{data?.body[status] ?? 0} t</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
