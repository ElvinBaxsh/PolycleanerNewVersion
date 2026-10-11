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

  // <html lang> is rendered as "en" for both languages, so fix it on the
  // client. Modals rendered outside the page wrapper rely on this.
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
