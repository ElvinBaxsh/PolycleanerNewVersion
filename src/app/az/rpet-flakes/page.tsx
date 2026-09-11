import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import RpetFlakesPage from "@/app/(main)/rpet-flakes/page";

export const metadata: Metadata = pageMetadata({
  path: "/rpet-flakes",
  locale: "az",
  title: "İsti Yuyulmuş rPET Lopaları | Poly Cleaner",
  description:
    "PET lövhə istehsalı, qablaşdırma çəmbəri və polyester lif istehsalı üçün rPET qırıntıları — rəng və tətbiqə görə növləri ilə tanış olun.",
});

export default function RpetFlakesPageAz() {
  return <RpetFlakesPage basePath="/az" />;
}
