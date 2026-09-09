"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AMI_EXPO_EVENT } from "@/lib/constants";

export default function AmiExpoBanner() {
  const { t } = useLanguage();
  return (
    <Reveal className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F4F7FA] shadow-sm lg:min-h-[320px] lg:flex-row">
      {/* Sol Hissə: İkon və Mətnlər */}
      <div className="flex flex-1 flex-col items-center justify-between gap-6 p-6 text-center sm:p-8 lg:items-start lg:p-8 lg:text-left">
        
        {/* İkon Konteyneri - Taropak loqosu ilə eyni hündürlükdədir */}
        <div className="relative size-12 shrink-0 sm:size-14 lg:size-16">
          <Image
            src="/images/cre-expo-icon.png"
            alt="AMI Compounding & Recycling Expo"
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>

        {/* Mətn Qrupu */}
        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
              {t.documents.taropakMeet(AMI_EXPO_EVENT.name)}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-semibold text-slate-600 sm:text-sm lg:justify-start">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-brand-blue shrink-0" />
                {AMI_EXPO_EVENT.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-brand-blue shrink-0" />
                {AMI_EXPO_EVENT.location}
              </span>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            {t.home.taropakBannerTagline}
          </p>
        </div>
      </div>

      {/* Sağ Hissə: Şəkil Sütunu (Dəqiq 40% genişlik) */}
      <div className="relative h-48 w-full shrink-0 sm:h-56 lg:h-auto lg:w-[40%]">
        <Image
          src="/images/destination-frankfurt-hero-banner-ami.jpg"
          alt="Frankfurt, Germany — Compounding & Recycling Expo EU venue"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-navy/10" />
      </div>
    </Reveal>
  );
}