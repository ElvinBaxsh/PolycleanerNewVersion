import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import HomePage from "@/app/(main)/page";

export const metadata: Metadata = {
  title: { absolute: "Poly Cleaner | Azərbaycandan İsti Yuyulmuş rPET Lopa Təchizatçısı" },
  description:
    "Poly Cleaner səhifə, çəmbər, əlyaf və qeyri-qida qablaşdırma tətbiqləri üçün sənədləşdirilmiş, isti yuyulmuş rPET lopaları təchizat edir — Azərbaycandan dünyaya ixracat.",
  alternates: {
    canonical: "/az",
    languages: { en: `${SITE_URL}/`, az: `${SITE_URL}/az`, "x-default": `${SITE_URL}/` },
  },
};

export default HomePage;
