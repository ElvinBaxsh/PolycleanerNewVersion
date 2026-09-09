"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TAROPAK_EVENT } from "@/lib/constants";

export default function TaropakBanner() {
  const { t } = useLanguage();
  return (
    <Reveal className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F4F7FA] shadow-sm lg:min-h-[320px] lg:flex-row">
      {/* Sol Hissə */}
      <div className="flex flex-1 flex-col items-center justify-between gap-6 p-6 text-center sm:p-8 lg:items-start lg:p-8 lg:text-left">
        
        {/* TAROPAK Loqo Bloku - hündürlük AMI ikonu ilə eyni (size-12/14/16),
            en isə loqonun öz nisbətinə (~3.5:1) uyğun hesablanıb. */}
        <div className="relative h-12 w-[168px] shrink-0 sm:h-14 sm:w-[196px] lg:h-16 lg:w-[224px]">
          <Image
            src="/images/taropak-logo.webp"
            alt="TAROPAK 2026"
            fill
            sizes="224px"
            className="object-contain lg:object-left"
          />
        </div>

        {/* Mətn Qrupu */}
        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
              {t.documents.taropakMeet(TAROPAK_EVENT.name)}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-semibold text-slate-600 sm:text-sm lg:justify-start">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-brand-blue shrink-0" />
                {TAROPAK_EVENT.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-brand-blue shrink-0" />
                {TAROPAK_EVENT.location}
              </span>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            {t.home.taropakBannerTagline}
          </p>
        </div>
      </div>

      {/* Sağ Hissə: Şəkil Sütunu */}
      <div className="relative h-48 w-full shrink-0 sm:h-56 lg:h-auto lg:w-[40%]">
        <Image
          src="/images/destination-warsaw-hero-banner-taropak.jpg"
          alt="Poznań, Poland — TAROPAK venue"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-navy/10" />
      </div>
    </Reveal>
  );
}