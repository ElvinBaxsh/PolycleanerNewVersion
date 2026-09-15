import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutPage from "@/app/(main)/about/page";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  locale: "az",
  title: "Poly Cleaner haqqında | Azərbaycanda rPET Fleks İstehsalçısı",
  description:
    "Poly Cleaner — Bakı, Balaxanı Sənaye Parkında PET butulkaların təkrar emalı üzrə istehsalçı, vasitəçi deyil. Komandamız və istehsal gücümüzlə tanış olun.",
});

export default function AboutPageAz() {
  return <AboutPage locale="az" />;
}
