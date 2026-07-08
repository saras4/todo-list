import type { TaskPriority } from "../types/task";
import { PRIORITY_LABELS } from "../types/task";

const STYLES: Record<TaskPriority, string> = {
  low: "border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
  medium:
    "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  high: "border-red-300 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/40 dark:text-red-300",
};

type Props = {
  priority: TaskPriority;
  className?: string;
};

export default function PriorityBadge({ priority, className = "" }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        STYLES[priority],
        className,
      ].join(" ")}
      title={`Priority: ${PRIORITY_LABELS[priority]}`}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
