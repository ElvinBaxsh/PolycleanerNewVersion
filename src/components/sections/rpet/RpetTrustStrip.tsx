"use client";

import { MapPin, ShieldCheck, Recycle, Truck, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: LucideIcon[] = [MapPin, ShieldCheck, Recycle, Truck];

export default function RpetTrustStrip() {
  const { t } = useLanguage();
  return (
    <section className="relative z-10 -mt-8 sm:-mt-10">
      <Container className="max-w-[1400px]">
        {/* Plain divs + CSS card-fade-in, not RevealGroup/RevealItem: this
            strip overlaps the hero and is already visible on first paint, so
            it needs no scroll-triggered reveal — see TrustBar.tsx for why
            framer-motion's whileInView+once:true is unsafe here once the
            text is reactive (language switch). */}
        <div className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-md sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {t.rpet.trustStrip.map(({ label }, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                style={{ animation: `card-fade-in 0.4s ease-out ${i * 0.05}s both` }}
                className="flex items-center gap-3.5 px-5 py-4 sm:px-6 sm:py-5"
              >
                <Icon
                  className="size-10 sm:size-11 shrink-0 text-[#0F2A4A] stroke-[1.4]"
                  aria-hidden
                />
                <p className="whitespace-pre-line text-[11px] sm:text-xs font-extrabold uppercase leading-tight tracking-wide text-[#0F2A4A]">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
