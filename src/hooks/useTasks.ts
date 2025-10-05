import { useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus, TaskId } from "../types/task";
import { loadTasks, saveTasks } from "../storage/tasks";

// Simple id generator for now (timestamp + random). Replace with nanoid/uuid later if desired.
function genId(): TaskId {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

type UseTasks = {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (
    id: TaskId,
    patch: Partial<Pick<Task, "title" | "status">>
  ) => void;
  removeTask: (id: TaskId) => void;
  clearCompleted: () => void;
  setAll: (next: Task[]) => void; // internal helper if needed
};

export function useTasks(): UseTasks {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  // Persist on change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const api = useMemo<UseTasks>(() => {
    return {
      tasks,
      addTask: (title: string) => {
        const trimmed = title.trim();
        if (!trimmed) return;
        const next: Task = {
          id: genId(),
          title: trimmed,
          status: "pending" as TaskStatus,
        };
        setTasks((prev) => [...prev, next]);
      },
      updateTask: (id, patch) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
        );
      },
      removeTask: (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      },
      clearCompleted: () => {
        setTasks((prev) => prev.filter((t) => t.status !== "completed"));
      },
      setAll: (next) => setTasks(next),
    };
  }, [tasks]);

  return api;
}
