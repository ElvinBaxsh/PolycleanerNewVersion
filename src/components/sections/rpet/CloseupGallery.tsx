"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const IMAGES = [
  "/images/transparent.jpg",
  "/images/lightBlue.jpg",
  "/images/green.jpg",
  "/images/mixedColors.jpg",
  "/images/closeUpViewLast.jpg",
];

export default function CloseupGallery() {
  const { t } = useLanguage();
  const closeups = t.closeups.map((c, i) => ({ label: c.label, image: IMAGES[i] }));
  const loopCloseups = [...closeups, ...closeups];
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
    <section className="bg-soft-gray py-10 lg:py-14">
      <Container>
        <Reveal>
          <h2 className="text-xl font-bold text-navy sm:text-2xl">{t.rpet.closeupTitle}</h2>
        </Reveal>

        {/* Mobile: "Partners" marquee texnikası — siyahı 2x təkrarlanıb CSS
            animasiyası ilə sola sürüşür, həm avtomatik davam edir, həm də
            toxunanda dayanıb əl ilə scroll oluna bilir. sm+: əvvəlki kimi
            statik grid. */}
        <div
          onMouseEnter={handlePauseStart}
          onMouseLeave={handlePauseEnd}
          onPointerDown={handlePauseStart}
          onPointerUp={handlePauseEnd}
          onTouchStart={handlePauseStart}
          onTouchEnd={handlePauseEnd}
          className="scrollbar-none -mx-5 mt-6 overflow-x-auto px-5 sm:hidden"
        >
          <div
            className="flex w-max items-stretch gap-3"
            style={{
              animationName: "partners-marquee",
              animationDuration: "30s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {loopCloseups.map((item, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${item.label}-${i}`}
                src={item.image}
                alt={item.label}
                className="aspect-[16/10] w-56 shrink-0 rounded-xl border border-slate-100 object-cover shadow-xs"
              />
            ))}
          </div>
        </div>

        <RevealGroup className="mt-6 hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {closeups.map((item, i) => (
            <RevealItem
              key={i}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xs"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
