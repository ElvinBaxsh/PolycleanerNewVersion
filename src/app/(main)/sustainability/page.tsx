import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";
import PageHero from "@/components/sections/PageHero";
import SustainabilityTrustStrip from "@/components/sections/sustainability/SustainabilityTrustStrip";
import ImpactCards from "@/components/sections/sustainability/ImpactCards";
import BottleToFlakeStrip from "@/components/sections/sustainability/BottleToFlakeStrip";
import SustainabilityPillars from "@/components/sections/sustainability/SustainabilityPillars";
import PlasticCreditBanner from "@/components/sections/sustainability/PlasticCreditBanner";
import ImpactStats from "@/components/sections/sustainability/ImpactStats";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/sustainability",
  locale: "en",
  title: "Sustainability | From Waste to Value | Poly Cleaner",
  description:
    "At Poly Cleaner, sustainability is at the core of everything we do. We transform post-consumer PET waste into high-quality rPET flakes, supporting a circular economy and a cleaner future.",
});

export default function SustainabilityPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <JsonLd
        data={pageBreadcrumbJsonLd("/sustainability", "sustainability", locale)}
      />
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
