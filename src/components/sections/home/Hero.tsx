"use client";

import { FlaskConical, ArrowRight } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import InquiryButton from "@/components/inquiry/InquiryButton";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TAROPAK_EVENT } from "@/lib/constants";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[580px] w-full overflow-hidden bg-navy pb-16 pt-12 lg:pb-24 lg:pt-16">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-rpet-flakes.webp"
          alt="Hot washed rPET flakes on the production line"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40 lg:from-navy/95 lg:via-navy/85 lg:to-navy/20" />
      </div>

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 xl:grid-cols-12">
        {/* Sol Tərəf */}
        <div className="xl:col-span-6">
          {/* Eyebrow */}
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
              {t.home.heroEyebrow}
            </p>
          </Reveal>

          {/* Heading */}
          <Reveal>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[48px]">
              {t.home.heroTitleLine1}{" "}
              <span className="text-brand-green">{t.home.heroTitleAccent}</span> {t.home.heroTitleLine2}{" "}
              <br className="hidden sm:inline" />
              {t.home.heroTitleLine3}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {t.home.heroDescription}
            </p>
          </Reveal>

          {/* Əsas Düymə və Taropak Bloku */}
          <Reveal delay={0.2} className="mt-6 flex w-full max-w-[600px] flex-col gap-3">
            {/* Düymələr Sətiri */}
            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center">
              <InquiryButton
                type="offer"
                className="h-11 w-full justify-center rounded-lg bg-brand-green px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-green-dark sm:flex-[1.4]"
              >
                {t.common.requestRpetOffer}
                <ArrowRight className="ml-1.5 size-4 stroke-[2.5]" />
              </InquiryButton>

              <InquiryButton
                type="sample"
                variant="outline"
                className="h-11 w-full justify-center rounded-lg border border-white/30 bg-transparent px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 sm:flex-1"
              >
                {t.common.requestSample}
                <FlaskConical className="ml-1.5 size-4 stroke-[1.8]" aria-hidden />
              </InquiryButton>
            </div>

            {/* Taropak Event Card - Desktop və Mobil Dəqiq Düzülüş */}
            <div className="flex w-full items-stretch overflow-hidden rounded-xl border border-white/25 bg-[#071824]/85 backdrop-blur-md">
              {/* Sol Ağ Loqo Bloku */}
              <div className="relative w-[130px] shrink-0 bg-white p-2 sm:w-[160px] md:w-[120px] md:p-2">
                <Image
                  src="/images/taropak-logo.webp"
                  alt="TAROPAK 2026"
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Mətn və Düymə Hissəsi — kart indi daha enlidir (600px),
                  ona görə mətn böyük qala bilir, düymə ilə üst-üstə
                  düşmür. */}
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3.5 md:flex-row md:items-center md:gap-3 md:px-4 md:py-4">
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-sm font-bold uppercase leading-snug text-white md:text-base lg:text-lg">
                    {t.home.taropakMeetUs(TAROPAK_EVENT.name)}
                  </h4>
                  <p className="text-sm font-medium text-white/90 md:text-base">
                    {TAROPAK_EVENT.dates}
                  </p>
                  <p className="text-sm font-medium text-white/75 md:text-base">
                    {TAROPAK_EVENT.location}
                  </p>
                </div>

                <InquiryButton
                  type="taropak"
                  variant="outline"
                  size="sm"
                  className="h-9 w-fit shrink-0 whitespace-nowrap rounded-lg border-2 border-brand-green bg-transparent px-3.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-brand-green hover:text-navy md:h-10 md:px-4 md:text-sm"
                >
                  {t.common.bookMeeting}
                </InquiryButton>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sağ Tərəf - Video
            Play düyməsi müvəqqəti gizlədilib — hələ real video faylımız
            yoxdur. Video hazır olanda aşağıdakı bloku geri aç:

        <div className="relative flex items-center justify-center xl:col-span-6">
          <button
            type="button"
            aria-label="Play company video"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
          >
            <span className="relative flex size-20 items-center justify-center sm:size-24">
              <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
              <span className="animate-float relative flex size-20 items-center justify-center rounded-full border-2 border-white bg-white text-brand-green shadow-2xl sm:size-24">
                <Play className="ml-1 size-8 fill-current sm:size-10" />
              </span>
            </span>

            <span className="animate-float text-xs font-bold uppercase tracking-widest text-white [animation-delay:0.15s] [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
              Play Video
            </span>
          </button>
        </div>
        */}
      </Container>
    </section>
  );
}