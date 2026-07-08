import { Link } from "react-router-dom";
import Container from "../components/Container";

const features = [
  {
    title: "Stay organized",
    description:
      "Capture everything on your mind and keep your day in one focused list.",
    icon: "✓",
  },
  {
    title: "Drag to prioritize",
    description:
      "Reorder tasks with a simple drag so the most important work rises to the top.",
    icon: "↕",
  },
  {
    title: "Light or dark",
    description:
      "A clean interface that adapts to your theme and gets out of your way.",
    icon: "◐",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Simple. Fast. Focused.
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Get things done, one task at a time
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            A minimal to-do app that helps you plan your day, prioritize what
            matters, and clear your mind — without the clutter.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/app"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Get started
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              Learn more
            </a>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-lg text-white dark:bg-white dark:text-gray-900">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="pb-24">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-gray-900 px-6 py-14 text-center dark:bg-gray-800">
            <h2 className="max-w-xl text-2xl font-bold text-white sm:text-3xl">
              Ready to clear your to-do list?
            </h2>
            <Link
              to="/app"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
            >
              Open the app
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
