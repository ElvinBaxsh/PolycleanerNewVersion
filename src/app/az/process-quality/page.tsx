import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import ProcessQualityPage from "@/app/(main)/process-quality/page";

export const metadata: Metadata = {
  title: { absolute: "Proses və Keyfiyyət | Poly Cleaner Azərbaycan" },
  description:
    "İstifadə olunmuş PET butulkalardan alınan lopaların necə yığıldığını, isti yuyulduğunu və keyfiyyətə görə yoxlanıldığını addım-addım kəşf edin.",
  alternates: {
    canonical: "/az/process-quality",
    languages: {
      en: `${SITE_URL}/process-quality`,
      az: `${SITE_URL}/az/process-quality`,
      "x-default": `${SITE_URL}/process-quality`,
    },
  },
};

export default function ProcessQualityPageAz() {
  return <ProcessQualityPage basePath="/az" />;
}
