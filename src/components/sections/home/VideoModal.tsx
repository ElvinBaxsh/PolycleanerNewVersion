"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { videoUrl } from "@/lib/constants";

// The company video in a modal. Nothing is downloaded until it opens. Phones
// get the 720p file.
export default function VideoModal({
  open,
  onClose,
  title,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Plays with sound on open. Stops and rewinds on close, otherwise the sound
  // keeps playing.
  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    video?.play().catch(() => {});

    return () => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="video-backdrop"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(6,43,58,0.92)] p-5 pt-[max(1.25rem,env(safe-area-inset-top))]"
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
            className="relative w-full max-w-[1100px] will-change-[opacity,transform]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button on the frame's corner, solid so it shows over
                bright frames. */}
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute -right-3 -top-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white shadow-lg ring-1 ring-white/25 transition-colors hover:bg-brand-blue sm:-right-5 sm:-top-5"
            >
              <X className="size-5" />
            </button>

            <video
              ref={videoRef}
              controls
              playsInline
              preload="auto"
              poster={videoUrl("poly-cleaner-poster.webp")}
              className="aspect-video w-full rounded-xl bg-black shadow-2xl"
            >
              <source src={videoUrl("poly-cleaner-720p.mp4")} type="video/mp4" media="(max-width: 768px)" />
              <source src={videoUrl("poly-cleaner.mp4")} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
