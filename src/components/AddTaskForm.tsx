import { useState, useRef } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import * as Slot from "@radix-ui/react-slot";

type Props = {
  onAdd: (title: string) => void;
  placeholder?: string;
};

export default function AddTaskForm({
  onAdd,
  placeholder = "Add a task...",
}: Props) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function submit() {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a task.");
      return;
    }
    onAdd(trimmed);
    setTitle("");
    setError(null);
    inputRef.current?.focus();
  }

  // Only handle Escape on the input; let Enter be handled by the form submit
  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      setTitle("");
      setError(null);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault(); // prevent full page reload
    submit();
  }

  const hasError = Boolean(error);

  return (
    <form onSubmit={onSubmit} className="flex items-start gap-2">
      <div className="flex-1">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? "addtask-error" : undefined}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                     dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
        />
        {hasError && (
          <p id="addtask-error" className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>

      <Slot.Slot>
        <button
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                     dark:focus:ring-offset-gray-900"
          aria-label="Add task"
          title="Add task"
        >
          Add
        </button>
      </Slot.Slot>
    </form>
  );
}
