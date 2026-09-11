import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProcessQualityPage from "@/app/(main)/process-quality/page";

export const metadata: Metadata = pageMetadata({
  path: "/process-quality",
  locale: "az",
  title: "Proses və Keyfiyyət | Poly Cleaner Azərbaycan",
  description:
    "İstifadə olunmuş PET butulkaların necə toplandığını, isti yuyulub fleksə çevrildiyini və keyfiyyət yoxlamasından keçdiyini addım-addım kəşf edin.",
});

export default function ProcessQualityPageAz() {
  return <ProcessQualityPage locale="az" />;
}
