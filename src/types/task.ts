export type TaskId = string;

export type TaskStatus = "all" | "pending" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

// Higher number = higher priority; used for sorting.
export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

export const DEFAULT_PRIORITY: TaskPriority = "medium";

export type Task = {
  id: TaskId;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};
