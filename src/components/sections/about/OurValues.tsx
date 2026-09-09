"use client";

import Container from "@/components/ui/Container";
import MaskIcon from "@/components/ui/MaskIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Custom line-art icons from public/images/icons, in COMPANY_VALUES order.
const ICONS = [
  "/images/icons/trimmed/valueWaste.png",
  "/images/icons/trimmed/reliability.png",
  "/images/icons/trimmed/sustainability.png",
  "/images/icons/trimmed/traceability.png",
];

export default function OurValues() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#F8FAFC] py-12 lg:py-16">
      <Container className="max-w-[1400px]">
        <Reveal>
          <SectionHeading
            title={t.about.valuesTitle}
            className="text-2xl sm:text-3xl font-extrabold text-[#0F2A4A]"
          />
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.companyValues.map((value, i) => (
            <RevealItem
              key={i}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs"
            >
              {/* İkon - Mətn blokunun hündürlüyünə tam bərabərdir */}
              <MaskIcon 
                src={ICONS[i]} 
                className="size-14 sm:size-16 shrink-0 text-[#258D2A] object-contain" 
              />

              {/* Yazılar - Geniş və eninə yayılan text */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-sm sm:text-[15px] font-bold text-[#0F2A4A] leading-tight">
                  {value.title}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs leading-[1.35] text-slate-500 font-normal">
                  {value.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}