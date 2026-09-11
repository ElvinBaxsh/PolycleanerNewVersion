"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export type DownloadState = "idle" | "downloading" | "done";

// The buyer PDFs are 70–210 KB, so the browser has the file well within
// this window; it only has to be long enough for the drop animation to read.
const DOWNLOADING_MS = 900;
const DONE_MS = 2300;

/**
 * Visible feedback for a plain <a download> link. Browsers give little or
 * none of their own — the file lands quietly in a downloads bar, if one is
 * shown at all — so clicking "Download" looked as if nothing happened. The
 * link still does the actual downloading; this only drives the animation.
 */
export function useDownloadFeedback() {
  const [state, setState] = useState<DownloadState>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function start() {
    timers.current.forEach(clearTimeout);
    setState("downloading");
    timers.current = [
      window.setTimeout(() => setState("done"), DOWNLOADING_MS),
      window.setTimeout(() => setState("idle"), DOWNLOADING_MS + DONE_MS),
    ];
  }

  return { state, start };
}

/**
 * The download glyph with three states: at rest; the arrow repeatedly
 * dropping into the tray while downloading; then a tick. Sized by the
 * caller (`className`, e.g. "size-3.5").
 */
export function DownloadStatusIcon({ state, className = "" }: { state: DownloadState; className?: string }) {
  // The two glyphs are stacked and cross-fade (no mode="wait"), so the tick
  // appears the moment the state flips instead of waiting for the arrow's
  // exit animation to finish first.
  return (
    <span className={`relative inline-flex shrink-0 ${className}`} aria-hidden>
      <AnimatePresence initial={false}>
        {state === "done" ? (
          <motion.span
            key="done"
            className="absolute inset-0 inline-flex text-brand-green"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
          >
            <Check className="size-full" strokeWidth={3} />
          </motion.span>
        ) : (
          <motion.svg
            key="arrow"
            viewBox="0 0 24 24"
            className="absolute inset-0 size-full overflow-visible"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <motion.g
              animate={
                state === "downloading"
                  ? { y: [-9, 0, 4], opacity: [0, 1, 0] }
                  : { y: 0, opacity: 1 }
              }
              transition={
                state === "downloading"
                  ? { duration: 0.7, times: [0, 0.55, 1], ease: "easeIn", repeat: Infinity }
                  : { duration: 0.2 }
              }
            >
              <path d="M12 15V3" />
              <path d="m7 10 5 5 5-5" />
            </motion.g>
          </motion.svg>
        )}
      </AnimatePresence>
    </span>
  );
}
