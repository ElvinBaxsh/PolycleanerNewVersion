"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import DocumentRequestForm from "./DocumentRequestForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DocumentRequestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
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

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="document-request-modal-backdrop"
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
            aria-label={t.documentRequestForm.heading}
            onClick={(e) => e.stopPropagation()}
            // relative + no overflow clipping here (unlike the scrollable card
            // below) so the close button can sit half outside the card's edge
            // without being cut off by scroll clipping.
            className="relative w-full max-w-[480px] will-change-[opacity,transform]"
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
            <div className="scrollbar-thin max-h-[85dvh] overflow-y-auto rounded-2xl shadow-2xl">
              <DocumentRequestForm onCancel={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
