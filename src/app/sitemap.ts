import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES = ["", "/about", "/rpet-flakes", "/process-quality", "/sustainability", "/documents", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
