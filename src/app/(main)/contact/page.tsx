import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import MapAndActions from "@/components/sections/contact/MapAndActions";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  locale: "en",
  title: "Contact Poly Cleaner | Request rPET Flakes Offer",
  description:
    "Reach out to Poly Cleaner for rPET flakes inquiries, samples, offers, or partnership opportunities. Our team typically replies within 24 hours.",
});

export default async function ContactPage({
  searchParams,
  locale = "en",
}: PageProps<"/contact"> & { locale?: Locale }) {
  // The GitHub Pages static preview has no server to resolve searchParams
  // with, so it skips awaiting it entirely (reading it at all is what
  // forces dynamic rendering, which `output: "export"` can't do) — the
  // ?type=/&interest= prefill just doesn't apply there. The real
  // (server-hosted) deployment still reads it normally.
  const params = process.env.STATIC_EXPORT === "1" ? {} : await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;
  const interest = typeof params.interest === "string" ? params.interest : undefined;

  return (
    <>
      <JsonLd
        data={pageBreadcrumbJsonLd("/contact", "contact", locale)}
      />
      <ContactHero />
      <ContactFormSection defaultType={type} defaultInterest={interest} />
      <MapAndActions />
      <FinalCta />
    </>
  );
}
