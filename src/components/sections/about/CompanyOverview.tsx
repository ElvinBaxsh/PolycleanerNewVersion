"use client";

import Image from "next/image";
import { MapPin, CalendarDays, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [MapPin, CalendarDays, null];

export default function CompanyOverview() {
  const { t } = useLanguage();
  const facts = [
    { label: t.about.factsLocation, value: t.about.factsLocationValue },
    { label: t.about.factsFounded, value: t.about.factsFoundedValue },
    { label: t.about.factsMarkets, value: t.about.factsMarketsValue },
  ];

  return (
    <section className="bg-white py-10 lg:py-14">
      <Container className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Sol Hissə - Şəkil */}
        <Reveal className="lg:col-span-5 w-full h-full">
          <div className="relative aspect-[4/3] w-full h-full overflow-hidden rounded-2xl shadow-xs lg:min-h-[380px]">
            <Image
              src="/images/aboutImg.jpg"
              alt="Poly Cleaner facility, Balakhani Industrial Park"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </Reveal>

        {/* Sağ Hissə - Şəkildən kənara çıxmayan, tam şəklin hündürlüyündə blok */}
        <Reveal delay={0.1} className="lg:col-span-7 flex flex-col justify-between h-full py-1">
          {/* Yuxarı Mətn Hissəsi */}
          <div>
            {/* Eyebrow */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#258D2A]">
              {t.about.overviewEyebrow}
            </p>

            {/* Əsas Başlıq */}
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-[32px] font-extrabold leading-[1.25] text-[#0F2A4A]">
              {t.about.overviewTitle}
            </h2>

            {/* Paraqraflar */}
            <div className="mt-3.5 space-y-3 text-xs sm:text-sm font-medium leading-relaxed text-slate-600">
              <p>{t.about.overviewParagraph1}</p>
              <p>{t.about.overviewParagraph2}</p>
            </div>
          </div>

          {/* Aşağı Faktlar Bölməsi - İkonlar böyüdüldü və yanındakı mətnlərlə hizalandı */}
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
            {facts.map(({ label, value }, i) => {
              const Icon = ICONS[i];
              return (
                <div key={i} className="flex items-center gap-3">
                  {Icon ? (
                    <Icon className="size-9 sm:size-10 shrink-0 text-[#1B365D] stroke-[1.4]" />
                  ) : (
                    <span className="relative size-9 shrink-0 sm:size-10">
                      <Image
                        src="/images/icons/trimmed/globus-1B365D.png"
                        alt=""
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-[13px] font-bold text-[#1B365D] leading-tight">
                      {label}
                    </p>
                    <p
                      className={`mt-0.5 text-[11px] sm:text-xs leading-tight text-slate-500 ${
                        i === 0 ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
