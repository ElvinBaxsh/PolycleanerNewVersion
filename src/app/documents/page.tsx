import type { Metadata } from "next";
import { ShieldCheck, Clock, BadgeCheck, Globe2 } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import DocumentGrid from "@/components/sections/documents/DocumentGrid";
import TaropakBanner from "@/components/sections/TaropakBanner";
import FaqSection from "@/components/sections/documents/FaqSection";
import BuyerPackCta from "@/components/sections/documents/BuyerPackCta";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "Access Poly Cleaner MMC's buyer documents — company profile, product offer sheet, technical data sheet, sample COA and traceability note — for your due diligence.",
  alternates: { canonical: "/documents" },
};

const HERO_TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Verified & Up to Date" },
  { icon: Clock, label: "Fast & Easy Access" },
  { icon: BadgeCheck, label: "Trusted Information" },
  { icon: Globe2, label: "Built for Global Trade" },
];

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        crumb="Documents"
        title="Buyer"
        titleAccent="Documents"
        description="All the documents you need to evaluate, approve and collaborate with Poly Cleaner. Verified, up to date and prepared for global trade."
        cta={[{ label: "Request Document Pack", inquiryType: "documents" }]}
        extra={
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {HERO_TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="size-6 text-white/80 stroke-[1.5]" aria-hidden />
                <p className="text-xs font-medium text-white/80">{label}</p>
              </div>
            ))}
          </div>
        }
      />
      <DocumentGrid />
      <TaropakBanner />
      <FaqSection />
      <BuyerPackCta />
      <FinalCta />
    </>
  );
}
