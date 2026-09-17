"use client";

import { useRef, useState, type PointerEvent, type TouchEvent } from "react";

/**
 * Pause-on-interaction for the CSS marquee strips (partners, process steps,
 * applications, close-ups).
 *
 * The strips used to pause on mouseenter/touchstart and resume 1.2s after
 * mouseleave/touchend. Both fire without the visitor meaning to touch the
 * strip: scrolling the page with the wheel slides the strip under a cursor
 * that never moved (the browser reports that as the mouse entering it), and
 * on a phone a vertical swipe that happens to start on the strip is a
 * touchstart. Either way the strip froze for a second or so mid-scroll.
 *
 * Now a mouse pauses the strip only by actually moving over it — a scroll
 * changes what is under the cursor, not the cursor's coordinates — and the
 * strip resumes as soon as the mouse leaves. A finger pauses it only with a
 * mostly-horizontal drag (dragging the strip itself); vertical page swipes
 * pass straight through.
 */
const SWIPE_THRESHOLD_PX = 8;

export function useMarqueePause(touchResumeDelayMs = 1200) {
  const [paused, setPaused] = useState(false);
  const lastMouse = useRef<{ x: number; y: number } | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearResume() {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }
  }

  function onPointerEnter(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    // Remember where the cursor is, but don't pause: an enter caused by the
    // page scrolling arrives with the cursor exactly where it already was.
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerMove(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const last = lastMouse.current;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    if (last && (e.clientX !== last.x || e.clientY !== last.y)) {
      clearResume();
      setPaused(true);
    }
  }

  function onPointerLeave(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    lastMouse.current = null;
    clearResume();
    setPaused(false);
  }

  function onTouchStart(e: TouchEvent) {
    const touch = e.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function onTouchMove(e: TouchEvent) {
    const start = touchStart.current;
    const touch = e.touches[0];
    if (!start || !touch) return;
    const dx = Math.abs(touch.clientX - start.x);
    const dy = Math.abs(touch.clientY - start.y);
    if (dx > SWIPE_THRESHOLD_PX && dx > dy) {
      clearResume();
      setPaused(true);
    }
  }

  function onTouchEnd() {
    touchStart.current = null;
    if (!paused) return;
    // A short hold after a drag, so the item the visitor dragged to stays put
    // long enough to read.
    clearResume();
    resumeTimeout.current = setTimeout(() => setPaused(false), touchResumeDelayMs);
  }

  return {
    paused,
    handlers: {
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel: onTouchEnd,
    },
  };
}
