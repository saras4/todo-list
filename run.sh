#!/usr/bin/env bash
#
# run.sh — install dependencies (if needed) and start the dev server.
#
# Usage:
#   ./run.sh          Start the dev server (default)
#   ./run.sh build    Build for production
#   ./run.sh preview  Preview the production build
#   ./run.sh lint     Run the linter

set -euo pipefail

# Move to the directory containing this script so it works from anywhere.
cd "$(dirname "$0")"

# Require npm.
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed or not on your PATH." >&2
  exit 1
fi

# Install dependencies if they're missing or out of date.
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

# Dispatch to the requested npm script (defaults to "dev").
task="${1:-dev}"
echo "Running: npm run $task"
exec npm run "$task"
