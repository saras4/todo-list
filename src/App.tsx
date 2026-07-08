import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import TodoPage from "./pages/TodoPage";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<TodoPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
