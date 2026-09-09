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
  title: { absolute: "Sustainability | From Waste to Value | Poly Cleaner" },
  description:
    "At Poly Cleaner, sustainability is at the core of everything we do. We transform post-consumer PET waste into high-quality rPET flakes, supporting a circular economy and a cleaner future.",
  alternates: { canonical: "/sustainability" },
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero pageKey="sustainability" image="/images/sustainabilityImg.jpg" imagePosition="right" />
      <SustainabilityTrustStrip />
      <ImpactCards />
      <BottleToFlakeStrip />
      <SustainabilityPillars />
      <PlasticCreditBanner />
      <ImpactStats />
      <FinalCta variant="sustainability" />
    </>
  );
}
