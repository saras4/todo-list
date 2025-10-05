import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-gray-800 dark:bg-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">To-do List</span>
        </div>
        <nav className="flex items-center gap-3">
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
