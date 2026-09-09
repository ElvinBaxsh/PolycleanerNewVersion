import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import DocumentsHeroTrust from "@/components/sections/documents/DocumentsHeroTrust";
import DocumentGrid from "@/components/sections/documents/DocumentGrid";
import FaqSection from "@/components/sections/documents/FaqSection";
import BuyerPackCta from "@/components/sections/documents/BuyerPackCta";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { DOCUMENTS_FAQ } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Buyer Documents | TDS, COA and Product Offer Sheet" },
  description:
    "Access Poly Cleaner's buyer documents — company profile, product offer sheet, technical data sheet, traceability note and more — for your due diligence.",
  alternates: { canonical: "/documents" },
};

export default function DocumentsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Documents", path: "/documents" }])} />
      <JsonLd data={faqJsonLd(DOCUMENTS_FAQ.map((f) => ({ q: f.q, a: f.a })))} />
      <PageHero pageKey="documents" extra={<DocumentsHeroTrust />} />
      <DocumentGrid />
      <FaqSection />
      <BuyerPackCta />
      <FinalCta />
    </>
  );
}
