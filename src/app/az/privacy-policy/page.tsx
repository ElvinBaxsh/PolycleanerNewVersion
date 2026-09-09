import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PrivacyPolicyPage from "@/app/(main)/privacy-policy/page";

export const metadata: Metadata = {
  title: "Məxfilik Siyasəti",
  description: "Poly Cleaner-in şəxsi məlumatların toplanması və istifadəsi üzrə məxfilik siyasəti.",
  alternates: {
    canonical: "/az/privacy-policy",
    languages: {
      en: `${SITE_URL}/privacy-policy`,
      az: `${SITE_URL}/az/privacy-policy`,
      "x-default": `${SITE_URL}/privacy-policy`,
    },
  },
};

export default PrivacyPolicyPage;
