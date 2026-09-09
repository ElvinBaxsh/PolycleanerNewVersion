import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import RpetFlakesPage from "@/app/(main)/rpet-flakes/page";

export const metadata: Metadata = {
  title: "İsti Yuyulmuş rPET Lopaları",
  description:
    "PET lövhə istehsalı, qablaşdırma çəmbəri və polyester lif istehsalı üçün rPET qırıntıları — rəng və tətbiqə görə növləri ilə tanış olun.",
  alternates: {
    canonical: "/az/rpet-flakes",
    languages: {
      en: `${SITE_URL}/rpet-flakes`,
      az: `${SITE_URL}/az/rpet-flakes`,
      "x-default": `${SITE_URL}/rpet-flakes`,
    },
  },
};

export default function RpetFlakesPageAz() {
  return <RpetFlakesPage basePath="/az" />;
}
