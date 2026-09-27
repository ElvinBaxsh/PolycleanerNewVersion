"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * The company video, played in an overlay instead of on the page.
 *
 * Nothing of the video is fetched until it opens: the <video> element only
 * exists while the modal is mounted, so the home page still loads with the
 * hero image alone. Two sources are listed, a 720p file for phones and the
 * 1080p one for everything else — the browser takes the first whose media
 * query matches, so a phone never pulls the larger file.
 *
 * Same modal shell conventions as SubmissionSuccessModal and PartnersModal:
 * the backdrop is the direct AnimatePresence child with a stable key, scroll
 * is locked while open with the scrollbar gap padded back in, and Escape
 * closes.
 */
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

  // The video opens with sound, because it is opened by a deliberate click
  // rather than played on arrival. Browsers only allow that from a user
  // gesture, and a failed play() (a policy we didn't anticipate, or a file
  // still loading) leaves the controls there to press.
  // Closing stops it: the element survives the exit animation (and, on a
  // route change, can outlive the modal entirely), so without this the
  // sound carries on playing over the page that's left behind.
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
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(6,43,58,0.92)] p-4 pt-[max(1rem,env(safe-area-inset-top))]"
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
            {/* Above the frame, not on it: the player's own controls sit
                along the bottom edge, and a corner button over the picture
                would cover part of it. */}
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute -top-11 right-0 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            <video
              ref={videoRef}
              controls
              playsInline
              preload="auto"
              poster="/video/poly-cleaner-poster.webp"
              className="aspect-video w-full rounded-xl bg-black shadow-2xl"
            >
              <source src="/video/poly-cleaner-720p.mp4" type="video/mp4" media="(max-width: 768px)" />
              <source src="/video/poly-cleaner.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
