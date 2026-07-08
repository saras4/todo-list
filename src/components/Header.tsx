import { Link } from "react-router-dom";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-gray-800 dark:bg-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-base font-semibold">
            To-do List
          </Link>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            to="/app"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            My Tasks
          </Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
