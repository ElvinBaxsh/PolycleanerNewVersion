"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";

/**
 * The 404 body, shared by (main)/not-found.tsx and az/not-found.tsx — each
 * renders inside its own locale's AppShell/LanguageProvider, so this can
 * safely call useLanguage(). The true root src/app/not-found.tsx (reached
 * when a path matches no segment in either locale tree at all) can't use
 * this — it has no LanguageProvider ancestor.
 */
export default function NotFoundContent() {
  const { t, locale } = useLanguage();
  return (
    <section className="section-y bg-white">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">404</p>
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{t.notFound.title}</h1>
        <p className="max-w-md text-slate">
          {t.notFound.description}
        </p>
        <Button href={localizePath("/", locale)} showArrow>
          {t.common.backToHome}
        </Button>
      </Container>
    </section>
  );
}
