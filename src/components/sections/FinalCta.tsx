"use client";

import { MessageCircle, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { COMPANY } from "@/lib/constants";

export default function FinalCta({
  variant = "home",
}: {
  variant?: "home" | "process" | "sustainability";
}) {
  const { t } = useLanguage();
  const resolvedTitle = variant === "process" ? t.process.finalCtaTitle : t.home.finalCtaTitle;
  const resolvedDescription =
    variant === "process"
      ? t.process.finalCtaDescription
      : variant === "sustainability"
      ? t.sustainability.finalCtaDescription
      : t.home.finalCtaDescription;
  return (
    <section className="border-b border-white/10 bg-navy py-6">
      <Reveal>
        <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">{resolvedTitle}</h2>
            <p className="mt-1 max-w-xl text-sm text-white/70">{resolvedDescription}</p>
          </div>
          <div className="flex w-full flex-shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <a
              href={`https://wa.me/${COMPANY.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-5 text-sm font-semibold text-white hover:bg-brand-green-dark sm:w-auto"
            >
              <MessageCircle className="size-4" aria-hidden />
              {t.common.chatOnWhatsapp}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy sm:w-auto"
            >
              <Mail className="size-4" aria-hidden />
              {t.common.sendAnEmail}
            </a>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
