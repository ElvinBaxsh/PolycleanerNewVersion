import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Poly Cleaner MMC collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-y bg-white">
      <Container className="prose-container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-navy">Privacy Policy</h1>
        <p className="mt-4 text-slate">
          Poly Cleaner MMC (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. Information submitted
          through our contact and inquiry forms (name, company, email, phone, and message) is used solely
          to respond to your request and is not sold or shared with third parties for marketing purposes.
        </p>
        <p className="mt-4 text-slate">
          We use essential cookies to operate this website and, where enabled, analytics cookies to
          understand site usage. You can control cookie preferences through your browser settings.
        </p>
        <p className="mt-4 text-slate">
          For any questions about how your data is handled, contact us at{" "}
          <a href="mailto:info@polycleaner.com" className="text-brand-blue underline">
            info@polycleaner.com
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
