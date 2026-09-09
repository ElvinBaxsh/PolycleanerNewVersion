"use client";

import Container from "@/components/ui/Container";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { COMPANY } from "@/lib/constants";

export default function TermsOfUseContent() {
  const { t } = useLanguage();
  return (
    <section className="section-y bg-white">
      <Container className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-navy">{t.legal.termsTitle}</h1>
        <p className="mt-4 text-slate">{t.legal.termsParagraph1}</p>
        <p className="mt-4 text-slate">{t.legal.termsParagraph2}</p>
        <p className="mt-4 text-slate">
          {t.legal.termsContactPrefix}{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-brand-blue underline">
            {COMPANY.email}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
