"use client";

import { STATUS_LABELS, STATUS_ORDER } from "@/lib/dispatch-status";
import type { DispatchStatus } from "@interview-kit/api/dispatches";

const ALL_STATUS = "all";

type DispatchFilterProps = {
  value: DispatchStatus | undefined;
  onChange: (status: DispatchStatus | undefined) => void;
};

export function DispatchFilter({ value, onChange }: DispatchFilterProps) {
  return (
    <label className="mb-4 flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Status</span>
      <select
        className="rounded-md border px-2 py-1"
        value={value ?? ALL_STATUS}
        onChange={(e) =>
          onChange(e.target.value === ALL_STATUS ? undefined : (e.target.value as DispatchStatus))
        }
      >
        <option value={ALL_STATUS}>All</option>
        {STATUS_ORDER.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </label>
  );
}
