import type { Locale } from "./translations";

/**
 * The Azerbaijani URL of each English page, so /az URLs read as Azerbaijani
 * (/az/haqqimizda, not /az/about) — what Google's URL guidelines recommend
 * and what an Azerbaijani visitor sees in search results and shared links.
 *
 * Slugs are ASCII transliterations rather than Azerbaijani spelling: ə, ş,
 * ı, ç, ğ, ö and ü are percent-encoded in a URL (/az/%C9%99laq%C9%99) the
 * moment a link is copied, which is why Azerbaijani sites write them this way.
 *
 * Each value must match a folder name under src/app/az/.
 */
const AZ_SLUGS: Record<string, string> = {
  "/about": "/haqqimizda",
  "/rpet-flakes": "/rpet-fleks",
  "/process-quality": "/proses-ve-keyfiyyet",
  "/sustainability": "/dayaniqliliq",
  "/documents": "/senedler",
  "/contact": "/elaqe",
  "/privacy-policy": "/mexfilik-siyaseti",
  "/terms-of-use": "/istifade-sertleri",
};

const EN_PATHS: Record<string, string> = Object.fromEntries(
  Object.entries(AZ_SLUGS).map(([en, az]) => [az, en])
);

/** Splits "/contact?type=x#form" into ["/contact", "?type=x#form"]. */
function splitPath(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ""] : [path.slice(0, i), path.slice(i)];
}

/**
 * The given locale's URL for an English page path. English stays unprefixed
 * (the site's original URLs); Azerbaijani lives under /az with its own slug.
 * Only the path is translated — a query string or #anchor passes through
 * unchanged, since anchors are element ids on the (shared) page component.
 */
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  const [pathname, rest] = splitPath(path);
  if (pathname === "/") return `/az${rest}`;
  return `/az${AZ_SLUGS[pathname] ?? pathname}${rest}`;
}

/**
 * Inverse of `localizePath`: the English page path for a URL in either
 * locale. Used by the language switcher to find "the same page in the
 * other language" from `usePathname()`.
 */
export function delocalizePath(path: string): string {
  const [pathname, rest] = splitPath(path);
  if (pathname === "/az") return `/${rest}`;
  if (!pathname.startsWith("/az/")) return path;
  const slug = pathname.slice(3);
  return `${EN_PATHS[slug] ?? slug}${rest}`;
}
