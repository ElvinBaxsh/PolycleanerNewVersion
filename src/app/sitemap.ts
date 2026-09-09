import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { localizePath } from "@/lib/i18n/localizePath";

const ROUTES = ["", "/about", "/rpet-flakes", "/process-quality", "/sustainability", "/documents", "/contact"];
const LEGAL_ROUTES = ["/privacy-policy", "/terms-of-use"];

export const dynamic = "force-static";

// A fixed date (not `new Date()`) keeps this route static — a request-time
// timestamp is exactly what "force-static" rules out. Bump this when page
// content actually changes meaningfully.
const LAST_MODIFIED = new Date("2026-09-09");

function entriesFor(route: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) {
  const enUrl = `${SITE_URL}${route}`;
  const azUrl = `${SITE_URL}${localizePath(route || "/", "az")}`;
  const languages = { en: enUrl, az: azUrl };
  return [
    { url: enUrl, lastModified: LAST_MODIFIED, changeFrequency, priority, alternates: { languages } },
    { url: azUrl, lastModified: LAST_MODIFIED, changeFrequency, priority, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTES.flatMap((route) => entriesFor(route, route === "" ? "weekly" : "monthly", route === "" ? 1 : 0.7)),
    ...LEGAL_ROUTES.flatMap((route) => entriesFor(route, "yearly", 0.3)),
  ];
}
