import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import SustainabilityPage from "@/app/(main)/sustainability/page";

export const metadata: Metadata = {
  title: { absolute: "Davamlılıq | Poly Cleaner Azərbaycan" },
  description:
    "Azərbaycanda PET butulkaların təkrar emalı ilə plastik tullantıların azaldılmasına necə töhfə verdiyimizi öyrənin.",
  alternates: {
    canonical: "/az/sustainability",
    languages: {
      en: `${SITE_URL}/sustainability`,
      az: `${SITE_URL}/az/sustainability`,
      "x-default": `${SITE_URL}/sustainability`,
    },
  },
};

export default function SustainabilityPageAz() {
  return <SustainabilityPage basePath="/az" />;
}
