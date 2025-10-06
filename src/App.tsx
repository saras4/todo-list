import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import FilterBar, { type Filter } from "./components/FilterBar";

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");

  const { tasks, addTask, reorderTasks, updateTask, removeTask } = useTasks();

  // handlers
  const handleToggle = (id: string, checked: boolean) =>
    updateTask(id, { status: checked ? "completed" : "pending" });

  const handleEdit = (id: string, title: string) => updateTask(id, { title });

  const handleDelete = (id: string) => removeTask(id);

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 py-8">
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
      </main>
      <Footer />
    </div>
  );
}
