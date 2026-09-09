import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Poly Cleaner | Hot Washed rPET Flakes Supplier from Azerbaijan",
    template: "%s | Poly Cleaner",
  },
  description:
    "Poly Cleaner supplies consistently processed, fully documented hot washed rPET flakes for sheet, strap, fiber and non-food packaging applications, exported worldwide from Azerbaijan.",
  keywords: [
    "rPET flakes supplier",
    "hot washed PET flakes",
    "recycled PET flakes",
    "PET flakes exporter",
    "rPET flakes for sheet",
    "rPET flakes for strap",
    "rPET flakes for fiber",
    "PET recycling Azerbaijan",
    "documented recycled PET supplier",
    // Azərbaycan dilində SEO açar sözləri — sayt tək HTML-də (URL-ə görə
    // ayrılmayıb) render olunduğu üçün bura, dil seçimindən asılı olmayaraq
    // hər ziyarətçiyə gedən yeganə yerdir.
    "rPET lopa təchizatçısı",
    "təkrar emal edilmiş PET lopa təchizatçısı",
    "isti yuyulmuş PET lopaları",
    "təkrar emal edilmiş PET qırıntılarının ixracatçısı",
    "PET lövhə istehsalı üçün rPET qırıntıları",
    "qablaşdırma çəmbəri istehsalı üçün rPET lopaları",
    "polyester lif istehsalı üçün rPET lopaları",
    "əlyaf istehsalı üçün rPET qırıntıları",
    "Azərbaycanda PET butulkaların təkrar emalı",
    "sənədləşdirilib təkrar emal edilmiş PET təchizatçısı",
    "istifadə olunmuş PET butulkalardan alınan lopalar",
    "Avropaya isti yuyulmuş rPET lopalarının tədarükü",
    "plastik təkrar emalı Azərbaycan",
    "Bakıda plastik təkrar emalı",
    "plastik tullantıların təkrar emalı",
    "PET butulkaların təkrar emalı",
    "plastik butulkaların təkrar emalı",
    "plastik şüşələrin təkrar emalı",
    "Azərbaycanda PET təkrar emalı zavodu",
    "rPET istehsalçısı Azərbaycan",
    "PET lopa istehsalı",
    "PET lopalarının satışı",
    "təkrar emal edilmiş plastik xammal",
    "Poly Cleaner Azərbaycan",
    "Poly Cleaner Bakı",
    "Balaxanı Sənaye Parkı plastik təkrar emalı",
  ],
  openGraph: {
    title: "Poly Cleaner | Hot Washed rPET Flakes Supplier from Azerbaijan",
    description:
      "Documented, hot washed rPET flakes for sheet, strap, fiber and non-food packaging. Producer, not a trader — export-ready from Baku, Azerbaijan.",
    url: SITE_URL,
    siteName: "Poly Cleaner",
    locale: "en_US",
    alternateLocale: ["az_AZ"],
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Poly Cleaner — Hot Washed rPET Flakes Supplier from Azerbaijan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poly Cleaner | Hot Washed rPET Flakes Supplier from Azerbaijan",
    description:
      "Documented, hot washed rPET flakes for sheet, strap, fiber and non-food packaging, exported worldwide from Azerbaijan.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[color:var(--color-charcoal)]">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <NextTopLoader color="#4caf1b" height={3} showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
