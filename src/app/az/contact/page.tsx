import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import ContactPage from "@/app/(main)/contact/page";

export const metadata: Metadata = {
  title: { absolute: "Əlaqə | Poly Cleaner Azərbaycan" },
  description:
    "Poly Cleaner ilə əlaqə saxlayın — rPET lopa təklifi, nümunə sorğusu və ya əməkdaşlıq üçün Bakıdakı komandamızla birbaşa danışın.",
  alternates: {
    canonical: "/az/contact",
    languages: { en: `${SITE_URL}/contact`, az: `${SITE_URL}/az/contact`, "x-default": `${SITE_URL}/contact` },
  },
};

export default async function ContactPageAz(props: PageProps<"/az/contact">) {
  return <ContactPage {...props} basePath="/az" />;
}
