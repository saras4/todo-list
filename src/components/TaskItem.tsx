import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import type { Task } from "../types/task";
import EditTaskDialog from "./EditTaskDialog";

type Props = {
  task: Task;
  onToggle: (id: string, checked: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      role="taskitem"
      className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 transition-colors hover:border-gray-200 dark:hover:border-gray-800"
      data-completed={task.status === "completed"}
    >
      <Checkbox.Root
        className="grid h-5 w-5 place-items-center rounded border border-gray-300 bg-white outline-none ring-offset-2 hover:bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:ring-offset-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
        checked={task.status === "completed"}
        onCheckedChange={(value) => onToggle(task.id, Boolean(value))}
        aria-label={`Mark "${task.title}" as ${
          task.status === "completed" ? "pending" : "completed"
        }`}
      >
        <Checkbox.Indicator className="h-3 w-3 rounded-sm bg-white data-[state=unchecked]:hidden" />
      </Checkbox.Root>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm ${
            task.status === "completed"
              ? "text-gray-400 line-through"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {task.title}
        </p>
      </div>

      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-gray-700 dark:text-red-400 dark:hover:bg-gray-800"
        >
          Delete
        </button>
      </div>

      {/* Always mounted; controlled by `open` */}
      <EditTaskDialog
        open={open}
        onOpenChange={setOpen}
        initialTitle={task.title}
        onSave={(next) => {
          onEdit(task.id, next);
          setOpen(false);
        }}
      />
    </div>
  );
}
