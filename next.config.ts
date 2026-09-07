import type { NextConfig } from "next";

// Only active for the GitHub Pages static-preview build (see
// scripts/build-static-preview.sh), gated behind an env var so normal
// `next dev` / `next build` (Vercel, local) are unaffected. GitHub Pages
// serves this repo from /PolycleanerNewVersion/, and it can't run the
// /api routes or Next's image optimizer (no server), so this mode:
//  - emits a static `out/` folder instead of a server build
//  - prefixes every internal link/asset with the repo's subpath
//  - serves images unoptimized (plain <img>-style, no /_next/image proxy)
const isStaticPreview = process.env.STATIC_EXPORT === "1";
const repoBasePath = "/PolycleanerNewVersion";

const nextConfig: NextConfig = {
  ...(isStaticPreview
    ? {
        output: "export",
        basePath: repoBasePath,
        assetPrefix: repoBasePath,
        images: { unoptimized: true },
        // A separate build folder so this can run alongside a live `next
        // dev` server without fighting it over `.next` (dev holds files
        // in there open, which makes clearing/rebuilding it fail).
        distDir: ".next-static",
      }
    : {}),
};

export default nextConfig;
