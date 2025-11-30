import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, TaskId, TaskStatus } from "../types/task";

function genId(): TaskId {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (
    id: TaskId,
    patch: Partial<Pick<Task, "title" | "status">>
  ) => void;
  removeTask: (id: TaskId) => void;
  clearCompleted: () => void;
  reorderTasks: (next: Task[]) => void;
  setAll: (next: Task[]) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title: string) => {
        const trimmed = title.trim();
        if (!trimmed) return;
        const newTask: Task = {
          id: genId(),
          title: trimmed,
          status: "pending" as TaskStatus,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, patch) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        }));
      },
      removeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));
      },
      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.status !== "completed"),
        }));
      },
      reorderTasks: (next) => {
        if (!Array.isArray(next)) return;
        set({ tasks: next });
      },
      setAll: (next) => {
        set({ tasks: Array.isArray(next) ? next : [] });
      },
    }),
    {
      name: "todo.tasks",
      version: 1,
    }
  )
);
