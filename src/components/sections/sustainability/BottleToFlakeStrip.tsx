"use client";

import {
  Trash2,
  Settings,
  Droplet,
  Wind,
  Grid3x3,
  CheckCircle2,
  PackageCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import StepIcon from "@/components/ui/StepIcon";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: LucideIcon[] = [Trash2, Settings, Droplet, Wind, Grid3x3, CheckCircle2, PackageCheck];

export default function BottleToFlakeStrip() {
  const { t } = useLanguage();
  const steps = t.sustainabilitySteps;
  return (
    <section id="circular-economy" className="bg-soft-gray py-8 md:py-10 lg:py-12">
      <Container>
        <Reveal>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{t.sustainability.bottleToFlakeTitle}</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:flex lg:items-start lg:justify-between lg:gap-x-2">
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={i} className="flex items-start justify-center gap-2 lg:flex-1">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="flex size-24 items-center justify-center rounded-full border border-border bg-white text-brand-green">
                    <StepIcon name={step.name} fallback={Icon} className="size-14" />
                  </span>
                  <p className="text-xs font-bold text-navy">
                    {i + 1}. {step.name}
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate">{step.description}</p>
                </div>

                {i < steps.length - 1 && (
                  <ArrowRight
                    className="mt-11 hidden size-5 shrink-0 text-brand-green stroke-[1.6] lg:block"
                    aria-hidden
                  />
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
