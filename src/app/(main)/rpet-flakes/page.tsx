import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";
import PageHero from "@/components/sections/PageHero";
import RpetTrustStrip from "@/components/sections/rpet/RpetTrustStrip";
import ProductGrades from "@/components/sections/rpet/ProductGrades";
import Applications from "@/components/sections/rpet/Applications";
import SpecsAndInfo from "@/components/sections/rpet/SpecsAndInfo";
import CloseupGallery from "@/components/sections/rpet/CloseupGallery";
import BuyerDocuments from "@/components/sections/BuyerDocuments";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/rpet-flakes",
  locale: "en",
  title: "Hot Washed rPET Flakes | Poly Cleaner",
  description:
    "High-quality rPET flakes produced in Azerbaijan from post-consumer PET bottles. Hot washed, dry, and sorted to deliver consistent purity for sheet, strap, fiber and non-food packaging.",
});

export default function RpetFlakesPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <JsonLd
        data={pageBreadcrumbJsonLd("/rpet-flakes", "rpet", locale)}
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
