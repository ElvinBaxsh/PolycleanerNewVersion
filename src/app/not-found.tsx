import AppShell from "@/components/layout/AppShell";
import NotFoundContent from "@/components/layout/NotFoundContent";

/**
 * Reached for any path that matches no route at all in either locale tree
 * (Next.js always resolves genuinely-unmatched URLs to the root not-found,
 * never a nested one — confirmed via Next's own docs). There's no way to
 * know which locale the visitor intended (not-found components receive no
 * path/props), so this defaults to English — the site's default locale —
 * but reuses the real AppShell so a 404 still gets full Header/Footer/nav
 * chrome instead of a bare fallback.
 */
export default function NotFound() {
  return (
    <AppShell initialLocale="en">
      <NotFoundContent />
    </AppShell>
  );
}
