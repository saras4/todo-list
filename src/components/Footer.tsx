import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <Container className="flex items-center justify-center py-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Todo App
        </p>
      </Container>
    </footer>
  );
}
