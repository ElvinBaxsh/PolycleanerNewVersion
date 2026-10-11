"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, LayoutGrid, X } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FACTORY_GALLERY } from "@/lib/constants";

// Plant photos in a modal: a grid of all photos and a full-size view with
// arrows. Escape goes back one step. Open it through useFactoryGallery().
export function useFactoryGallery(): {
  openGrid: () => void;
  openAt: (index: number) => void;
  modal: ReactNode;
} {
  const [open, setOpen] = useState(false);
  // null = the grid; a number = that photo, full size.
  const [active, setActive] = useState<number | null>(null);
  // The portal needs `document`, so it is created on first open.
  const [mounted, setMounted] = useState(false);

  const openGrid = useCallback(() => {
    setMounted(true);
    setActive(null);
    setOpen(true);
  }, []);

  const openAt = useCallback((index: number) => {
    setMounted(true);
    setActive(index);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Rendered in <body>: inside an animated wrapper, `fixed` would be relative
  // to that wrapper.
  const modal = mounted
    ? createPortal(<GalleryModal open={open} active={active} onActiveChange={setActive} onClose={close} />, document.body)
    : null;

  return { openGrid, openAt, modal };
}

export default function FactoryGalleryButton({
  className,
  variant = "chip",
}: {
  className?: string;
  /**
   * chip: label and count. hero: the card in a banner corner, icon only on
   * phones.
   */
  variant?: "chip" | "hero";
}) {
  const { t } = useLanguage();
  const { openGrid, modal } = useFactoryGallery();
  const total = FACTORY_GALLERY.length;

  return (
    <>
      <button
        type="button"
        onClick={openGrid}
        aria-label={`${t.gallery.open} (${t.gallery.count(total)})`}
        className={clsx(
          "group inline-flex cursor-pointer items-center rounded-full font-bold text-white ring-1 ring-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          variant === "hero"
            ? "bg-navy/70 p-1 text-left shadow-xl backdrop-blur-md hover:bg-navy sm:gap-3 sm:py-1.5 sm:pl-1.5 sm:pr-5"
            : "gap-2 bg-navy/85 px-4 py-2 text-sm shadow-lg backdrop-blur-sm hover:bg-brand-blue",
          className,
        )}
      >
        {variant === "hero" ? (
          <>
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-green transition-transform group-hover:scale-105 sm:size-11">
              <Images className="size-5" aria-hidden />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm">{t.gallery.open}</span>
              <span className="text-xs font-semibold text-white/70">{t.gallery.count(total)}</span>
            </span>
          </>
        ) : (
          <>
            <Images className="size-[18px]" aria-hidden />
            <span>{t.gallery.open}</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs tabular-nums">{total}</span>
          </>
        )}
      </button>

      {modal}
    </>
  );
}

function GalleryModal({
  open,
  active,
  onActiveChange,
  onClose,
}: {
  open: boolean;
  active: number | null;
  onActiveChange: (index: number | null) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const total = FACTORY_GALLERY.length;

  const step = useCallback(
    (delta: number) => {
      if (active !== null) onActiveChange((active + delta + total) % total);
    },
    [active, onActiveChange, total],
  );

  useEffect(() => {
    if (!open) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (active === null) onClose();
        else onActiveChange(null);
      } else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, active, onActiveChange, onClose, step]);

  const photo = active === null ? null : FACTORY_GALLERY[active];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="factory-gallery-backdrop"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(6,43,58,0.92)] p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-6"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.title}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-[1200px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl will-change-[opacity,transform]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                {photo && (
                  <button
                    type="button"
                    onClick={() => onActiveChange(null)}
                    className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-bold text-navy transition-colors hover:bg-soft-gray"
                  >
                    <LayoutGrid className="size-4" aria-hidden />
                    <span className="hidden sm:inline">{t.gallery.allPhotos}</span>
                  </button>
                )}
                <h2 className="truncate text-base font-bold text-navy sm:text-lg">
                  {photo ? t.gallery.categories[photo.category] : t.gallery.title}
                </h2>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-slate/60">
                  {active === null ? t.gallery.count(total) : t.gallery.position(active + 1, total)}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.forms.closeLabel}
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-slate transition-colors hover:bg-soft-gray hover:text-navy"
              >
                <X className="size-5" />
              </button>
            </div>

            {photo ? (
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-navy">
                {/* Plain <img>: the file is already the right size. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={`${t.gallery.categories[photo.category]} — Poly Cleaner`}
                  className="max-h-[calc(100svh-9rem)] w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t.gallery.prev}
                  className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-navy/70 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-brand-blue sm:left-4 sm:size-12"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.gallery.next}
                  className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-navy/70 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-brand-blue sm:right-4 sm:size-12"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>
            ) : (
              <ul className="scrollbar-none grid min-h-0 flex-1 grid-cols-2 gap-2 overflow-y-auto p-3 sm:grid-cols-3 sm:gap-3 sm:p-6 lg:grid-cols-4">
                {FACTORY_GALLERY.map((item, i) => (
                  <li key={item.src}>
                    <button
                      type="button"
                      onClick={() => onActiveChange(i)}
                      aria-label={`${t.gallery.categories[item.category]} — ${t.gallery.position(i + 1, total)}`}
                      className="group relative block aspect-[3/2] w-full cursor-pointer overflow-hidden rounded-lg bg-soft-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    >
                      <Image
                        src={item.thumb}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
