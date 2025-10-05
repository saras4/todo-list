// src/App.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { tasks, addTask, updateTask, removeTask } = useTasks();

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
          <h1 className="text-2xl font-semibold">Todo List</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Tasks</p>

          <div className="mt-6 space-y-4">
            <AddTaskForm onAdd={addTask} />
            <TaskList
              tasks={tasks}
              filter="all"
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
