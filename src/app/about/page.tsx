import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CompanyOverview from "@/components/sections/about/CompanyOverview";
import OurValues from "@/components/sections/about/OurValues";
import NumbersStrip from "@/components/sections/about/NumbersStrip";
import WhyPartner from "@/components/sections/about/WhyPartner";
import ProcessStrip from "@/components/sections/ProcessStrip";
import FinalCta from "@/components/sections/FinalCta";
import { ABOUT_PROCESS_STEPS } from "@/lib/constants";

// Passed as string keys, not component references — ProcessStrip is a
// Client Component and a Server Component can't hand it icon
// components/functions as props, only serializable data like these keys.
const ABOUT_PROCESS_ICONS = [
  "truck",
  "layers",
  "settings",
  "droplet",
  "wind",
  "clipboardCheck",
  "packageCheck",
];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Poly Cleaner MMC is an Azerbaijan-based producer of high quality hot washed rPET flakes, transforming post-consumer PET waste into consistent, clean and traceable raw material.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        title="About"
        titleAccent="Poly Cleaner"
        description="Poly Cleaner MMC is an Azerbaijan-based producer of high quality hot washed rPET flakes. We transform post-consumer PET waste into consistent, clean and traceable raw material for global recyclers and manufacturers."
        photoLabel="Poly Cleaner production line"
        cta={[
          { label: "Request Offer", inquiryType: "offer" },
          { label: "Request Sample", inquiryType: "sample" },
        ]}
      />
      <CompanyOverview />
      <OurValues />
      <NumbersStrip />
      <WhyPartner />
      <ProcessStrip
        eyebrow="Our Process"
        title="Process Snapshot"
        steps={ABOUT_PROCESS_STEPS}
        icons={ABOUT_PROCESS_ICONS}
      />
      <FinalCta />
    </>
  );
}
