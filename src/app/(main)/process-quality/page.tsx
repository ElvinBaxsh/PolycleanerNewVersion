import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";
import PageHero from "@/components/sections/PageHero";
import FullProcessFlow from "@/components/sections/process/FullProcessFlow";
import CapabilitiesAndQuality from "@/components/sections/process/CapabilitiesAndQuality";
import QAPillars from "@/components/sections/process/QAPillars";
import KeySpecsStrip from "@/components/sections/process/KeySpecsStrip";
import HowWeWork from "@/components/sections/process/HowWeWork";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/process-quality",
  locale: "en",
  title: "Process & Quality | Documented rPET Flakes Production",
  description:
    "Poly Cleaner's integrated process and quality systems ensure high quality rPET flakes with consistent specifications, full traceability and reliable export documentation.",
});

export default function ProcessQualityPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <JsonLd
        data={pageBreadcrumbJsonLd("/process-quality", "process", locale)}
      />
      <PageHero pageKey="process" image="/images/ProcessQuality.jpg" />
      <FullProcessFlow />
      <CapabilitiesAndQuality />
      <QAPillars />
      <KeySpecsStrip />
      <HowWeWork />
      <FinalCta variant="process" />
    </>
  );
}
