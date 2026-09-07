"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import InquiryForm from "@/components/forms/InquiryForm";
import RequestOfferForm from "@/components/forms/RequestOfferForm";
import { INQUIRY_TYPES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { InquiryModalOptions } from "./InquiryModalContext";

export default function InquiryModal({
  options,
  onClose,
}: {
  options: InquiryModalOptions | null;
  onClose: () => void;
}) {
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

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    if (isOfferFlow) trackEvent("request_offer_open");

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  if (!renderOptions) return null;

  const title = isOfferFlow
    ? "Request rPET Flakes Offer"
    : INQUIRY_TYPES.find((t) => t.value === renderOptions.type)?.label ?? "Send an Inquiry";

  const subtitle = isOfferFlow
    ? "Tell us your requirements and our sales team will prepare a tailored offer for your company."
    : "Fill in the form below and our team will get back to you promptly.";

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(6,43,58,0.72)] p-4"
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
            className="scrollbar-thin relative max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl will-change-[opacity,transform] sm:p-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-soft-gray hover:text-navy"
            >
              <X className="size-5" />
            </button>

            <h2 className="pr-10 text-2xl font-bold text-navy">{title}</h2>
            {isOfferFlow && <span className="mt-2 block h-1 w-10 rounded-full bg-brand-green" />}
            <p className="mt-3 text-sm text-slate">{subtitle}</p>

            <div className="mt-6">
              {isOfferFlow ? (
                <RequestOfferForm onCancel={onClose} />
              ) : (
                <InquiryForm defaultType={renderOptions.type} defaultInterest={renderOptions.interest} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
