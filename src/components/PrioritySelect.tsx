import type { TaskPriority } from "../types/task";
import { PRIORITIES, PRIORITY_LABELS } from "../types/task";

type Props = {
  value: TaskPriority;
  onChange: (next: TaskPriority) => void;
  id?: string;
  "aria-label"?: string;
  className?: string;
};

export default function PrioritySelect({
  value,
  onChange,
  id,
  className = "",
  ...rest
}: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as TaskPriority)}
      aria-label={rest["aria-label"] ?? "Priority"}
      className={[
        "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40",
        className,
      ].join(" ")}
    >
      {PRIORITIES.map((p) => (
        <option key={p} value={p}>
          {PRIORITY_LABELS[p]}
        </option>
      ))}
    </select>
  );
}
