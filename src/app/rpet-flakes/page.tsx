import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import RpetTrustStrip from "@/components/sections/rpet/RpetTrustStrip";
import ProductGrades from "@/components/sections/rpet/ProductGrades";
import Applications from "@/components/sections/rpet/Applications";
import SpecsAndInfo from "@/components/sections/rpet/SpecsAndInfo";
import CloseupGallery from "@/components/sections/rpet/CloseupGallery";
import BuyerDocuments from "@/components/sections/BuyerDocuments";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Hot Washed rPET Flakes",
  description:
    "High-quality rPET flakes produced in Azerbaijan from post-consumer PET bottles. Hot washed, dry, and sorted to deliver consistent purity for sheet, strap, fiber and non-food packaging.",
  alternates: { canonical: "/rpet-flakes" },
};

export default function RpetFlakesPage() {
  return (
    <>
      <PageHero
        crumb="rPET Flakes"
        title="Hot Washed"
        titleAccent="rPET Flakes"
        description="High-quality rPET flakes produced in Azerbaijan from post-consumer PET bottles. Hot washed, dry, and sorted to deliver consistent purity and excellent performance for your production."
        photoLabel="rPET flakes big bags, transparent & light blue"
        cta={[
          { label: "Request Offer", inquiryType: "offer" },
          { label: "Request Sample", inquiryType: "sample" },
        ]}
      />
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
