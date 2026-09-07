import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import MapAndActions from "@/components/sections/contact/MapAndActions";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Poly Cleaner MMC for rPET flakes inquiries, samples, offers, or partnership opportunities. Our team typically replies within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;
  const interest = typeof params.interest === "string" ? params.interest : undefined;

  return (
    <>
      <ContactHero />
      <ContactFormSection defaultType={type} defaultInterest={interest} />
      <MapAndActions />
      <FinalCta />
    </>
  );
}
