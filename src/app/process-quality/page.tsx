import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FullProcessFlow from "@/components/sections/process/FullProcessFlow";
import CapabilitiesAndQuality from "@/components/sections/process/CapabilitiesAndQuality";
import QAPillars from "@/components/sections/process/QAPillars";
import KeySpecsStrip from "@/components/sections/process/KeySpecsStrip";
import HowWeWork from "@/components/sections/process/HowWeWork";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "Process & Quality | Documented rPET Flakes Production" },
  description:
    "Poly Cleaner MMC's integrated process and quality systems ensure high quality rPET flakes with consistent specifications, full traceability and reliable export documentation.",
  alternates: { canonical: "/process-quality" },
};

export default function ProcessQualityPage() {
  return (
    <>
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
