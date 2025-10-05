import { useEffect, useMemo, useState } from "react";
import type { Task, TaskId, TaskStatus } from "../types/task";
import { loadTasks, saveTasks } from "../storage/tasks";

function genId(): TaskId {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useTasks() {
  // Ensure initial state is an array even if storage is corrupt or empty
  const [tasks, setTasks] = useState<Task[]>(() => {
    const loaded = loadTasks();
    return Array.isArray(loaded) ? loaded : [];
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const api = useMemo(() => {
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
        // prev is guaranteed array due to initializer
        setTasks((prev) => [...prev, next]);
      },
      updateTask: (
        id: TaskId,
        patch: Partial<Pick<Task, "title" | "status">>
      ) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
        );
      },
      removeTask: (id: TaskId) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      },
      clearCompleted: () => {
        setTasks((prev) => prev.filter((t) => t.status !== "completed"));
      },
      setAll: (next: Task[]) => setTasks(Array.isArray(next) ? next : []),
    };
  }, [tasks]);

  return api;
}
