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
        {/* Fixed column counts keep the rows even: 2 on phones, 3 on
            tablets, 6 from xl. Plain CSS fade-in, because the bar is
            visible on first paint. */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-7 rounded-2xl border border-slate-200/80 bg-white px-4 py-7 shadow-2xl shadow-slate-900/15 sm:grid-cols-3 sm:gap-y-8 xl:grid-cols-6 xl:gap-y-0 xl:py-8">
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
