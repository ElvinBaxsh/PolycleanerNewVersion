"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";
import { readConsent, subscribeConsent, writeConsent } from "@/lib/consent";

// Analytics cookies need the visitor's consent. Until they choose, a small
// banner is shown and nothing from Google is loaded.
export default function CookieConsent() {
  const { t, locale } = useLanguage();
  // "pending" on the server and during hydration, so nothing flashes.
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "pending" as const);

  // Consent withdrawn after it was given: stop Analytics and drop its cookies.
  useEffect(() => {
    if (consent !== "denied" || !window.gtag) return;
    window.gtag("consent", "update", { analytics_storage: "denied" });
    const domain = location.hostname.replace("www.", "");
    for (const cookie of document.cookie.split("; ")) {
      const name = cookie.split("=")[0];
      if (!name.startsWith("_ga")) continue;
      const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = expired;
      document.cookie = `${expired}; domain=.${domain}`;
    }
  }, [consent]);

  if (consent === "granted") return <GoogleAnalytics />;
  if (consent !== "undecided") return null;

  return (
    <div
      role="region"
      aria-label={t.cookies.settings}
      className="fixed inset-x-3 bottom-3 z-[90] rounded-2xl border border-border bg-white p-4 shadow-2xl sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm sm:p-5"
    >
      <p className="text-sm leading-relaxed text-slate">
        {t.cookies.text}{" "}
        <Link
          href={localizePath("/privacy-policy", locale)}
          className="font-semibold text-brand-blue underline underline-offset-2"
        >
          {t.footer.privacyPolicy}
        </Link>
      </p>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className="h-10 flex-1 cursor-pointer rounded-lg bg-brand-green px-4 text-sm font-bold text-white transition-colors hover:bg-brand-green-dark"
        >
          {t.cookies.accept}
        </button>
        <button
          type="button"
          onClick={() => writeConsent("denied")}
          className="h-10 flex-1 cursor-pointer rounded-lg border border-border px-4 text-sm font-bold text-navy transition-colors hover:bg-soft-gray"
        >
          {t.cookies.decline}
        </button>
      </div>
    </div>
  );
}
