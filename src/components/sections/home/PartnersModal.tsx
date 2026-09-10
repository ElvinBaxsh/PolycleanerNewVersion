"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PARTNERS } from "@/lib/constants";

/**
 * The homepage strip is a marquee — good for showing there are many
 * partners, bad for finding a specific one (you have to wait for it to
 * scroll past). This shows all of them at once in a static grid.
 *
 * Same modal shell conventions as InquiryModal: the backdrop is the
 * direct AnimatePresence child with a stable key (a plain wrapper would
 * break exit-tracking), scroll is locked while open with the scrollbar
 * gap padded back in, and Escape closes.
 */
export default function PartnersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const partnerText = t.partners;

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
          key="partners-modal-backdrop"
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
            aria-label={t.home.partnersTitle}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[900px] will-change-[opacity,transform]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Düymə kartın içindədir (kənarda "asılı" deyil) — modal
                max-width-ə çatanda kənarda cəmi 2px boşluq qalırdı və
                viewport-a dirənirdi. Başlığın `pr-10`-u üst-üstə düşməyə
                imkan vermir. */}
            <button
              type="button"
              onClick={onClose}
              aria-label={t.home.partnersModalClose}
              className="absolute right-2 top-2 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-slate shadow-sm transition-colors hover:bg-soft-gray hover:text-navy"
            >
              <X className="size-5" />
            </button>

            <div className="scrollbar-thin max-h-[85dvh] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
                {t.home.partnersEyebrow}
              </p>
              <h2 className="mt-1 pr-12 text-2xl font-bold text-navy">{t.home.partnersTitle}</h2>
              <p className="mt-2 max-w-xl text-sm text-slate">{t.home.partnersDescription}</p>

              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {PARTNERS.map((partner, i) => (
                  <li key={partner.name}>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${partnerText[i].name} website`}
                      className="group flex h-full flex-col items-center gap-2 rounded-xl border border-border bg-white p-4 transition-colors hover:border-brand-green/40 hover:bg-soft-gray"
                    >
                      <span className="flex h-16 w-full items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={partner.logo}
                          alt={partnerText[i].name}
                          className="h-auto max-h-16 w-auto max-w-full object-contain"
                        />
                      </span>
                      <span className="flex items-center gap-1 text-center text-xs font-semibold text-slate group-hover:text-navy">
                        {partnerText[i].name}
                        <ExternalLink className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" aria-hidden />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
