import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import RpetFlakesPage from "@/app/(main)/rpet-flakes/page";

export const metadata: Metadata = pageMetadata({
  path: "/rpet-flakes",
  locale: "az",
  title: "İsti Yuyulmuş rPET Fleks | Poly Cleaner",
  description:
    "PET lövhə, qablaşdırma çəmbəri və polyester lif istehsalı üçün rPET fleks (PET lopa) — rəng və tətbiqə görə növləri ilə tanış olun.",
});

export default function RpetFlakesPageAz() {
  return <RpetFlakesPage locale="az" />;
}
