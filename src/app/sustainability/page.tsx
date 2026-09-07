import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import SustainabilityTrustStrip from "@/components/sections/sustainability/SustainabilityTrustStrip";
import ImpactCards from "@/components/sections/sustainability/ImpactCards";
import BottleToFlakeStrip from "@/components/sections/sustainability/BottleToFlakeStrip";
import SustainabilityPillars from "@/components/sections/sustainability/SustainabilityPillars";
import PlasticCreditBanner from "@/components/sections/sustainability/PlasticCreditBanner";
import ImpactStats from "@/components/sections/sustainability/ImpactStats";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "At Poly Cleaner, sustainability is at the core of everything we do. We transform post-consumer PET waste into high-quality rPET flakes, supporting a circular economy and a cleaner future.",
  alternates: { canonical: "/sustainability" },
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        crumb="Sustainability"
        title="Turning Waste"
        titleAccent="into Value"
        description="At Poly Cleaner, sustainability is at the core of everything we do. We transform post-consumer PET waste into high-quality rPET flakes, supporting a circular economy and a cleaner future."
        photoLabel="rPET flakes bag with recycled bottles"
        cta={[
          { label: "Request rPET Flakes Offer", inquiryType: "offer" },
          { label: "Request Sample", inquiryType: "sample" },
        ]}
      />
      <SustainabilityTrustStrip />
      <ImpactCards />
      <BottleToFlakeStrip />
      <SustainabilityPillars />
      <PlasticCreditBanner />
      <ImpactStats />
      <FinalCta
        description="Partner with Poly Cleaner for reliable, high-quality rPET flakes and measurable sustainability."
      />
    </>
  );
}
