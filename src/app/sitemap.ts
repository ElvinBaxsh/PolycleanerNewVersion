import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES = ["", "/about", "/rpet-flakes", "/process-quality", "/sustainability", "/documents", "/contact"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed date (not `new Date()`) keeps this route static — a
  // request-time timestamp is exactly what "force-static" rules out.
  const lastModified = new Date("2026-01-01");

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
