import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import MotionProvider from "@/components/layout/MotionProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InquiryModalProvider from "@/components/inquiry/InquiryModalProvider";
import { SITE_URL } from "@/lib/constants";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Poly Cleaner MMC | Hot Washed rPET Flakes Supplier from Azerbaijan",
    template: "%s | Poly Cleaner MMC",
  },
  description:
    "Poly Cleaner MMC supplies consistently processed, fully documented hot washed rPET flakes for sheet, strap, fiber and non-food packaging applications, exported worldwide from Azerbaijan.",
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
    title: "Poly Cleaner MMC | Hot Washed rPET Flakes Supplier from Azerbaijan",
    description:
      "Documented, hot washed rPET flakes for sheet, strap, fiber and non-food packaging. Producer, not a trader — export-ready from Baku, Azerbaijan.",
    url: SITE_URL,
    siteName: "Poly Cleaner MMC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poly Cleaner MMC | Hot Washed rPET Flakes Supplier from Azerbaijan",
    description:
      "Documented, hot washed rPET flakes for sheet, strap, fiber and non-food packaging, exported worldwide from Azerbaijan.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[color:var(--color-charcoal)]">
        <NextTopLoader color="#4caf1b" height={3} showSpinner={false} />
        <MotionProvider>
          <InquiryModalProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </InquiryModalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
