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

  // `options` flips to null the instant the modal starts closing, but the
  // exit animation still needs a title/form to fade out — so keep the last
  // real options around and only clear them once fully unmounted. Updating
  // this during render (not in an effect) is the documented pattern for
  // deriving state from a changing prop.
  const [renderOptions, setRenderOptions] = useState(options);
  if (options !== null && options !== renderOptions) {
    setRenderOptions(options);
  }

  const isOfferFlow = renderOptions?.type === "offer";
  const isPartnerFlow = renderOptions?.type === "partner";

  useEffect(() => {
    if (!isOpen) return;

    // Locking scroll via overflow:hidden removes the body's scrollbar, which
    // shifts all fixed/centered content (including this modal) rightward by
    // the scrollbar's width. Padding that gap back in keeps the page still.
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
        // The backdrop IS the AnimatePresence direct child (a motion
        // component with a stable key) — a plain wrapper <div> here would
        // break exit-tracking entirely and leave the modal hanging open
        // forever instead of animating closed. Each motion component gets
        // its own explicit initial/animate/exit (no variant inheritance)
        // since that's what reliably fires here.
        <motion.div
          key="inquiry-modal-backdrop"
          // No backdrop-blur: animating opacity over a backdrop-filter forces
          // the browser to re-blur the whole page every frame, which is what
          // made the modal stutter/freeze on open. A plain tinted overlay is
          // cheap to composite.
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
            // relative + no overflow clipping here (unlike the scrollable card
            // below) so the close button can sit half outside the card's edge
            // without being cut off by scroll clipping.
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

            {/* dvh (not vh) — vh on mobile Safari is based on the viewport
                with the address bar hidden, so a modal sized off 92vh can
                render taller than what's actually visible, pushing the
                close button above the top edge. dvh tracks the real,
                currently-visible viewport. */}
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
