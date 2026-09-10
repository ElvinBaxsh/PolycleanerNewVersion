"use client";

import { useEffect, useState } from "react";
import { FlaskConical, ArrowRight, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import InquiryButton from "@/components/inquiry/InquiryButton";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TAROPAK_EVENT, AMI_EXPO_EVENT } from "@/lib/constants";

type EventTab = "taropak" | "amiExpo";

export default function Hero() {
  const { t } = useLanguage();
  const [activeEvent, setActiveEvent] = useState<EventTab>("taropak");
  const isTaropak = activeEvent === "taropak";
  const event = isTaropak ? TAROPAK_EVENT : AMI_EXPO_EVENT;

  function advanceEvent() {
    setActiveEvent((prev) => (prev === "taropak" ? "amiExpo" : "taropak"));
  }

  // Auto-rotates between the two exhibitions; the effect re-runs (and so
  // restarts the wait) every time activeEvent changes — including a
  // manual tab click — so clicking never gets immediately overridden by
  // the timer.
  useEffect(() => {
    const id = setTimeout(advanceEvent, 6000);
    return () => clearTimeout(id);
  }, [activeEvent]);

  return (
    <section className="relative min-h-[580px] w-full overflow-hidden bg-navy pb-16 pt-12 lg:pb-24 lg:pt-16">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-rpet-flakes.webp"
          alt="Hot washed rPET flakes on the production line"
          fill
          priority
          sizes="100vw"
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

            {/* Sərgi Tab Keçidi — iki tədbir arasında seçim, kart öz
                yerini saxlayır, yalnız məzmunu dəyişir. */}
            <div className="flex gap-2" role="tablist" aria-label="Upcoming exhibitions">
              {(["taropak", "amiExpo"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeEvent === tab}
                  onClick={() => setActiveEvent(tab)}
                  className={clsx(
                    "cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors",
                    activeEvent === tab
                      ? "bg-brand-green text-navy"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  )}
                >
                  {tab === "taropak" ? "TAROPAK" : "AMI Expo"}
                </button>
              ))}
            </div>

            {/* Sərgi Kartı - Desktop və Mobil Dəqiq Düzülüş. Xarici
                konteyner (haşiyə/blur) sabit qalır, yalnız içindəki
                AnimatePresence bloku tab dəyişəndə (klik və ya avtomatik)
                yumşaq fade+slide ilə keçir. */}
            <div className="relative flex w-full items-stretch overflow-hidden rounded-xl border border-white/25 bg-[#071824]/85 backdrop-blur-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex w-full items-stretch"
                >
                  {/* Sol Ağ Loqo Bloku */}
                  <div className="relative w-[130px] shrink-0 bg-white p-2 sm:w-[160px] md:w-[120px] md:p-2">
                    <Image
                      src={isTaropak ? "/images/taropak-logo.webp" : "/images/cre-expo-icon.png"}
                      alt={isTaropak ? "TAROPAK 2026" : "Compounding & Recycling Expo EU 2026"}
                      fill
                      sizes="160px"
                      className={clsx("object-contain", isTaropak ? "p-1" : "p-3")}
                    />
                  </div>

                  {/* Mətn və Düymə Hissəsi — sətirdə düymə ilə yanaşı
                      düzülüş yalnız `lg`-də (əvvəl `md`-də idi), belə ki
                      aralıq enlərdə (məsələn tablet) mətn düymə ilə yer
                      üçün əvvəlcədən rəqabət aparmasın, tam eninə sahib
                      olub 2 sətirə rahat sığsın. */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3.5 lg:flex-row lg:items-center lg:gap-3 lg:px-4 lg:py-4">
                    <div className="min-w-0 flex-1 space-y-1">
                      <h4
                        className="line-clamp-2 min-h-[2.75em] cursor-default text-sm font-bold uppercase leading-snug text-white md:text-base lg:text-lg"
                        title={t.home.taropakMeetUs(event.name)}
                      >
                        {t.home.taropakMeetUs(event.name)}
                      </h4>
                      <p className="text-sm font-medium text-white/90 md:text-base">
                        {event.dates}
                      </p>
                      <p className="text-sm font-medium text-white/75 md:text-base">
                        {event.location}
                      </p>
                    </div>

                    <InquiryButton
                      type={activeEvent}
                      variant="outline"
                      size="sm"
                      className="h-9 w-fit shrink-0 whitespace-nowrap rounded-lg border-2 border-brand-green bg-transparent px-3.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-brand-green hover:text-navy md:h-10 md:px-4 md:text-sm"
                    >
                      {t.common.bookMeeting}
                    </InquiryButton>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tab-lardan başqa, DocumentGrid-dəki bannerlə eyni "next"
                  oxu — iki yerdə də eyni keçid mexanizmi olsun. */}
              <button
                type="button"
                onClick={advanceEvent}
                aria-label="Next exhibition"
                className="absolute right-1.5 top-1.5 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 md:right-2 md:top-2"
              >
                <ChevronRight className="size-3.5" aria-hidden />
              </button>
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