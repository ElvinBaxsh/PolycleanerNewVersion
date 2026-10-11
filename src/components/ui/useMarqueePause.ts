"use client";

import { useRef, useState, type PointerEvent, type TouchEvent } from "react";

// Pauses a marquee strip on real interaction: a mouse that actually moves over
// it, or a horizontal finger drag. Scrolling the page doesn't pause it.
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
    // Remember the position, but don't pause: scrolling the page also fires
    // this.
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
    // Hold briefly after a drag.
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
