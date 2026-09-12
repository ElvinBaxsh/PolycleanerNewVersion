"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SubmissionSuccess, { type SummaryRow } from "./SubmissionSuccess";

/**
 * The confirmation as an overlay rather than a replacement for the form.
 *
 * In place, it inherited whatever width the form had — in the contact card
 * that is a ~585px column, which squeezed the details list into a narrow
 * strip. As a modal it gets the room the two-column layout was designed
 * for, and closing it leaves the (now empty) form exactly where it was, so
 * sending a second enquiry needs no navigation.
 *
 * Same modal shell conventions as InquiryModal and PartnersModal: the
 * backdrop is the direct AnimatePresence child with a stable key (a plain
 * wrapper would break exit-tracking), scroll is locked while open with the
 * scrollbar gap padded back in, and Escape closes.
 */
export default function SubmissionSuccessModal({
  open,
  onClose,
  title,
  subtitle,
  sentBadge,
  referenceLabel,
  reference,
  detailsTitle,
  rows,
  resetLabel,
  closeLabel,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  sentBadge: string;
  referenceLabel: string;
  reference: string;
  detailsTitle: string;
  rows: SummaryRow[];
  /** "Send another" — closes the modal and hands back the blank form. */
  resetLabel: string;
  closeLabel: string;
  onReset: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="submission-success-backdrop"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(6,43,58,0.84)] p-4 pt-[max(1rem,env(safe-area-inset-top))]"
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
            className="relative w-full max-w-[980px] will-change-[opacity,transform]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Inside the card, not hanging off its corner: this panel has a
                painted background to its very edge, so an outside button
                would sit on the backdrop instead of on the card. */}
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-3 top-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white/90 text-slate shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-navy"
            >
              <X className="size-5" />
            </button>

            <SubmissionSuccess
              title={title}
              subtitle={subtitle}
              sentBadge={sentBadge}
              referenceLabel={referenceLabel}
              reference={reference}
              detailsTitle={detailsTitle}
              rows={rows}
              resetLabel={resetLabel}
              closeLabel={closeLabel}
              onReset={onReset}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
