import type { TaskStatus } from "../types/task";

export type Filter = "all" | TaskStatus;

type Props = {
  value: Filter; // current filter: 'all' | 'completed' | 'pending'
  onChange: (next: Filter) => void;
  className?: string;
};

function Btn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-md border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function FilterBar({ value, onChange, className = "" }: Props) {
  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      <Btn active={value === "all"} onClick={() => onChange("all")}>
        All
      </Btn>
      <Btn active={value === "completed"} onClick={() => onChange("completed")}>
        Completed
      </Btn>
      <Btn active={value === "pending"} onClick={() => onChange("pending")}>
        Pending
      </Btn>
    </div>
  );
}
