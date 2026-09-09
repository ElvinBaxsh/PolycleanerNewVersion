import type { Locale } from "./translations";

/**
 * Prefixes an internal path with the given locale's URL segment. English
 * stays unprefixed (the site's original, already-indexed URLs); Azerbaijani
 * lives under /az. Query strings/hashes already on `path` pass through.
 */
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  return path === "/" ? "/az" : `/az${path}`;
}

/**
 * Inverse of `localizePath` — strips a leading /az segment (if present) to
 * get the English-tree equivalent of a path, regardless of which locale
 * it's currently under. Used by the language switcher to compute "the same
 * page in the other language" from `usePathname()`.
 */
export function delocalizePath(path: string): string {
  if (path === "/az") return "/";
  if (path.startsWith("/az/")) return path.slice(3);
  return path;
}
