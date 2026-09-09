"use client";

import Container from "@/components/ui/Container";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { COMPANY } from "@/lib/constants";

export default function PrivacyPolicyContent() {
  const { t } = useLanguage();
  return (
    <section className="section-y bg-white">
      <Container className="prose-container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-navy">{t.legal.privacyTitle}</h1>
        <p className="mt-4 text-slate">{t.legal.privacyParagraph1}</p>
        <p className="mt-4 text-slate">{t.legal.privacyParagraph2}</p>
        <p className="mt-4 text-slate">
          {t.legal.privacyContactPrefix}{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-brand-blue underline">
            {COMPANY.email}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
