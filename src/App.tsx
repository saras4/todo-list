// src/App.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";
import AddTaskForm from "./components/AddTaskForm";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { addTask } = useTasks();

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <h1 className="text-2xl font-semibold">Todo List</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Tasks</p>

          <div className="mt-6">
            <AddTaskForm onAdd={addTask} />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
