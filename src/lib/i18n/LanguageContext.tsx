"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { translations, type Locale } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  t: (typeof translations)["en"];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale = "en",
  children,
}: {
  initialLocale?: Locale;
  children: ReactNode;
}) {
  const locale = initialLocale;

  // CSS `uppercase` (used all over — TrustBar, category pills, etc.) follows
  // the Unicode default case-folding unless the document's `lang` says
  // otherwise — under the default rules lowercase "i" uppercases to plain
  // "I", not the dotted Azerbaijani "İ" ("Bizi" → "BIZI" instead of "BİZİ").
  // Keeping `<html lang>` in sync with the chosen locale switches the
  // browser to Turkic case-folding rules, where "i"↔"İ" and "ı"↔"I" fold
  // correctly. The root `<html>` tag itself is still statically "en" (one
  // shared root layout serves both locale trees) — this effect corrects it
  // post-hydration until that's split into per-locale root layouts.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({ locale, t: translations[locale] }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
