import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FullProcessFlow from "@/components/sections/process/FullProcessFlow";
import CapabilitiesAndQuality from "@/components/sections/process/CapabilitiesAndQuality";
import QAPillars from "@/components/sections/process/QAPillars";
import KeySpecsStrip from "@/components/sections/process/KeySpecsStrip";
import HowWeWork from "@/components/sections/process/HowWeWork";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Process & Quality",
  description:
    "Poly Cleaner MMC's integrated process and quality systems ensure high quality rPET flakes with consistent specifications, full traceability and reliable export documentation.",
  alternates: { canonical: "/process-quality" },
};

export default function ProcessQualityPage() {
  return (
    <>
      <PageHero
        crumb="Process & Quality"
        title="Process &"
        titleAccent="Quality"
        description="At Poly Cleaner MMC, our integrated process and quality systems ensure high quality rPET flakes with consistent specifications, full traceability and reliable export documentation."
        photoLabel="rPET flakes production line, conveyor"
        cta={[
          { label: "Request Product Information", href: "/documents" },
          { label: "Speak with Sales", inquiryType: "general" },
        ]}
      />
      <FullProcessFlow />
      <CapabilitiesAndQuality />
      <QAPillars />
      <KeySpecsStrip />
      <HowWeWork />
      <FinalCta
        title="Let's build a cleaner future together."
        description="Contact our team for product information or a customized solution."
      />
    </>
  );
}
