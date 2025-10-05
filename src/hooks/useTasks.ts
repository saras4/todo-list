import { useEffect, useMemo, useState } from "react";
import type { Task, TaskId, TaskStatus } from "../types/task";
import { loadTasks, saveTasks } from "../storage/tasks";

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
  reorderTasks: (next: Task[]) => void;
  setAll: (next: Task[]) => void;
};

export function useTasks(): UseTasks {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const loaded = loadTasks();
    return Array.isArray(loaded) ? loaded : [];
  });

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
      reorderTasks: (next) => {
        if (!Array.isArray(next)) return;
        setTasks(next);
      },
      setAll: (next) => setTasks(Array.isArray(next) ? next : []),
    };
  }, [tasks]);

  return api;
}
