import type { ReactNode } from "react";
import MotionProvider from "@/components/layout/MotionProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import InquiryModalProvider from "@/components/inquiry/InquiryModalProvider";
import SubmissionSuccessProvider from "@/components/forms/SubmissionSuccessProvider";
import DocumentRequestModalProvider from "@/components/sections/documents/DocumentRequestModalProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/translations";

/**
 * The site chrome (Header/Footer/modals), parameterized by locale. Mounted
 * once per locale-tree layout (see src/app/(main)/layout.tsx and
 * src/app/az/layout.tsx) rather than the root layout, so that each locale
 * subtree gets its own LanguageProvider — Header/Footer render inside it
 * and pick up the right language, which wouldn't happen if this stayed at
 * the true root (siblings of {children}, not descendants of a per-route
 * provider).
 */
export default function AppShell({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <MotionProvider>
        {/* Outside the modal providers on purpose: a form sent from inside
            the inquiry modal closes it, and the confirmation has to outlive
            that unmount. */}
        <SubmissionSuccessProvider>
          <InquiryModalProvider>
            <DocumentRequestModalProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTopButton />
            </DocumentRequestModalProvider>
          </InquiryModalProvider>
        </SubmissionSuccessProvider>
      </MotionProvider>
    </LanguageProvider>
  );
}
