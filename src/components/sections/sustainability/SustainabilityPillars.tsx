"use client";

import { Users, FileText, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [null, null, Users, null, FileText];
const ICON_IMAGES = [
  "/images/icons/trimmed/ecology.png",
  "/images/icons/trimmed/bar-chart.png",
  null,
  "/images/icons/trimmed/handshake.png",
  null,
];

export default function SustainabilityPillars() {
  const { t } = useLanguage();
  return (
    <section id="pillars" className="bg-white py-8 md:py-10 lg:py-12">
      <Container>
        <Reveal>
          <SectionHeading title={t.sustainability.pillarsTitle} />
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {t.sustainabilityPillars.map((item, i) => {
            const Icon = ICONS[i];
            const iconSrc = ICON_IMAGES[i];
            return (
              <RevealItem
                key={i}
                className="flex h-full flex-col items-center rounded-2xl border border-border p-6 text-center"
              >
                <span className="flex size-20 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-brand-green">
                  {Icon ? (
                    <Icon className="size-10 stroke-[1.5]" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={iconSrc!} alt="" className="size-10 object-contain" />
                  )}
                </span>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
