// src/components/ThemeToggle.tsx
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((d) => !d)}
      className="rounded-md border px-3 py-1 text-sm
                 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100
                 border-gray-300 dark:border-gray-600"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
