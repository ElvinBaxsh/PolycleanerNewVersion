"use client";

import { FileText, ClipboardList, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [null, FileText, ClipboardList, null, null, null];
const ICON_IMAGES = [
  "/images/icons/trimmed/inquiry.png",
  null,
  null,
  "/images/icons/trimmed/productionQC.png",
  "/images/icons/trimmed/cargo-ship.png",
  "/images/icons/trimmed/handshake-blue.png",
];

export default function HowWeWork() {
  const { t } = useLanguage();
  return (
    <section id="how-we-work" className="section-y scroll-mt-24 bg-soft-gray">
      <Container>
        <Reveal>
          <SectionHeading title={t.process.howWeWorkTitle} />
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {t.howWeWork.map((step, i) => {
            const Icon = ICONS[i];
            const iconSrc = ICON_IMAGES[i];
            return (
              <RevealItem key={i} className="relative flex flex-col items-center gap-2 text-center">
                <span className="absolute -top-2 -right-1 flex size-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white sm:right-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex size-20 items-center justify-center rounded-full bg-white text-brand-blue">
                  {Icon ? (
                    <Icon className="size-9 stroke-[1.5]" aria-hidden />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={iconSrc!} alt="" className="size-9 object-contain" />
                  )}
                </span>
                <p className="text-sm font-bold text-navy">{step.title}</p>
                <p className="text-xs leading-relaxed text-slate">{step.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
