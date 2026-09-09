import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import AboutPage from "@/app/(main)/about/page";

export const metadata: Metadata = {
  title: { absolute: "Haqqımızda | Poly Cleaner Azərbaycan" },
  description:
    "Poly Cleaner — Bakı, Balaxanı Sənaye Parkında PET butulkaların təkrar emalı üzrə istehsalçı, vasitəçi deyil. Komandamız və istehsal gücümüzlə tanış olun.",
  alternates: {
    canonical: "/az/about",
    languages: { en: `${SITE_URL}/about`, az: `${SITE_URL}/az/about`, "x-default": `${SITE_URL}/about` },
  },
};

export default function AboutPageAz() {
  return <AboutPage basePath="/az" />;
}
