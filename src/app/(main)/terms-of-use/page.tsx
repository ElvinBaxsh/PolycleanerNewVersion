import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import TermsOfUseContent from "./TermsOfUseContent";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Poly Cleaner website.",
  alternates: {
    canonical: "/terms-of-use",
    languages: {
      en: `${SITE_URL}/terms-of-use`,
      az: `${SITE_URL}/az/terms-of-use`,
      "x-default": `${SITE_URL}/terms-of-use`,
    },
  },
};

export default function TermsOfUsePage() {
  return <TermsOfUseContent />;
}
