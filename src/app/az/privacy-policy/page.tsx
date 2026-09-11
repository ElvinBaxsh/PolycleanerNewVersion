import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PrivacyPolicyPage from "@/app/(main)/privacy-policy/page";

export const metadata: Metadata = pageMetadata({
  path: "/privacy-policy",
  locale: "az",
  title: "Məxfilik Siyasəti | Poly Cleaner",
  description:
    "Poly Cleaner-in şəxsi məlumatların toplanması və istifadəsi üzrə məxfilik siyasəti.",
});

export default PrivacyPolicyPage;
