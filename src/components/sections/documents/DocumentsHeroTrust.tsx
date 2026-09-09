"use client";

import { Clock, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: (LucideIcon | null)[] = [null, Clock, null, null];
const ICON_IMAGES = [
  "/images/icons/trimmed/reliability-white.png",
  null,
  "/images/icons/trimmed/consistentQuality-white.png",
  "/images/icons/trimmed/globus-white.png",
];

export default function DocumentsHeroTrust() {
  const { t } = useLanguage();

  return (
    <div className="mt-14 sm:mt-16 grid grid-cols-4 gap-5 sm:gap-9 max-w-lg">
      {t.documents.heroTrustItems.map(({ label }, i) => {
        const Icon = ICONS[i];
        const iconSrc = ICON_IMAGES[i];
        return (
          <div key={i} className="flex flex-col items-center gap-3 text-center">
            {Icon ? (
              <Icon className="size-12 sm:size-14 text-white/95 stroke-[1.2]" aria-hidden />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={iconSrc!} alt="" className="size-12 sm:size-14 object-contain opacity-95" />
            )}
            <p className="whitespace-pre-line text-xs sm:text-sm font-medium leading-snug text-white/90 max-w-[95px]">
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
