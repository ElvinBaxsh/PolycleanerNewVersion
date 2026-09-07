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
  # A copy+delete (rather than `mv`) survives a running dev server holding
  # a file watcher/handle open inside src/app/api, which on Windows makes
  # a plain directory `mv` fail with "Permission denied".
  cp -r "$API_DIR" "$API_BACKUP"
  rm -rf "$API_DIR"
fi

# Clear any stale static-preview build/type info from a previous run — it
# can reference the now-moved-aside /api routes and fail type checking.
# (.next itself, the normal dev/build folder, is left untouched — a live
# `next dev` server may have it open, and this build uses .next-static
# instead specifically to avoid that conflict.)
rm -rf .next-static

STATIC_EXPORT=1 npx next build

# With a custom distDir, `output: "export"` writes the site straight into
# it (.next-static/) rather than into a nested out/ subfolder — copy it to
# the conventional ./out so the rest of this script (and the deploy step)
# doesn't need to know about that.
rm -rf out
cp -r .next-static out

# next/image's automatic basePath-prefixing runs through its image-
# optimization loader — but images.unoptimized (required here, since
# GitHub Pages has no server to run that optimizer) skips the loader
# entirely, so every hardcoded "/images/..." reference comes out
# unprefixed and 404s under the repo subpath. This shows up in two
# distinct forms that both need patching:
#   - `src="/images/...">` on <img> tags (rendered HTML *and* the same
#     string rebuilt at runtime inside client-component JS chunks)
#   - `url(/images/...)` inside inline CSS — MaskIcon/StepIcon render
#     their icon via a CSS mask-image, not an <img src>, so the first
#     pattern alone missed them entirely (that's why those icons were
#     still blank after the first fix).
# next/link and the favicon aren't affected by any of this.
echo "Patching /images/ paths with basePath $BASE_PATH ..."
find out -type f \( -name "*.html" -o -name "*.js" -o -name "*.txt" \) -print0 \
  | xargs -0 sed -i \
      -e "s|\"/images/|\"${BASE_PATH}/images/|g" \
      -e "s|url(/images/|url(${BASE_PATH}/images/|g"

# GitHub Pages runs pushed content through Jekyll by default, which
# ignores any folder starting with "_" — including Next's own _next/
# asset folder. This file turns Jekyll processing off.
touch out/.nojekyll

echo "Static export ready in ./out"
