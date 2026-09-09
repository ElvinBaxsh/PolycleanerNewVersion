"use client";

import { Leaf, Milk, Droplet, Info, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [Leaf, Milk, Droplet, null, null];
const ICON_SRCS = [null, null, null, "/images/icons/trimmed/power.png", "/images/icons/trimmed/workplace-culture.png"];

export default function ImpactStats() {
  const { t } = useLanguage();
  return (
    <section id="impact" className="py-8 bg-slate-50/50">
      <Container className="max-w-[1400px]">
        {/* Section Başlığı */}
        <Reveal>
          <h2 className="mb-6 text-xl sm:text-2xl font-extrabold text-[#0F2A4A] tracking-tight">
            {t.sustainability.impactAtGlanceTitle}
          </h2>
        </Reveal>

        {/* Tək Bütöv Şerit Kart */}
        <RevealGroup className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
          {t.impactStats.map((stat, i) => {
            const Icon = ICONS[i];
            const value = stat.value;
            const iconSrc = ICON_SRCS[i];

            return (
              <RevealItem
                key={i}
                className="flex items-center gap-3.5 px-4 py-5 sm:px-5"
              >
                {/* İkon - Rənginizə uyğun saxlanılıb */}
                {Icon ? (
                  <Icon className="size-10 sm:size-11 shrink-0 stroke-[1.4] text-brand-green" aria-hidden />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={iconSrc!} alt="" className="size-10 sm:size-11 shrink-0 object-contain" />
                )}

                {/* Mətnlər */}
                <div className="min-w-0 flex-1">
                  {/* İri Yaşıl Dəyər / Rəqəm — ikonla eyni yaşıl */}
                  <p className="text-xl sm:text-2xl font-extrabold text-brand-green leading-none tracking-tight">
                    {value}
                  </p>

                  {/* Qalın Qara Başlıq */}
                  <p className="mt-1 text-[11px] sm:text-xs font-black uppercase tracking-wide text-black leading-tight">
                    {stat.title}
                  </p>

                  {/* Alt Açıqlama */}
                  <p className="mt-1 text-[10px] sm:text-[11px] leading-tight text-slate-500 font-normal">
                    {stat.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Alt Qeyd */}
        <Reveal delay={0.1}>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <Info className="size-3 text-slate-400 shrink-0" />
            {t.sustainability.impactFootnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}