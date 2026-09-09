import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import MotionProvider from "@/components/layout/MotionProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import InquiryModalProvider from "@/components/inquiry/InquiryModalProvider";
import DocumentRequestModalProvider from "@/components/sections/documents/DocumentRequestModalProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
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
        <LanguageProvider>
          <MotionProvider>
            <InquiryModalProvider>
              <DocumentRequestModalProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ScrollToTopButton />
              </DocumentRequestModalProvider>
            </InquiryModalProvider>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
