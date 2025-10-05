// src/App.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <h1 className="text-2xl font-semibold">Todo List</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Tasks</p>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
