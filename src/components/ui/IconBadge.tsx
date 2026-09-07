import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";

export default function IconBadge({
  icon: Icon,
  tone = "blue",
  size = "md",
}: {
  icon: LucideIcon;
  tone?: "blue" | "green" | "navy";
  size?: "sm" | "md" | "lg";
}) {
  const tones = {
    blue: "bg-brand-blue/10 text-brand-blue",
    green: "bg-brand-green/10 text-brand-green-dark",
    navy: "bg-navy/5 text-navy",
  } as const;

  const sizes = {
    sm: "size-14 rounded-xl [&>svg]:size-7",
    md: "size-16 rounded-xl [&>svg]:size-8",
    lg: "size-16 rounded-full [&>svg]:size-8",
  } as const;

  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center justify-center",
        tones[tone],
        sizes[size]
      )}
    >
      <Icon aria-hidden />
    </span>
  );
}
