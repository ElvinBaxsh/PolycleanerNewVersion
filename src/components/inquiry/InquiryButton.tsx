"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { useInquiryModal } from "./InquiryModalContext";

type ButtonVariant = "primary" | "secondary" | "ghost-light" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-green text-white hover:bg-brand-green-dark",
  secondary: "bg-transparent text-navy border-2 border-border hover:bg-soft-gray",
  "ghost-light": "bg-transparent text-white border-2 border-white hover:bg-white hover:text-navy",
  outline: "bg-transparent border-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-6 text-base",
};

interface InquiryButtonProps {
  children: ReactNode;
  type?: string;
  interest?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Same look as <Button>, but opens the shared inquiry modal instead of
 * navigating to /contact. Used for every "Request Offer / Sample / Book
 * Meeting / Request Document Pack / Contact Sales" call to action.
 */
export default function InquiryButton({
  children,
  type,
  interest,
  variant = "primary",
  size = "md",
  icon,
  showArrow = false,
  className,
  onClick,
}: InquiryButtonProps) {
  const { open } = useInquiryModal();
  const classes = clsx(base, variants[variant], sizes[size], className);

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open({ type, interest });
      }}
      className={classes}
    >
      {icon}
      {children}
      {showArrow && <ArrowRight className="size-4" aria-hidden />}
    </button>
  );
}
