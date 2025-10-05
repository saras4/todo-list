import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  initialTitle: string;
  onSave: (nextTitle: string) => void;
};

export default function EditTaskDialog({
  open,
  onOpenChange,
  initialTitle,
  onSave,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep internal state in sync if the selected task changes while closed
  useEffect(() => {
    if (!open) setTitle(initialTitle);
  }, [initialTitle, open]);

  function handleSave() {
    const t = title.trim();
    if (!t) return;
    onSave(t);
    onOpenChange(false); // close and return focus to trigger
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white p-4 shadow-xl outline-none
                     data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out
                     dark:border-gray-800 dark:bg-gray-900"
          // Prevent auto-scrolling focus jumps; we’ll focus manually
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            // focus after paint
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
        >
          <Dialog.Title className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Edit task
          </Dialog.Title>

          <div className="mt-3">
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  onOpenChange(false);
                }
              }}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                         dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
              placeholder="Task title"
              aria-label="Task title"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                onClick={() => {
                  // Cancel closes dialog; Radix restores focus to trigger
                }}
              >
                Cancel
              </button>
            </Dialog.Close>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
