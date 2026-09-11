import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePage from "@/app/(main)/page";

export const metadata: Metadata = pageMetadata({
  path: "/",
  locale: "az",
  title: "Poly Cleaner | Azərbaycandan İsti Yuyulmuş rPET Lopa Təchizatçısı",
  description:
    "Poly Cleaner lövhə, çəmbər, əlyaf və qeyri-qida qablaşdırma tətbiqləri üçün sənədləşdirilmiş, isti yuyulmuş rPET lopaları təchizat edir — Azərbaycandan dünyaya ixracat.",
});

export default HomePage;
