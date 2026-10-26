#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Restore exactly the dependencies from the merged lockfile.
npm ci --no-audit --no-fund

# This hook runs in the development workspace, never as a deployment hook.
# Do not force ambiguous or destructive database changes through prompts.
npm run db:push < /dev/null

npm run check
npm run build
