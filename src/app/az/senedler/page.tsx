import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DocumentsPage from "@/app/(main)/documents/page";

export const metadata: Metadata = pageMetadata({
  path: "/documents",
  locale: "az",
  title: "Alıcı Sənədləri | Poly Cleaner Azərbaycan",
  description:
    "Sənədləşdirilib təkrar emal edilmiş PET təchizatçısı olaraq şirkət profili, məhsul təklif vərəqəsi, texniki sənədlər və izlənilə bilənlik qeydlərini buradan yükləyin.",
});

export default function DocumentsPageAz() {
  return <DocumentsPage locale="az" />;
}
