#!/usr/bin/env bash
# Builds a static, GitHub-Pages-ready snapshot of the site into out/.
#
# The /api routes (contact + request-offer form handlers) need a real
# server and can't be part of a static export, so this script moves them
# aside for the duration of the build only, then restores them — local
# dev and any server-based deploy (Vercel etc.) are completely unaffected.
set -euo pipefail
cd "$(dirname "$0")/.."

# Must match `repoBasePath` in next.config.ts.
BASE_PATH="/PolycleanerNewVersion"

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

# next/image's automatic basePath-prefixing runs through its image-
# optimization loader — but images.unoptimized (required here, since
# GitHub Pages has no server to run that optimizer) skips the loader
# entirely, so every hardcoded "/images/..." reference (in the rendered
# HTML *and* in client-component JS chunks that build the same string
# at runtime) comes out unprefixed and 404s under the repo subpath.
# next/link and the favicon aren't affected — only plain image src
# strings are — so patch just those, post-build, across the export.
echo "Patching /images/ paths with basePath $BASE_PATH ..."
find out -type f \( -name "*.html" -o -name "*.js" -o -name "*.txt" \) -print0 \
  | xargs -0 sed -i "s|\"/images/|\"${BASE_PATH}/images/|g"

# GitHub Pages runs pushed content through Jekyll by default, which
# ignores any folder starting with "_" — including Next's own _next/
# asset folder. This file turns Jekyll processing off.
touch out/.nojekyll

echo "Static export ready in ./out"
