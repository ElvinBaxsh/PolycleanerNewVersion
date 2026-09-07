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
import StepIcon from "@/components/ui/StepIcon";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { PROCESS_STEPS } from "@/lib/constants";

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

const DEFAULT_ICON_KEYS = [
  "milk",
  "boxes",
  "droplets",
  "waves",
  "clipboardCheck",
  "packageCheck",
];

export default function ProcessStrip({
  eyebrow = "Our Process",
  title = "From Bottles to High Quality rPET Flakes",
  steps = PROCESS_STEPS,
  icons = DEFAULT_ICON_KEYS,
}: {
  eyebrow?: string;
  title?: string;
  steps?: { name: string; description: string }[];
  icons?: string[];
}) {
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

        {/* Sağ Hissə: Səliqəli və Balanslaşdırılmış İkonlar */}
        <RevealGroup className="grid grid-cols-2 gap-y-8 sm:flex sm:flex-1 sm:items-center sm:justify-between sm:gap-x-2">
          {steps.map((step, i) => {
            const Icon = ICON_MAP[icons[i]] || ICON_MAP[icons[0]] || Milk;

            return (
              <RevealItem
                key={step.name}
                className="flex items-center justify-center gap-2 sm:flex-1 sm:justify-between"
              >
                {/* İkon və Mətn Bloku */}
                <div className="flex flex-col items-center text-center">
                  {/* Sabit çərçivə: İkonlar daşmır və mərkəzdə durur */}
                  <div className="flex h-16 w-16 items-center justify-center text-brand-green sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                    <StepIcon
                      name={step.name}
                      fallback={Icon}
                      className="size-14 sm:size-[4.5rem] lg:size-20"
                    />
                  </div>

                  <p className="mt-2 whitespace-nowrap text-[10px] font-bold uppercase leading-tight tracking-wider text-[#0F2A4A] sm:text-[11px]">
                    {step.name}
                  </p>
                </div>

                {/* Oxlar */}
                {i < steps.length - 1 && (
                  <ArrowRight
                    className="hidden sm:block size-5 text-brand-green stroke-[1.6] shrink-0"
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