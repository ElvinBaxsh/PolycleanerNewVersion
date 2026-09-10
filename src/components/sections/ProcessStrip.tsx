"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Milk,
  Boxes,
  Droplets,
  Waves,
  ClipboardCheck,
  PackageCheck,
  Truck,
  Layers,
  Settings,
  Droplet,
  Wind,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import StepIcon from "@/components/ui/StepIcon";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICON_MAP: Record<string, LucideIcon> = {
  milk: Milk,
  boxes: Boxes,
  droplets: Droplets,
  waves: Waves,
  clipboardCheck: ClipboardCheck,
  packageCheck: PackageCheck,
  truck: Truck,
  layers: Layers,
  settings: Settings,
  droplet: Droplet,
  wind: Wind,
};

const HOME_ICON_KEYS = ["milk", "boxes", "droplets", "waves", "clipboardCheck", "packageCheck"];
const ABOUT_ICON_KEYS = ["truck", "layers", "settings", "droplet", "wind", "clipboardCheck", "packageCheck"];

export default function ProcessStrip({ variant = "home" }: { variant?: "home" | "about" }) {
  const { t } = useLanguage();
  const eyebrow = variant === "about" ? t.about.processEyebrow : t.home.processEyebrow;
  const title = variant === "about" ? t.about.processTitle : t.home.processTitle;
  const steps = variant === "about" ? t.aboutProcessSteps : t.processSteps;
  const icons = variant === "about" ? ABOUT_ICON_KEYS : HOME_ICON_KEYS;

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

  function StepContent({ step, i }: { step: { name: string; description: string }; i: number }) {
    const Icon = ICON_MAP[icons[i]] || ICON_MAP[icons[0]] || Milk;
    return (
      <div className="flex flex-col items-center text-center">
        {/* Sabit çərçivə: İkonlar daşmır və mərkəzdə durur */}
        <div className="flex h-16 w-16 items-center justify-center text-brand-green sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          <StepIcon name={step.name} fallback={Icon} className="size-14 sm:size-[4.5rem] lg:size-20" />
        </div>
        <p className="mt-2 whitespace-nowrap text-[10px] font-bold uppercase leading-tight tracking-wider text-[#0F2A4A] sm:text-[11px]">
          {step.name}
        </p>
      </div>
    );
  }

  const loopSteps = [...steps, ...steps];

  return (
    <section className="bg-white py-10 lg:py-12 border-y border-slate-100">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Sol Hissə: Başlıq */}
        <Reveal className="lg:w-[230px] lg:shrink-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-green">
            {eyebrow}
          </p>
          <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#0F2A4A] leading-snug">
            {title}
          </h2>
        </Reveal>

        {/* Mobile: eyni "Partners" marquee texnikası (siyahı 2x təkrarlanır,
            CSS animasiyası ilə sürüşür) — həm avtomatik davam edir, həm də
            toxunanda/sürüşdürəndə dayanıb əl ilə scroll oluna bilir. */}
        <div
          onMouseEnter={handlePauseStart}
          onMouseLeave={handlePauseEnd}
          onPointerDown={handlePauseStart}
          onPointerUp={handlePauseEnd}
          onTouchStart={handlePauseStart}
          onTouchEnd={handlePauseEnd}
          className="scrollbar-none -mx-5 overflow-x-auto px-5 sm:hidden"
        >
          <div
            className="flex w-max items-center gap-x-6"
            style={{
              animationName: "partners-marquee",
              animationDuration: "28s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {loopSteps.map((step, i) => {
              const stepIndex = i % steps.length;
              return (
                <div key={`${step.name}-${i}`} className="flex shrink-0 items-center gap-2">
                  <StepContent step={step} i={stepIndex} />
                  <ArrowRight className="size-5 shrink-0 text-brand-green stroke-[1.6]" aria-hidden />
                </div>
              );
            })}
          </div>
        </div>

        {/* sm+: bütün en boyu bərabər paylanır, scroll lazım olmur. */}
        <RevealGroup className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between sm:gap-x-2">
          {steps.map((step, i) => (
            <RevealItem key={i} className="flex items-center gap-2 sm:flex-1 sm:justify-between">
              <StepContent step={step} i={i} />
              {i < steps.length - 1 && (
                <ArrowRight className="size-5 shrink-0 text-brand-green stroke-[1.6]" aria-hidden />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
