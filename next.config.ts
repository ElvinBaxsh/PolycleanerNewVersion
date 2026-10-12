import { existsSync } from "node:fs";
import type { NextConfig } from "next";
import imageSizes from "./src/lib/image-sizes.json";

// STATIC_EXPORT=1 builds the GitHub Pages preview (scripts/build-static-preview.sh):
// a plain `out/` folder served from /PolycleanerNewVersion/, with no server,
// so no image optimizer and no /api routes. Normal builds ignore all of it.
const isStaticPreview = process.env.STATIC_EXPORT === "1";
const repoBasePath = "/PolycleanerNewVersion";

// BUILD_STANDALONE=1 builds the self-contained server for the hosting
// (.github/workflows/hosting-package.yml packs it into a zip).
const isHostingBuild = process.env.BUILD_STANDALONE === "1";

// Photos are served as ready-made WebP copies (scripts/build-image-variants.mjs)
// instead of being resized by the server: the hosting's CPU can't run the
// optimizer. Without the copies, or in `next dev`, Next resizes as usual.
const useImageVariants =
  !isStaticPreview && process.env.NODE_ENV === "production" && existsSync("public/_img");

const ONE_DAY = "public, max-age=86400";
const ONE_YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = isStaticPreview
  ? {
      output: "export",
      basePath: repoBasePath,
      assetPrefix: repoBasePath,
      images: { unoptimized: true },
      // Its own folder, so it can build while `next dev` is running.
      distDir: ".next-static",
    }
  : {
      ...(isHostingBuild ? { output: "standalone" as const } : {}),
      images: {
        ...imageSizes,
        ...(useImageVariants
          ? { loader: "custom" as const, loaderFile: "./src/lib/image-loader.ts" }
          : {}),
      },
      env: { NEXT_PUBLIC_IMAGE_VARIANTS: useImageVariants ? "1" : "" },
      async headers() {
        return [
          {
            // The file name carries a hash of the photo, so it never changes.
            source: "/_img/:path*",
            headers: [{ key: "Cache-Control", value: ONE_YEAR }],
          },
          { source: "/images/:path*", headers: [{ key: "Cache-Control", value: ONE_DAY }] },
          // The video URLs carry a version (videoUrl in src/lib/constants.ts).
          { source: "/video/:path*", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
        ];
      },
      // The previous site had a /products page; Google still knows that URL.
      async redirects() {
        return [{ source: "/products", destination: "/rpet-flakes", permanent: true }];
      },
    };

export default nextConfig;
