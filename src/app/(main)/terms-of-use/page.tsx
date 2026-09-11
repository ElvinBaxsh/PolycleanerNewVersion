import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import TermsOfUseContent from "./TermsOfUseContent";

export const metadata: Metadata = pageMetadata({
  path: "/terms-of-use",
  locale: "en",
  title: "Terms of Use | Poly Cleaner",
  description:
    "Terms governing the use of the Poly Cleaner website.",
});

export default function TermsOfUsePage() {
  return <TermsOfUseContent />;
}
