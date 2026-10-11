"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check, Globe } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath, delocalizePath } from "@/lib/i18n/localizePath";
import type { Locale } from "@/lib/i18n/translations";

// SVG flags: emoji flags don't render on Windows.
const OPTIONS: { locale: Locale; flagSrc: string; label: string }[] = [
  { locale: "en", flagSrc: "/images/flags/gb.svg", label: "English" },
  { locale: "az", flagSrc: "/images/flags/az.svg", label: "Azerbaijan" },
];

export default function LanguageSwitcher({
  light = true,
  dropUp = false,
  variant = "dropdown",
}: {
  light?: boolean;
  /** Opens the list upwards, for use near the bottom of the page. */
  dropUp?: boolean;
  /** simple: an inline "AZ | EN" toggle. flags: two flags, no text. */
  variant?: "dropdown" | "simple" | "flags";
}) {
  const { locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = OPTIONS.find((o) => o.locale === locale) ?? OPTIONS[0];

  // Switching language means going to the same page in the other language. The
  // query and #anchor are read at click time, so they are kept.
  function goToLocale(target: Locale) {
    if (target === locale) return;
    const { search, hash } = window.location;
    router.push(localizePath(delocalizePath(pathname) + search + hash, target));
  }

  // Before the early returns, to keep the hook order stable.
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "flags") {
    return (
      <div className="flex items-center gap-4">
        {OPTIONS.map((opt) => {
          const active = locale === opt.locale;
          return (
            <button
              key={opt.locale}
              type="button"
              onClick={() => goToLocale(opt.locale)}
              aria-pressed={active}
              aria-label={opt.label}
              className={clsx(
                "flex cursor-pointer flex-col items-center gap-1.5 border-b-2 pb-1 transition-colors",
                active ? "border-brand-green" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <span className="block size-6 shrink-0 overflow-hidden rounded-full" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={opt.flagSrc} alt="" className="size-full object-cover" />
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div className={clsx("flex items-center gap-1.5 text-sm font-semibold", light ? "text-white/70" : "text-slate")}>
        <Globe className="size-4 shrink-0" aria-hidden />
        {OPTIONS.slice()
          .reverse()
          .map((opt, i) => (
            <span key={opt.locale} className="flex items-center gap-1.5">
              {i > 0 && <span className={light ? "text-white/30" : "text-border"}>|</span>}
              <button
                type="button"
                onClick={() => goToLocale(opt.locale)}
                aria-pressed={locale === opt.locale}
                aria-label={opt.label}
                className={clsx(
                  "cursor-pointer uppercase tracking-wide transition-colors",
                  locale === opt.locale
                    ? light
                      ? "text-white"
                      : "text-navy"
                    : light
                    ? "text-white/50 hover:text-white/80"
                    : "text-slate/50 hover:text-slate"
                )}
              >
                {opt.locale}
              </button>
            </span>
          ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Select language, current: ${current.label}`}
        className={clsx(
          "flex h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3.5 transition-colors",
          light
            ? "bg-navy text-white/85 hover:bg-white/10"
            : "bg-white text-slate hover:bg-soft-gray"
        )}
      >
        <span className="block size-5 shrink-0 overflow-hidden rounded-full" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.flagSrc} alt="" className="size-full object-cover" />
        </span>
        <ChevronDown
          className={clsx("size-4 transition-transform", (dropUp ? !open : open) && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={clsx(
            "absolute right-0 z-50 w-40 overflow-hidden rounded-xl border border-border bg-white py-1 shadow-lg",
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {OPTIONS.map((opt) => {
            const active = locale === opt.locale;
            return (
              <li key={opt.locale}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    goToLocale(opt.locale);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                    active ? "bg-brand-green/10 text-brand-green-dark" : "text-navy hover:bg-soft-gray"
                  )}
                >
                  <span className="block size-5 shrink-0 overflow-hidden rounded-full" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={opt.flagSrc} alt="" className="size-full object-cover" />
                  </span>
                  <span className="flex-1">{opt.label}</span>
                  {active && <Check className="size-4 shrink-0" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
