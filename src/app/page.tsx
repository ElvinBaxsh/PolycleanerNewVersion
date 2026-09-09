import type { Metadata } from "next";
import Hero from "@/components/sections/home/Hero";
import TrustBar from "@/components/sections/TrustBar";
import PartnersSection from "@/components/sections/home/PartnersSection";
import ProductGrid from "@/components/sections/home/ProductGrid";
import ProcessStrip from "@/components/sections/ProcessStrip";
import WhyChoose from "@/components/sections/home/WhyChoose";
import BuyerDocuments from "@/components/sections/BuyerDocuments";
import TaropakBanner from "@/components/sections/TaropakBanner";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "Poly Cleaner | Hot Washed rPET Flakes Supplier from Azerbaijan" },
  description:
    "Poly Cleaner supplies documented hot washed rPET flakes for sheet, strap, fiber and non-food packaging applications. Export-ready recycled PET supplier from Azerbaijan.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductGrid />
      <ProcessStrip />
      <WhyChoose />
      <PartnersSection />
      <BuyerDocuments />
      <TaropakBanner />
      <FinalCta />
    </>
  );
}
