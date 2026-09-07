import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Poly Cleaner MMC website.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <section className="section-y bg-white">
      <Container className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-navy">Terms of Use</h1>
        <p className="mt-4 text-slate">
          By accessing this website, you agree to use it for lawful purposes only. Content, specifications
          and pricing displayed are for informational purposes and are subject to confirmation in a formal
          offer or contract with Poly Cleaner MMC.
        </p>
        <p className="mt-4 text-slate">
          All trademarks, logos and content on this site are the property of Poly Cleaner MMC unless
          otherwise stated, and may not be reproduced without prior written consent.
        </p>
        <p className="mt-4 text-slate">
          For questions regarding these terms, contact us at{" "}
          <a href="mailto:info@polycleaner.com" className="text-brand-blue underline">
            info@polycleaner.com
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
