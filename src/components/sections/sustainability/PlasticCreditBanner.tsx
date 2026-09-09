"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PlasticCreditBanner() {
  const { t } = useLanguage();
  return (
    <section className="bg-slate-50/50 py-8 lg:py-10">
      <Container className="max-w-[1140px]">
        <Reveal className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          {/* Mobil/tabletdə (lg-dən aşağı) sağdakı ayrıca şəkil paneli
              gizlənir (aşağıda), ona görə şəkil tamam yox olurdu — burada
              bütün kartın arxasına solğun fon kimi əlavə edildi. lg+ da
              gizlənir, çünki orda öz xüsusi paneli var. */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/images/destination-warsaw-hero-banner-taropak.jpg"
              alt=""
              fill
              className="object-cover opacity-35"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-white/45" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-stretch">
            {/* Sol Tərəf: Mətn Hissəsi (ağ fon) */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:w-[44%] lg:shrink-0 lg:px-12 lg:py-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2A4A] tracking-tight leading-tight">
                {t.sustainability.plasticCreditHeading}
              </h2>
              <p className="mt-3 text-xs sm:text-sm leading-snug text-slate-500 font-normal">
                {t.sustainability.plasticCreditDescription}
              </p>
              <Link
                href="/sustainability"
                className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {t.sustainability.plasticCreditLink}
                <ArrowRight className="size-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Sağ Tərəf: Şəkil paneli — yalnız masaüstündə. Şəklin sol
                kənarı ağ panelə enliyi geniş, tədricən itən (heç bir sərt
                xətt olmadan) qradientlə həll olunur. */}
            <div className="relative hidden min-h-[270px] flex-1 lg:block">
              <Image
                src="/images/destination-warsaw-hero-banner-taropak.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56vw, 0px"
              />
              <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-white via-white/40 to-transparent xl:w-72" />
            </div>
          </div>

          {/* Tünd Mavi Kart — masaüstündə şəklin sağ tərəfində şaquli
              mərkəzləşir, mobil/tabletdə mətndən sonra normal axında gəlir. */}
          <div className="relative px-8 pb-8 sm:px-10 sm:pb-10 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:px-0 lg:pb-0 xl:right-8">
            <div className="w-full rounded-2xl bg-[#091E36] p-6 sm:w-[330px] text-white shadow-xl shadow-slate-900/20">
              {/* İkon və Başlıq */}
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/icons/trimmed/recycle.png" alt="" className="size-10 object-contain" />
                </div>
                <p className="whitespace-pre-line text-lg sm:text-xl font-extrabold uppercase tracking-wider leading-snug text-white">
                  {t.sustainability.plasticCreditBadgeTitle}
                </p>
              </div>

              {/* İncə Bölücü Xətt */}
              <div className="my-4 border-t border-white/10" />

              {/* Açıqlama Mətni */}
              <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
                {t.sustainability.plasticCreditBadgeDescription}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}