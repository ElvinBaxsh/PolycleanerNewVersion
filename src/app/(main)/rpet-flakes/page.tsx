import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageHero from "@/components/sections/PageHero";
import RpetTrustStrip from "@/components/sections/rpet/RpetTrustStrip";
import ProductGrades from "@/components/sections/rpet/ProductGrades";
import Applications from "@/components/sections/rpet/Applications";
import SpecsAndInfo from "@/components/sections/rpet/SpecsAndInfo";
import CloseupGallery from "@/components/sections/rpet/CloseupGallery";
import BuyerDocuments from "@/components/sections/BuyerDocuments";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hot Washed rPET Flakes",
  description:
    "High-quality rPET flakes produced in Azerbaijan from post-consumer PET bottles. Hot washed, dry, and sorted to deliver consistent purity for sheet, strap, fiber and non-food packaging.",
  alternates: {
    canonical: "/rpet-flakes",
    languages: {
      en: `${SITE_URL}/rpet-flakes`,
      az: `${SITE_URL}/az/rpet-flakes`,
      "x-default": `${SITE_URL}/rpet-flakes`,
    },
  },
};

export default function RpetFlakesPage({ basePath = "" }: { basePath?: string }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: basePath || "/" },
          { name: "rPET Flakes", path: `${basePath}/rpet-flakes` },
        ])}
      />
      <PageHero pageKey="rpet" />
      <RpetTrustStrip />
      <ProductGrades />
      <Applications />
      <SpecsAndInfo />
      <CloseupGallery />
      <BuyerDocuments bg="white" />
      <FinalCta />
    </>
  );
}
