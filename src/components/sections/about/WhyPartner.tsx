"use client";

import Image from "next/image";
import { Settings, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [Settings, null, null, null];
const ICON_IMAGES = [
  null,
  "/images/icons/trimmed/globus.png",
  "/images/icons/trimmed/flexibleSloutions.png",
  "/images/icons/trimmed/customeFocused.png",
];

export default function WhyPartner() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#F8FAFC] py-12 lg:py-16">
      <Container className="max-w-[1400px]">
        <Reveal>
          <SectionHeading
            title={t.about.whyPartnerTitle}
            className="text-2xl sm:text-3xl font-extrabold text-[#0F2A4A]"
          />
        </Reveal>

        <Reveal className="mt-8">
          <RevealGroup className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {t.whyPartnerItems.map((item, i) => {
              const Icon = ICONS[i];
              const iconSrc = ICON_IMAGES[i];
              return (
                <RevealItem
                  key={i}
                  className="flex items-start gap-3.5 p-5 sm:p-6"
                >
                  {/* İkonlar - Hər iki tip üçün ölçülər eyniləşdirildi */}
                  {Icon ? (
                    <Icon
                      className="size-15 sm:size-[68px] shrink-0 text-[#0F2A4A] stroke-[1.3] -mt-0.5"
                      aria-hidden
                    />
                  ) : (
                    <span className="relative size-14 sm:size-[64px] shrink-0 -mt-0.5">
                      <Image src={iconSrc!} alt="" fill className="object-contain" sizes="64px" />
                    </span>
                  )}

                  {/* Mətnlər */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F2A4A] leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-[12px] leading-relaxed text-slate-500 font-normal">
                      {item.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Reveal>
      </Container>
    </section>
  );
}