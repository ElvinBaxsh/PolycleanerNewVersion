"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import Logo from "./Logo";
import InquiryButton from "@/components/inquiry/InquiryButton";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);

  // The header is sticky/always-on-top, so once the footer (which repeats
  // the logo and nav-like links) scrolls into view, the two visually
  // clash. Slide the header away for as long as the footer is on screen.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideForFooter(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-navy transition-transform duration-300",
        hideForFooter ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container-header flex h-16 items-center justify-between gap-6 sm:h-20">
        <Logo />

        <nav className="hidden xl:flex items-center gap-6" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative whitespace-nowrap py-2 text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white",
                  active && "text-white"
                )}
              >
                {link.label}
                <span
                  className={clsx(
                    "absolute -bottom-0.5 left-0 h-0.5 w-full bg-brand-green transition-transform origin-left",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <InquiryButton type="offer" size="md">
            Request Offer
          </InquiryButton>
        </div>

        <button
          type="button"
          className="xl:hidden text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-white/10 bg-navy">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold uppercase tracking-wide text-white/85 border-b border-white/10 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <InquiryButton
              type="offer"
              className="mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              Request Offer
            </InquiryButton>
          </nav>
        </div>
      )}
    </header>
  );
}
