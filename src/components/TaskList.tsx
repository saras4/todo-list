import TaskItem from "./TaskItem";
import type { Task, TaskStatus } from "../types/task";

type Filter = TaskStatus;

type Props = {
  tasks: Task[];
  filter?: Filter; // defaults to 'all'
  onToggle: (id: string, checked: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function applyFilter(tasks: Task[] | unknown, filter: Filter = "all"): Task[] {
  const arr = Array.isArray(tasks) ? tasks : [];
  if (filter === "all") return arr;
  return arr.filter((t) => t.status === filter);
}

export default function TaskList({
  tasks,
  filter = "all",
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const visible = applyFilter(tasks, filter);

  if (visible.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        No tasks to display.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {visible.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
