import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { TAROPAK_EVENT } from "@/lib/constants";

export default function TaropakBanner() {
  return (
    <section className="bg-soft-gray pb-10 pt-2 lg:pb-14">
      <Container>
        {/* Açıq Tonlu Banner Kartı */}
        <Reveal className="relative flex min-h-[140px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F4F7FA] shadow-sm md:flex-row md:items-center">

          {/* Sol Hissə: Loqo və Mətnlər */}
          <div className="relative z-10 flex flex-col items-start gap-4 p-5 sm:p-6 md:flex-row md:items-center md:gap-6 lg:p-8">
            
            {/* Taropak Loqo Bloku - Çərçivəsiz, Tam Tutacaq Şəkildə */}
            <div className="relative h-16 w-36 shrink-0 sm:h-20 sm:w-44">
              <Image
                src="/images/taropak-logo.png"
                alt="TAROPAK 2026"
                fill
                className="scale-125 object-contain object-left"
                priority
              />
            </div>

            {/* Mətn İnformasiyaları */}
            <div className="space-y-1.5 text-slate-800">
              <h3 className="text-base font-extrabold tracking-tight text-navy sm:text-lg md:text-xl">
                Let&rsquo;s meet at {TAROPAK_EVENT.name}
              </h3>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold text-slate-600 sm:text-sm">
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
                Discover our rPET flakes and build your next sustainable solution with us.
              </p>
            </div>
          </div>

          {/* Sağ Hissə: Bütün Konteynerə Yayılan Şəhər Şəkli (Xətsiz Səlis Smooth Gradient Fade) */}
          <div className="pointer-events-none relative h-48 w-full shrink-0 md:absolute md:inset-0 md:h-full md:w-full">
            <Image
              src="/images/destination-warsaw-hero-banner-taropak.jpg"
              alt="Poznań, Poland — TAROPAK venue"
              fill
              className="object-cover object-right"
            />
            {/* Soldan sağa doğru sərt xətti tamamilə itirən geniş yumşaq fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F4F7FA] via-[#F4F7FA]/80 to-transparent md:bg-gradient-to-r md:from-[#F4F7FA] md:via-[#F4F7FA]/90 md:to-transparent md:from-35% md:via-60%" />
          </div>

        </Reveal>
      </Container>
    </section>
  );
}