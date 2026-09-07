import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost-light" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-green text-white hover:bg-brand-green-dark",
  secondary:
    "bg-transparent text-navy border-2 border-border hover:bg-soft-gray",
  "ghost-light":
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-navy",
  // Structural only — callers supply their own border/text color via className
  // (e.g. border-white/40, border-[#22c55e]/60) depending on the background it sits on.
  outline: "bg-transparent border-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-6 text-base",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  showArrow?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  showArrow = false,
  className,
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = clsx(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon}
      {children}
      {showArrow && <ArrowRight className="size-4" aria-hidden />}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
