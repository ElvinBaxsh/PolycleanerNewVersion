import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = pageMetadata({
  path: "/privacy-policy",
  locale: "en",
  title: "Privacy Policy | Poly Cleaner",
  description:
    "How Poly Cleaner collects, uses and protects your personal data.",
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
