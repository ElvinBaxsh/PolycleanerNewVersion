import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePage from "@/app/(main)/page";

export const metadata: Metadata = pageMetadata({
  path: "/",
  locale: "az",
  title: "Poly Cleaner | Azərbaycandan İsti Yuyulmuş rPET Fleks Təchizatçısı",
  description:
    "Poly Cleaner PET lövhə, qablaşdırma çəmbəri, polyester lif və qeyri-qida qablaşdırması üçün sənədləşdirilmiş, isti yuyulmuş rPET fleks təchiz edir — Azərbaycandan dünyaya ixrac.",
});

export default HomePage;
