"use client";

import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { APPLICATIONS } from "@/lib/constants";

const ICON_IMAGES = [
  "/images/icons/trimmed/sheet.png",
  "/images/icons/trimmed/strap.png",
  "/images/icons/trimmed/fiber.png",
  "/images/icons/trimmed/nonFoodPacking.png",
  "/images/icons/trimmed/trading.png",
];

function Card({ name, description, iconSrc }: { name: string; description: string; iconSrc: string }) {
  return (
    <div className="flex h-full flex-col items-center gap-2.5 rounded-2xl border border-border bg-white p-4 text-center">
      {/* Fixed height + auto width (plain img, not next/image fill):
          every icon's actual ink ends up the same height regardless of
          whether the source glyph is wide/flat (Sheet, Strap) or squarish
          (Trading) — a fixed square box would've let the flat ones look
          smaller. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt=""
        className="h-auto max-h-14 w-auto max-w-[100px] object-contain sm:max-h-16 sm:max-w-[116px]"
      />
      <p className="text-sm font-bold uppercase tracking-wide text-navy">{name}</p>
      <p className="text-xs text-slate">{description}</p>
    </div>
  );
}

export default function Applications() {
  const { t } = useLanguage();
  const applications = t.applications;
  const loopApplications = [...applications, ...applications];
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
    <section className="bg-soft-gray py-8 lg:py-10">
      <Container>
        <Reveal>
          <SectionHeading title={t.rpet.applicationsTitle} description={t.rpet.applicationsDescription} />
        </Reveal>

        {/* Mobile: "Partners" marquee texnikası — siyahı 2x təkrarlanıb CSS
            animasiyası ilə sürüşür, həm avtomatik davam edir, həm də
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
            className="flex w-max items-stretch gap-4"
            style={{
              animationName: "partners-marquee",
              animationDuration: "26s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {loopApplications.map((app, i) => (
              <div key={`${app.name}-${i}`} className="w-40 shrink-0">
                <Card name={app.name} description={app.description} iconSrc={ICON_IMAGES[i % APPLICATIONS.length]} />
              </div>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-6 hidden gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {applications.map((app, i) => (
            <RevealItem key={i} className="h-full">
              <Card name={app.name} description={app.description} iconSrc={ICON_IMAGES[i]} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
