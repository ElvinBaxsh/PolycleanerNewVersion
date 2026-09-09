import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Poly Cleaner collects, uses and protects your personal data.",
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      en: `${SITE_URL}/privacy-policy`,
      az: `${SITE_URL}/az/privacy-policy`,
      "x-default": `${SITE_URL}/privacy-policy`,
    },
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
