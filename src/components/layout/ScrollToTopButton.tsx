"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { clsx } from "clsx";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const spinTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (spinTimeout.current) clearTimeout(spinTimeout.current);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Bir fırfıra (top) kimi fırlanma animasiyası — yuxarı qalxdığı hiss olunsun.
    setSpinning(true);
    if (spinTimeout.current) clearTimeout(spinTimeout.current);
    spinTimeout.current = setTimeout(() => setSpinning(false), 600);
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={clsx(
        "fixed right-5 bottom-5 z-50 flex size-11 items-center justify-center rounded-full border-2 border-brand-green bg-white text-brand-green shadow-lg transition-[opacity,transform] duration-300 hover:bg-brand-green hover:text-white sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp
        className={clsx("size-5 stroke-[2.2] transition-transform", spinning && "animate-[spin-up_0.6s_ease-out]")}
        aria-hidden
      />
    </button>
  );
}
