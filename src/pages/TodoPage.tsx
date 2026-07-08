import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import Container from "../components/Container";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import FilterBar, { type Filter } from "../components/FilterBar";

export default function TodoPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const { tasks, addTask, reorderTasks, updateTask, removeTask } = useTasks();

  // handlers
  const handleToggle = (id: string, checked: boolean) =>
    updateTask(id, { status: checked ? "completed" : "pending" });

  const handleEdit = (id: string, title: string) => updateTask(id, { title });

  const handleDelete = (id: string) => removeTask(id);

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl font-semibold">Tasks</h1>

        <div className="mt-6 space-y-4">
          <FilterBar value={filter} onChange={setFilter} />
          <AddTaskForm onAdd={addTask} />
          <TaskList
            tasks={tasks}
            filter={filter}
            reorderTasks={reorderTasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Container>
    </div>
  );
}
