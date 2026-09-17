"use client";

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
import { useMarqueePause } from "@/components/ui/useMarqueePause";
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

// The static one-row layout only from xl (1280px), where the content
// container reaches its 1220px maximum; narrower screens use the scrolling
// strip. The 6 home steps fit beside the 230px title there. About's 7 steps
// never do — the container stops growing, so no larger breakpoint helps —
// so that variant keeps its title above the row and gives the row the full
// width. Complete class names per variant, because Tailwind only generates
// classes it finds written out in the source.
const LAYOUT = {
  home: {
    container: "flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between",
    title: "xl:w-[230px] xl:shrink-0",
    strip: "scrollbar-none -mx-5 overflow-x-auto px-5 md:-mx-8 md:px-8 xl:hidden",
    row: "hidden xl:flex xl:flex-1 xl:items-start",
    item: "relative flex min-w-0 justify-center xl:flex-1",
  },
  about: {
    container: "flex flex-col gap-8",
    title: "",
    strip: "scrollbar-none -mx-5 overflow-x-auto px-5 md:-mx-8 md:px-8 xl:hidden",
    row: "hidden xl:flex xl:flex-1 xl:items-start",
    item: "relative flex min-w-0 justify-center xl:flex-1",
  },
} as const;

export default function ProcessStrip({ variant = "home" }: { variant?: "home" | "about" }) {
  const { t } = useLanguage();
  const eyebrow = variant === "about" ? t.about.processEyebrow : t.home.processEyebrow;
  const title = variant === "about" ? t.about.processTitle : t.home.processTitle;
  const steps = variant === "about" ? t.aboutProcessSteps : t.processSteps;
  const icons = variant === "about" ? ABOUT_ICON_KEYS : HOME_ICON_KEYS;
  const layout = LAYOUT[variant];

  const { paused, handlers: pauseHandlers } = useMarqueePause();

  function StepContent({ step, i }: { step: { name: string; description: string }; i: number }) {
    const Icon = ICON_MAP[icons[i]] || ICON_MAP[icons[0]] || Milk;
    return (
      <div className="flex flex-col items-center text-center">
        {/* Sabit çərçivə: İkonlar daşmır və mərkəzdə durur */}
        <div className="flex h-16 w-16 items-center justify-center text-brand-green sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          <StepIcon name={step.name} fallback={Icon} className="size-14 sm:size-[4.5rem] lg:size-20" />
        </div>
        <p className="mt-2 whitespace-nowrap text-[10px] font-bold uppercase leading-tight tracking-wider text-[#0F2A4A] sm:text-[11px] xl:whitespace-normal xl:[text-wrap:balance]">
          {step.name}
        </p>
      </div>
    );
  }

  const loopSteps = [...steps, ...steps];

  return (
    <section className="bg-white py-10 lg:py-12 border-y border-slate-100">
      <Container className={layout.container}>
        {/* Sol Hissə: Başlıq */}
        <Reveal className={layout.title}>
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
          {...pauseHandlers}
          className={layout.strip}
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

        {/* Wide screens: steps share the full width in one static row, from
            xl (see LAYOUT). Every step gets an equal column with its icon
            centred, and each arrow sits on the boundary between two columns at
            icon height — so it is always the same distance from the icons on
            either side. It used to be pushed to the end of each step's box,
            which put it close to steps with long labels ("QABLAŞDIRMA VƏ
            YÜKLƏMƏ") and far from short ones. Labels may wrap here to stay in
            their column. */}
        <RevealGroup className={layout.row}>
          {steps.map((step, i) => (
            <RevealItem key={i} className={layout.item}>
              <StepContent step={step} i={i} />
              {i < steps.length - 1 && (
                <ArrowRight
                  className="absolute right-0 top-12 size-5 translate-x-1/2 -translate-y-1/2 text-brand-green stroke-[1.6]"
                  aria-hidden
                />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
