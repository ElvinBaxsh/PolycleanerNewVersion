import type { Locale } from "./translations";

// Azerbaijani URL slug for each English page. ASCII only, because ə, ş, ı and
// the like get percent-encoded in URLs. Each value must match a folder under
// src/app/az/.
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

// The URL of an English path in the given language. The query and #anchor are
// kept.
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  const [pathname, rest] = splitPath(path);
  if (pathname === "/") return `/az${rest}`;
  return `/az${AZ_SLUGS[pathname] ?? pathname}${rest}`;
}

// The reverse: the English path for a URL in either language.
export function delocalizePath(path: string): string {
  const [pathname, rest] = splitPath(path);
  if (pathname === "/az") return `/${rest}`;
  if (!pathname.startsWith("/az/")) return path;
  const slug = pathname.slice(3);
  return `${EN_PATHS[slug] ?? slug}${rest}`;
}
