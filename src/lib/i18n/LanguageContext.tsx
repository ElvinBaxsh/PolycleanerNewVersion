"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Locale } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)["en"];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "polycleaner-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // English renders first on every load (server + first client paint) so
  // there's no hydration mismatch; a returning visitor's saved Azerbaijani
  // choice is applied right after mount, which can cause a brief flash back
  // to English — an accepted trade-off for a purely client-side toggle with
  // no separate /az route.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "az") setLocaleState(saved);
    } catch {
      // localStorage unavailable (private mode, blocked) — stay on default "en".
    }
  }, []);

  // CSS `uppercase` (used all over — TrustBar, category pills, etc.) follows
  // the Unicode default case-folding unless the document's `lang` says
  // otherwise — under the default rules lowercase "i" uppercases to plain
  // "I", not the dotted Azerbaijani "İ" ("Bizi" → "BIZI" instead of "BİZİ").
  // Keeping `<html lang>` in sync with the chosen locale switches the
  // browser to Turkic case-folding rules, where "i"↔"İ" and "ı"↔"I" fold
  // correctly.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — nothing to persist to, the in-memory state still switches.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
