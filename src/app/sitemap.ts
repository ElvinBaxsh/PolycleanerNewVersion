import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES = ["", "/about", "/rpet-flakes", "/process-quality", "/sustainability", "/documents", "/contact"];
const LEGAL_ROUTES = ["/privacy-policy", "/terms-of-use"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed date (not `new Date()`) keeps this route static — a
  // request-time timestamp is exactly what "force-static" rules out.
  // Bump this when page content actually changes meaningfully.
  const lastModified = new Date("2026-09-09");

  return [
    ...ROUTES.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...LEGAL_ROUTES.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
