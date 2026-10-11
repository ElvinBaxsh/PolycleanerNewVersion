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

// Header, footer and the modal providers for one language. Each language
// tree mounts its own, so the header and footer follow the page's language.
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
        {/* Outside the modal providers: the confirmation must survive the
            inquiry modal closing. */}
        <SubmissionSuccessProvider>
          <InquiryModalProvider>
            <DocumentRequestModalProvider>
              {/* lang here, because <html lang> is shared by both languages.
                  It tells search engines the content's language and makes
                  CSS uppercase turn "i" into "İ" in Azerbaijani. `contents`
                  keeps the wrapper out of the page layout. */}
              <div lang={initialLocale} className="contents">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ScrollToTopButton />
              </div>
            </DocumentRequestModalProvider>
          </InquiryModalProvider>
        </SubmissionSuccessProvider>
      </MotionProvider>
    </LanguageProvider>
  );
}
