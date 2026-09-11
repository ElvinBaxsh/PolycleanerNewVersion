import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactPage from "@/app/(main)/contact/page";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  locale: "az",
  title: "Əlaqə | Poly Cleaner Azərbaycan",
  description:
    "Poly Cleaner ilə əlaqə saxlayın — rPET lopa təklifi, nümunə sorğusu və ya əməkdaşlıq üçün Bakıdakı komandamızla birbaşa danışın.",
});

export default async function ContactPageAz(props: PageProps<"/az/contact">) {
  return <ContactPage {...props} basePath="/az" />;
}
