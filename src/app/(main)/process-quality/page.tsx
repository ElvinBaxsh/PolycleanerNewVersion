import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageHero from "@/components/sections/PageHero";
import FullProcessFlow from "@/components/sections/process/FullProcessFlow";
import CapabilitiesAndQuality from "@/components/sections/process/CapabilitiesAndQuality";
import QAPillars from "@/components/sections/process/QAPillars";
import KeySpecsStrip from "@/components/sections/process/KeySpecsStrip";
import HowWeWork from "@/components/sections/process/HowWeWork";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Process & Quality | Documented rPET Flakes Production" },
  description:
    "Poly Cleaner's integrated process and quality systems ensure high quality rPET flakes with consistent specifications, full traceability and reliable export documentation.",
  alternates: {
    canonical: "/process-quality",
    languages: {
      en: `${SITE_URL}/process-quality`,
      az: `${SITE_URL}/az/process-quality`,
      "x-default": `${SITE_URL}/process-quality`,
    },
  },
};

export default function ProcessQualityPage({ basePath = "" }: { basePath?: string }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: basePath || "/" },
          { name: "Process & Quality", path: `${basePath}/process-quality` },
        ])}
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
