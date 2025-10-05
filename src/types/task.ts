export type TaskId = string;

export type TaskStatus = "all" | "pending" | "completed";

export type Task = {
  id: TaskId;
  title: string;
  status: TaskStatus;
};
