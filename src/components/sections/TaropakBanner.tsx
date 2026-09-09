"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TAROPAK_EVENT } from "@/lib/constants";

export default function TaropakBanner() {
  const { t } = useLanguage();
  return (
    <section className="bg-soft-gray py-10 lg:py-14">
      <Container>
        {/* Açıq Tonlu Banner Kartı */}
        <Reveal className="relative flex min-h-[140px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F4F7FA] shadow-sm md:flex-row md:items-center">

          {/* Sol Hissə: Loqo və Mətnlər — mobil/tabletdə mərkəzləşib böyük
              görünür, md+ (üfüqi düzülüş) əvvəlki kompakt ölçüyə qayıdır. */}
          <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center sm:gap-3 sm:p-5 md:flex-row md:items-center md:gap-6 md:text-left lg:p-8">

            {/* Taropak Loqo Bloku - logonun öz nisbəti (1774x887) dəqiq 2:1-dir,
                ona görə qutu da eyni nisbətdə saxlanılır ki, object-contain
                heç bir boş kənar buraxmadan tam doldursun. */}
            <div className="relative h-32 w-64 shrink-0 sm:h-40 sm:w-80 md:h-20 md:w-40">
              <Image
                src="/images/taropak-logo.png"
                alt="TAROPAK 2026"
                fill
                className="object-contain md:object-left"
                priority
              />
            </div>

            {/* Mətn İnformasiyaları */}
            <div className="space-y-1 text-slate-800">
              <h3 className="text-base font-extrabold tracking-tight text-navy sm:text-lg md:text-xl">
                {t.documents.taropakMeet(TAROPAK_EVENT.name)}
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-semibold text-slate-600 sm:text-sm md:justify-start">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-brand-blue" />
                  {TAROPAK_EVENT.dates}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-brand-blue" />
                  {TAROPAK_EVENT.location}
                </span>
              </div>

              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                {t.home.taropakBannerTagline}
              </p>
            </div>
          </div>

          {/* Sağ Hissə: Bütün Konteynerə Yayılan Şəhər Şəkli (Xətsiz Səlis Smooth Gradient Fade) */}
          <div className="pointer-events-none relative h-32 w-full shrink-0 sm:h-36 md:absolute md:inset-0 md:h-full md:w-full">
            <Image
              src="/images/destination-warsaw-hero-banner-taropak.jpg"
              alt="Poznań, Poland — TAROPAK venue"
              fill
              className="object-cover object-right"
            />
            {/* Mobil/tabletdə mətn şəklin üzərinə düşmür (ayrıca blokdadır),
                ona görə burada yalnız yüngül tündləşdirmə kifayətdir — şəkil
                əvvəlki solğun ağ-örtük əvəzinə tam görünür. md+ da mətn
                şəklin üzərinə düşdüyü üçün oxunaqlılıq üçün geniş fade qalır. */}
            <div className="absolute inset-0 bg-navy/25 md:bg-gradient-to-r md:from-[#F4F7FA] md:via-[#F4F7FA]/90 md:to-transparent md:from-35% md:via-60%" />
          </div>

        </Reveal>
      </Container>
    </section>
  );
}