"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PARTNERS } from "@/lib/constants";

const LOOP_PARTNERS = [...PARTNERS, ...PARTNERS];

export default function PartnersSection() {
  const { t } = useLanguage();
  const partnerText = t.partners;
  const loopPartnerText = [...partnerText, ...partnerText];
  const [paused, setPaused] = useState(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handlePauseStart() {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    setPaused(true);
  }
  function handlePauseEnd() {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), 1200);
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t.home.partnersEyebrow}
            title={t.home.partnersTitle}
            description={t.home.partnersDescription}
          />
        </Reveal>

        {/* Desktop / tablet grid */}
        <RevealGroup className="mt-10 hidden grid-cols-3 items-center gap-x-6 gap-y-6 sm:grid">
          {PARTNERS.map((partner, i) => (
            <RevealItem key={partner.name}>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partnerText[i].name} website`}
                className="flex h-24 items-center justify-center transition-transform duration-300 hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partnerText[i].name}
                  className="h-auto max-h-20 w-auto max-w-[160px] object-contain sm:max-h-24 sm:max-w-[190px]"
                />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Mobile Marquee */}
        <div
          onMouseEnter={handlePauseStart}
          onMouseLeave={handlePauseEnd}
          onPointerDown={handlePauseStart}
          onPointerUp={handlePauseEnd}
          onTouchStart={handlePauseStart}
          onTouchEnd={handlePauseEnd}
          className="scrollbar-none mt-10 overflow-x-auto sm:hidden"
        >
          <div
            className="flex w-max items-center gap-8"
            style={{
              animation: "partners-marquee 24s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {LOOP_PARTNERS.map((partner, i) => (
              <a
                key={`${partner.name}-${i}`}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${loopPartnerText[i].name} website`}
                className="flex h-16 shrink-0 items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={loopPartnerText[i].name}
                  className="h-auto max-h-16 w-auto max-w-[140px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <Reveal className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6 text-center sm:flex-row sm:justify-between sm:gap-4 sm:p-8 sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Böyüdülmüş İkon Konteyneri */}
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
              <Users className="size-7" aria-hidden />
            </span>
            <div>
              <p className="text-xl font-bold text-navy sm:text-2xl">{t.home.partnersCtaTitle}</p>
              <p className="text-sm text-slate-500">{t.home.partnersCtaDescription}</p>
            </div>
          </div>
          <Link
            href="/contact#form"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-green-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            {t.home.partnersCtaButton}
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}