"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export type DownloadState = "idle" | "downloading" | "done";

// Long enough for the animation to be seen.
const DOWNLOADING_MS = 900;
const DONE_MS = 2300;

// Visible feedback for a download link. The browser shows almost none.
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

// Download icon with three states: idle, downloading, done.
export function DownloadStatusIcon({ state, className = "" }: { state: DownloadState; className?: string }) {
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
