"use client";

import {
  ClipboardCheck,
  Globe2,
  MapPin,
  ShieldCheck,
  PackageSearch,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import MaskIcon from "@/components/ui/MaskIcon";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [null, ClipboardCheck, Globe2, MapPin, ShieldCheck, PackageSearch];
const IMAGES = ["/images/icons/trimmed/producerTrader.png", null, null, null, null, null];

export default function TrustBar() {
  const { t } = useLanguage();
  const items = t.home.trustBar;
  return (
    <section className="relative z-20 -mt-10 sm:-mt-14">
      <Container>
        {/*
          A CSS grid with a fixed column count per breakpoint always lays
          items out in complete, even rows (2/2/2 on mobile, 3/3 on tablet,
          all 6 in one row on desktop). The previous flex-wrap approach let
          the browser pack as many items as happened to fit per line, which
          produced an uneven 2/3/1 split on narrow phones.

          Plain divs + CSS card-fade-in (not RevealGroup/RevealItem): this
          bar sits right at the fold and is already visible on first paint,
          so it needs no scroll-triggered reveal — and since its text is
          reactive (language switch), framer-motion's whileInView+once:true
          would hit the same "never animates in children that mount after
          the parent's viewport trigger already fired" issue documented on
          DocumentGrid, leaving it stuck at opacity:0 after a language change.
        */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-7 rounded-2xl border border-slate-200/80 bg-white px-4 py-7 shadow-2xl shadow-slate-900/15 sm:grid-cols-3 sm:gap-y-8 lg:grid-cols-6 lg:gap-y-0 lg:py-8">
          {items.map(({ label, sub }, i) => {
            const Icon = ICONS[i];
            const image = IMAGES[i];
            return (
              <div
                key={i}
                style={{ animation: `card-fade-in 0.4s ease-out ${i * 0.05}s both` }}
                className="flex flex-col items-center justify-center gap-3 px-2 text-center"
              >
                {image ? (
                  <MaskIcon src={image} className="size-12 text-[#0f2d4a] sm:size-14" />
                ) : (
                  Icon && <Icon className="size-12 stroke-[1.5] text-[#0f2d4a] sm:size-14" aria-hidden />
                )}
                <p className="text-xs font-black leading-snug tracking-wide text-[#0f2d4a] sm:text-sm">
                  {label}
                  <br />
                  {sub}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
