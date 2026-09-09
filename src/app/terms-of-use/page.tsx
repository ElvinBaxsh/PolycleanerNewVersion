import type { Metadata } from "next";
import TermsOfUseContent from "./TermsOfUseContent";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Poly Cleaner website.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return <TermsOfUseContent />;
}
