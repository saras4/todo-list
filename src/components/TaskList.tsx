import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import type { Task, TaskStatus } from "../types/task";

type Filter = TaskStatus;

type Props = {
  tasks: Task[];
  filter?: Filter;
  reorderTasks: (next: Task[]) => void;
  onToggle: (id: string, checked: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

type HandleProps = {
  ref: (node: HTMLElement | null) => void;
  listeners: DraggableSyntheticListeners;
};

function applyFilter(tasks: Task[], filter: Filter = "all"): Task[] {
  if (filter === "all") return tasks;
  return tasks.filter((t) => t.status === filter);
}

function SortableRow({
  task,
  children,
}: {
  task: Task;
  children: (props: { handleProps: HandleProps }) => React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id as UniqueIdentifier });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleProps: HandleProps = { ref: setActivatorNodeRef, listeners };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children({ handleProps })}
    </div>
  );
}

export default function TaskList({
  tasks,
  filter = "all",
  reorderTasks,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const visible = applyFilter(Array.isArray(tasks) ? tasks : [], filter);
  const ids = visible.map((t) => t.id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    // Reorder only the visible slice, then merge back into full tasks
    const reorderedVisible = arrayMove(visible, oldIndex, newIndex);

    // Build a map from id to index for new order among visible items
    const orderMap = new Map(reorderedVisible.map((t, i) => [t.id, i]));

    const next = [...tasks].sort((a, b) => {
      const aIn = orderMap.has(a.id);
      const bIn = orderMap.has(b.id);
      if (aIn && bIn) return orderMap.get(a.id)! - orderMap.get(b.id)!;
      if (aIn && !bIn) return -1;
      if (!aIn && bIn) return 1;
      return 0;
    });

    reorderTasks(next);
  }

  if (visible.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        No tasks to display.
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {visible.map((task) => (
            <SortableRow key={task.id} task={task}>
              {({ handleProps }) => (
                <li className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 transition-colors hover:border-gray-200 dark:hover:border-gray-800">
                  <button
                    type="button"
                    aria-label="Drag"
                    className="h-5 w-5 cursor-grab rounded text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    ref={handleProps.ref}
                    {...handleProps.listeners}
                  >
                    ::
                  </button>

                  <TaskItem
                    task={task}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </li>
              )}
            </SortableRow>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
