import type { Task } from "../types/task";

const STORAGE_KEY = "todo.tasks";

function safeParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function loadTasks(): Task[] {
  return safeParse<Task[]>(localStorage.getItem(STORAGE_KEY), []);
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(tasks: Task[], task: Task): Task[] {
  const next = [...tasks, task];
  saveTasks(next);
  return next;
}

export function updateTask(
  tasks: Task[],
  id: string,
  updater: (t: Task) => Task
): Task[] {
  const next = tasks.map((t) => (t.id === id ? updater(t) : t));
  saveTasks(next);
  return next;
}

export function removeTask(tasks: Task[], id: string): Task[] {
  const next = tasks.filter((t) => t.id !== id);
  saveTasks(next);
  return next;
}

export function clearTasks(): void {
  saveTasks([]);
}
