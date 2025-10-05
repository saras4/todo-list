export type TaskId = string;

export type TaskStatus = "pending" | "completed";

export type Task = {
  id: TaskId;
  title: string;
  status: TaskStatus;
};
