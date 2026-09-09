"use client";

import { Droplet, ShieldAlert, Tags, CircleDashed, Recycle, PackageCheck, Palette, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { KEY_SPECS } from "@/lib/constants";

const ICONS: LucideIcon[] = [Droplet, ShieldAlert, Tags, CircleDashed, Recycle, PackageCheck, Palette];

export default function KeySpecsStrip() {
  const { t } = useLanguage();
  return (
    <section className="pb-10 bg-white">
      <Container>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold text-navy sm:text-3xl">{t.process.keySpecsTitle}</h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {KEY_SPECS.map((spec, i) => {
            const Icon = ICONS[i];
            const isColorOptions = i === KEY_SPECS.length - 1;
            const value = isColorOptions ? t.process.colorOptionsValue : spec.value;
            return (
              <RevealItem key={spec.label} className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 text-center">
                <Icon className="size-9 stroke-[1.5] text-brand-green" aria-hidden />
                <p className="text-sm font-extrabold leading-tight text-navy">{value}</p>
                <p className="text-[11px] leading-snug text-slate">{t.keySpecs[i].label}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <p className="mt-4 text-xs text-slate/60">
          {t.process.keySpecsFootnote}
        </p>
      </Container>
    </section>
  );
}
