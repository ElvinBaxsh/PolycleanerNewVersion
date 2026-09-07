#!/usr/bin/env bash
# Builds a static, GitHub-Pages-ready snapshot of the site into out/.
#
# The /api routes (contact + request-offer form handlers) need a real
# server and can't be part of a static export, so this script moves them
# aside for the duration of the build only, then restores them — local
# dev and any server-based deploy (Vercel etc.) are completely unaffected.
set -euo pipefail
cd "$(dirname "$0")/.."

API_DIR="src/app/api"
API_BACKUP=".api-backup-tmp"

cleanup() {
  if [ -d "$API_BACKUP" ]; then
    rm -rf "$API_DIR"
    mv "$API_BACKUP" "$API_DIR"
  fi
}
trap cleanup EXIT

if [ -d "$API_DIR" ]; then
  mv "$API_DIR" "$API_BACKUP"
fi

# Clear any cached build/type info from a previous (non-static) build —
# it can reference the now-moved-aside /api routes and fail type checking.
rm -rf .next

STATIC_EXPORT=1 npx next build

# GitHub Pages runs pushed content through Jekyll by default, which
# ignores any folder starting with "_" — including Next's own _next/
# asset folder. This file turns Jekyll processing off.
touch out/.nojekyll

echo "Static export ready in ./out"
