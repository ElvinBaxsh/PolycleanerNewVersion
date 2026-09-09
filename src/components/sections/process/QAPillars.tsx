"use client";

import { ShieldCheck, FileText, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [null, ShieldCheck, FileText, null];
const ICON_IMAGES = [
  "/images/icons/trimmed/consistentQuality.png",
  null,
  null,
  "/images/icons/trimmed/processTransparency.png",
];

export default function QAPillars() {
  const { t } = useLanguage();
  return (
    <section className="bg-slate-50/50 py-12 lg:py-16">
      <Container className="max-w-[1400px]">
        {/* Bölmə Başlığı - digər bölmələr kimi soldan */}
        <Reveal>
          <SectionHeading
            title={t.process.qaPillarsTitle}
            className="text-2xl sm:text-3xl font-extrabold text-[#0F2A4A]"
          />
        </Reveal>

        {/* Kartlar Qrupu */}
        <RevealGroup className="mt-8 sm:mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {t.qaPillars.map((item, i) => {
            const Icon = ICONS[i];
            const iconSrc = ICON_IMAGES[i];
            return (
              <RevealItem
                key={i}
                className="flex flex-col items-center text-center rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs h-full"
              >
                {/* İkon - Yaşıl rəngdə */}
                {Icon ? (
                  <Icon className="size-12 sm:size-14 shrink-0 stroke-[1.3] text-brand-green" aria-hidden />
                ) : (
                  // Plain <img> (not next/image): at this small a display size
                  // Next's optimizer re-encodes to a tiny lossy thumbnail that
                  // visibly darkens/desaturates fine linework like this badge —
                  // a plain img lets the browser scale the full-res PNG itself.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={iconSrc!}
                    alt=""
                    className="size-12 sm:size-14 shrink-0 object-contain"
                  />
                )}

                {/* Başlıq */}
                <h3 className="mt-5 text-base sm:text-lg font-bold text-[#0F2A4A] leading-snug">
                  {item.title}
                </h3>

                {/* Açıqlama Mətni */}
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                  {item.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}