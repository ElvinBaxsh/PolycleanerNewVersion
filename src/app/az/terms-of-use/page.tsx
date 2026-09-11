import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import TermsOfUsePage from "@/app/(main)/terms-of-use/page";

export const metadata: Metadata = pageMetadata({
  path: "/terms-of-use",
  locale: "az",
  title: "İstifadə Şərtləri | Poly Cleaner",
  description:
    "Poly Cleaner veb saytından istifadə şərtləri və qaydaları.",
});

export default TermsOfUsePage;
