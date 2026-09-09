import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CompanyOverview from "@/components/sections/about/CompanyOverview";
import OurValues from "@/components/sections/about/OurValues";
import NumbersStrip from "@/components/sections/about/NumbersStrip";
import WhyPartner from "@/components/sections/about/WhyPartner";
import ProcessStrip from "@/components/sections/ProcessStrip";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "About Poly Cleaner | rPET Flakes Producer in Azerbaijan" },
  description:
    "Poly Cleaner MMC is an Azerbaijan-based producer of high quality hot washed rPET flakes, transforming post-consumer PET waste into consistent, clean and traceable raw material.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero pageKey="about" />
      <CompanyOverview />
      <OurValues />
      <NumbersStrip />
      <WhyPartner />
      <ProcessStrip variant="about" />
      <FinalCta />
    </>
  );
}
