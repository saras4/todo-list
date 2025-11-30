import type { Task, TaskId } from "../types/task";
import { useTaskStore } from "../store/taskStore";

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
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const clearCompleted = useTaskStore((state) => state.clearCompleted);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);
  const setAll = useTaskStore((state) => state.setAll);

  return {
    tasks,
    addTask,
    updateTask,
    removeTask,
    clearCompleted,
    reorderTasks,
    setAll,
  };
}
