import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import DocumentsPage from "@/app/(main)/documents/page";

export const metadata: Metadata = {
  title: { absolute: "Alıcı Sənədləri | Poly Cleaner Azərbaycan" },
  description:
    "Sənədləşdirilib təkrar emal edilmiş PET təchizatçısı olaraq şirkət profili, məhsul təklif vərəqəsi, texniki sənədlər və izlənilə bilənlik qeydlərini buradan yükləyin.",
  alternates: {
    canonical: "/az/documents",
    languages: {
      en: `${SITE_URL}/documents`,
      az: `${SITE_URL}/az/documents`,
      "x-default": `${SITE_URL}/documents`,
    },
  },
};

export default function DocumentsPageAz() {
  return <DocumentsPage basePath="/az" />;
}
