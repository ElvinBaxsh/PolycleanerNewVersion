"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Handshake, X } from "lucide-react";
import InquiryForm from "@/components/forms/InquiryForm";
import RequestOfferForm from "@/components/forms/RequestOfferForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import type { InquiryModalOptions } from "./InquiryModalContext";

export default function InquiryModal({
  options,
  onClose,
}: {
  options: InquiryModalOptions | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const isOpen = options !== null;

  // Keep the last options while the modal animates out.
  const [renderOptions, setRenderOptions] = useState(options);
  if (options !== null && options !== renderOptions) {
    setRenderOptions(options);
  }

  const isOfferFlow = renderOptions?.type === "offer";
  const isPartnerFlow = renderOptions?.type === "partner";

  useEffect(() => {
    if (!isOpen) return;

    // Hiding the scrollbar shifts the page, so pad the gap back.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    if (isOfferFlow) trackEvent("request_offer_open");

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  if (!renderOptions) return null;

  const title = isOfferFlow
    ? t.inquiryModal.offerTitle
    : t.inquiryTypes.find((it) => it.value === renderOptions.type)?.label ?? t.inquiryModal.fallbackTitle;

  const subtitle = isOfferFlow
    ? t.inquiryModal.offerSubtitle
    : t.inquiryModal.defaultSubtitle;

  return (
    <AnimatePresence>
      {isOpen && (
        // The backdrop must be the direct AnimatePresence child, or the exit
        // animation never finishes.
        <motion.div
          key="inquiry-modal-backdrop"
          // No backdrop-blur: it makes the open animation stutter.
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(6,43,58,0.72)] p-4 pt-[max(1rem,env(safe-area-inset-top))]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            // No overflow clipping here, so the close button can sit over the
            // edge.
            className="relative w-full max-w-[680px] will-change-[opacity,transform]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -right-3.5 -top-3.5 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-slate shadow-md transition-colors hover:bg-soft-gray hover:text-navy"
            >
              <X className="size-5" />
            </button>

            {/* dvh, not vh: on mobile Safari vh ignores the address bar. */}
            <div className="scrollbar-thin max-h-[85dvh] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
              <h2 className="flex items-center gap-2 pr-10 text-2xl font-bold text-navy">
                {isPartnerFlow && (
                  <span className="relative inline-flex shrink-0" aria-hidden>
                    <Handshake className="size-9 text-brand-green" />
                    <CheckCircle2 className="absolute -right-2 -top-2 size-5 rounded-full bg-white text-brand-green" />
                  </span>
                )}
                {title}
              </h2>
              {isOfferFlow && <span className="mt-2 block h-1 w-10 rounded-full bg-brand-green" />}
              <p className="mt-2 text-sm text-slate">{subtitle}</p>

              <div className="mt-5">
                {isOfferFlow ? (
                  <RequestOfferForm onCancel={onClose} onSuccess={onClose} />
                ) : (
                  <InquiryForm
                    defaultType={renderOptions.type}
                    defaultInterest={renderOptions.interest}
                    onCancel={onClose}
                    onSuccess={onClose}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
