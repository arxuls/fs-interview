import type { DispatchStatus } from "@interview-kit/api/dispatches";
import { dispatchStatusSchema } from "@interview-kit/api/dispatches";

export const STATUS_ORDER = dispatchStatusSchema.options;

export const STATUS_LABELS: Record<DispatchStatus, string> = {
  pending: "Pending",
  in_transit: "In transit",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_STYLES: Record<DispatchStatus, string> = {
  pending: "bg-muted",
  in_transit: "bg-amber-100 dark:bg-amber-900",
  delivered: "bg-emerald-100 dark:bg-emerald-900",
  cancelled: "bg-red-100 dark:bg-red-900",
};
