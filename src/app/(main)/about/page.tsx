import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageHero from "@/components/sections/PageHero";
import CompanyOverview from "@/components/sections/about/CompanyOverview";
import OurValues from "@/components/sections/about/OurValues";
import NumbersStrip from "@/components/sections/about/NumbersStrip";
import WhyPartner from "@/components/sections/about/WhyPartner";
import ProcessStrip from "@/components/sections/ProcessStrip";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "About Poly Cleaner | rPET Flakes Producer in Azerbaijan" },
  description:
    "Poly Cleaner is an Azerbaijan-based producer of high quality hot washed rPET flakes, transforming post-consumer PET waste into consistent, clean and traceable raw material.",
  alternates: {
    canonical: "/about",
    languages: { en: `${SITE_URL}/about`, az: `${SITE_URL}/az/about`, "x-default": `${SITE_URL}/about` },
  },
};

export default function AboutPage({ basePath = "" }: { basePath?: string }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: basePath || "/" },
          { name: "About Us", path: `${basePath}/about` },
        ])}
      />
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
