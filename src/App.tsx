import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="p-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main className="p-8">
        <h1 className="text-2xl font-semibold">Todo App</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Tasks</p>
      </main>
    </div>
  );
}

export default App;
