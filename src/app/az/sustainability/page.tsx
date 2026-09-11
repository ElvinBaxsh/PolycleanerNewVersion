import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SustainabilityPage from "@/app/(main)/sustainability/page";

export const metadata: Metadata = pageMetadata({
  path: "/sustainability",
  locale: "az",
  title: "Davamlılıq | Poly Cleaner Azərbaycan",
  description:
    "Azərbaycanda PET butulkaların təkrar emalı ilə plastik tullantıların azaldılmasına necə töhfə verdiyimizi öyrənin.",
});

export default function SustainabilityPageAz() {
  return <SustainabilityPage basePath="/az" />;
}
