import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds the GitHub Pages preview (scripts/build-static-preview.sh):
// a plain `out/` folder served from /PolycleanerNewVersion/, with no server,
// so no image optimizer and no /api routes. Normal builds ignore all of it.
const isStaticPreview = process.env.STATIC_EXPORT === "1";
const repoBasePath = "/PolycleanerNewVersion";

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
      // The previous site had a /products page; Google still knows that URL.
      async redirects() {
        return [{ source: "/products", destination: "/rpet-flakes", permanent: true }];
      },
    };

export default nextConfig;
