"use client";

import Image from "next/image";
import { Settings, FlaskConical, Users, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [null, Settings, FlaskConical, null, Users];
const ICON_IMAGES = [
  "/images/icons/trimmed/productionFacility.png",
  null,
  null,
  "/images/icons/trimmed/globus.png",
  null,
];

export default function NumbersStrip() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#F8FAFC] py-8 lg:py-10">
      <Container className="max-w-[1400px]">
        <Reveal>
          <h2 className="text-2xl font-extrabold text-[#0F2A4A] sm:text-3xl">
            {t.about.numbersTitle}
          </h2>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {t.companyNumbers.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem
                key={i}
                className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white px-3 sm:px-3.5 py-4 shadow-xs"
              >
                {/* İkon - Mətn bloku ilə eyni hündürlükdə böyüdüldü (52px - 58px) */}
                {Icon ? (
                  <Icon 
                    className="size-[52px] sm:size-[58px] shrink-0 text-[#0F2A4A] stroke-[1.3]" 
                    aria-hidden 
                  />
                ) : (
                  <span className="relative size-[52px] sm:size-[58px] shrink-0">
                    <Image src={ICON_IMAGES[i]!} alt="" fill className="object-contain" sizes="58px" />
                  </span>
                )}

                {/* Mətnlər - Sətir aralığı sıx, kəsilmədən tam eninə */}
                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  <p className="whitespace-nowrap text-xl sm:text-[22px] font-extrabold text-[#0F2A4A] leading-tight">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] sm:text-xs leading-[1.25] text-slate-500 font-normal">
                    {stat.label}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
} 