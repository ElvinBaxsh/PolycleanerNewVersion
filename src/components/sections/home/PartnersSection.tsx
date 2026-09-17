"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, LayoutGrid, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useMarqueePause } from "@/components/ui/useMarqueePause";
import InquiryButton from "@/components/inquiry/InquiryButton";
import PartnersModal from "./PartnersModal";
import PartnersDiamond from "./PartnersDiamond";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PARTNERS } from "@/lib/constants";
import { equalAreaFactors } from "@/lib/logoSize";

const LOOP_PARTNERS = [...PARTNERS, ...PARTNERS];

export default function PartnersSection() {
  const { t } = useLanguage();
  const partnerText = t.partners;
  const loopPartnerText = [...partnerText, ...partnerText];
  const { paused, handlers: pauseHandlers } = useMarqueePause();
  const [modalOpen, setModalOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // The strip sits well down the page, so a marquee started at page load
  // would already be mid-run (logos clipped at both edges) by the time
  // anyone scrolls to it. Hold it at the first partner until the section
  // is actually on screen, then start from the beginning.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Browsers can restore a scroll container's offset across reloads.
    el.scrollLeft = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

        {/* Desktop: every partner at once, as a diamond wall. */}
        <Reveal className="mt-12 hidden lg:block">
          <PartnersDiamond />
        </Reveal>

        {/* Below desktop the wall doesn't fit, so partners run as a strip.
            A static grid stopped fitting once the list grew past ~6 logos —
            a single scrolling strip keeps the section a fixed, compact height
            however many partners get added. Logos get equal optical area
            (see equalAreaFactors) instead of one shared width. */}
        <div
          ref={scrollerRef}
          {...pauseHandlers}
          className="scrollbar-none mt-10 overflow-x-auto [--logo-u:60px] sm:[--logo-u:70px] lg:hidden"
        >
          {/* Yalnız uzun (longhand) animasiya xüsusiyyətləri: `animation`
              qısaltması ilə `animationPlayState`-i eyni style obyektində
              qarışdırmaq React-in "mixing shorthand and non-shorthand"
              xətasını verirdi (hover-də pauza da etibarsız olurdu). */}
          <div
            className="flex w-max items-center gap-8 sm:gap-12"
            style={{
              animationName: started ? "partners-marquee" : "none",
              // Scales with the partner count so the strip keeps the same
              // speed as partners are added (it was tuned at 32s for 10).
              animationDuration: `${PARTNERS.length * 3.2}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {LOOP_PARTNERS.map((partner, i) => {
              const logo = equalAreaFactors(partner.ratio);
              return (
                <a
                  key={`${partner.name}-${i}`}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${loopPartnerText[i].name} website`}
                  className="flex h-16 shrink-0 items-center justify-center transition-transform duration-300 hover:-translate-y-1 sm:h-24"
                >
                  {/* decoding="async" keeps a logo's first decode off the
                      thread the page scrolls on. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt={loopPartnerText[i].name}
                    decoding="async"
                    className="max-w-[150px] object-contain sm:max-w-[200px]"
                    style={{
                      width: `calc(var(--logo-u) * ${logo.width.toFixed(4)})`,
                      height: `calc(var(--logo-u) * ${logo.height.toFixed(4)})`,
                    }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* The strip only ever shows a few logos at a time — this opens the
            full list at once. The desktop wall already shows them all. */}
        <div className="mt-6 flex justify-center lg:hidden">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand-green/40 hover:bg-soft-gray"
          >
            <LayoutGrid className="size-4 text-brand-green" aria-hidden />
            {t.home.partnersViewAll(PARTNERS.length)}
          </button>
        </div>

        <PartnersModal open={modalOpen} onClose={() => setModalOpen(false)} />

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
          <InquiryButton
            type="partner"
            variant="outline"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full !border-0 !bg-brand-green-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:!bg-navy"
          >
            {t.home.partnersCtaButton}
            <ChevronRight className="size-4" aria-hidden />
          </InquiryButton>
        </Reveal>
      </Container>
    </section>
  );
}
