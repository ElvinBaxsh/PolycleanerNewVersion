import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import TermsOfUsePage from "@/app/(main)/terms-of-use/page";

export const metadata: Metadata = {
  title: "İstifadə Şərtləri",
  description: "Poly Cleaner veb saytından istifadə şərtləri və qaydaları.",
  alternates: {
    canonical: "/az/terms-of-use",
    languages: {
      en: `${SITE_URL}/terms-of-use`,
      az: `${SITE_URL}/az/terms-of-use`,
      "x-default": `${SITE_URL}/terms-of-use`,
    },
  },
};

export default TermsOfUsePage;
