"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";

const SIZES = {
  default: "h-[60px] w-auto object-contain sm:h-[62px] lg:h-[64px] xl:h-[68px]",
  large: "h-[84px] w-auto object-contain sm:h-[96px] lg:h-[104px] xl:h-[112px]",
};

// The widest each variant is ever drawn: its tallest height (xl) times the
// file's 2149:732 ratio. Without `sizes`, next/image takes the intrinsic
// width/height below as the display size and asks the optimizer for its
// largest variant — w=3840 — for a logo that is ~200px wide on screen.
// That request is pure waste even when it works, and in dev it was also
// the one image the optimizer hung on, leaving every page stuck "loading"
// with no logo in the header or footer.
const DISPLAY_WIDTH = {
  default: "200px",
  large: "330px",
};

export default function Logo({ size = "default" }: { size?: keyof typeof SIZES }) {
  const { locale } = useLanguage();
  return (
    <Link href={localizePath("/", locale)} className="flex shrink-0 items-center">
      <Image
        src="/images/polycleaner-logonew.png"
        alt="Poly Cleaner — From Waste to Value"
        width={2149}
        height={732}
        sizes={DISPLAY_WIDTH[size]}
        priority
        className={SIZES[size]}
      />
    </Link>
  );
}