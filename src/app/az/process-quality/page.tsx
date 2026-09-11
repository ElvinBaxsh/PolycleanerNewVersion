import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProcessQualityPage from "@/app/(main)/process-quality/page";

export const metadata: Metadata = pageMetadata({
  path: "/process-quality",
  locale: "az",
  title: "Proses və Keyfiyyət | Poly Cleaner Azərbaycan",
  description:
    "İstifadə olunmuş PET butulkalardan alınan lopaların necə yığıldığını, isti yuyulduğunu və keyfiyyətə görə yoxlanıldığını addım-addım kəşf edin.",
});

export default function ProcessQualityPageAz() {
  return <ProcessQualityPage basePath="/az" />;
}
