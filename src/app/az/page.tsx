import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePage from "@/app/(main)/page";

export const metadata: Metadata = pageMetadata({
  path: "/",
  locale: "az",
  title: "Poly Cleaner MMC | Azərbaycandan İsti Yuyulmuş rPET Fleks Təchizatçısı",
  description:
    "Poly Cleaner MMC PET lövhə, qablaşdırma çəmbəri, polyester lif və qeyri-qida qablaşdırması üçün sənədləşdirilmiş isti yuyulmuş rPET fleks təchiz edir. Azərbaycandan ixraca hazır təkrar emal edilmiş PET təchizatçısı.",
});

export default HomePage;
