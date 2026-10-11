import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import MaskIcon from "./MaskIcon";

// Custom icons per process step. Steps without one use the lucide icon passed
// in.
const STEP_IMAGES: Record<string, string> = {
  collection: "/images/icons/trimmed/collection2-bg.png",
  sorting: "/images/icons/trimmed/sorting.png",
  drying: "/images/icons/trimmed/drying.png",
  "packing & loading": "/images/icons/trimmed/packing.png",
  packing: "/images/icons/trimmed/packing.png",
};

export default function StepIcon({
  name,
  fallback: Fallback,
  className,
}: {
  name: string;
  fallback: LucideIcon;
  className?: string;
}) {
  const src = STEP_IMAGES[name.trim().toLowerCase()];
  if (src) return <MaskIcon src={src} className={className} />;
  // A thinner stroke, to match the custom icons.
  return <Fallback className={clsx("stroke-[0.75] text-current", className)} aria-hidden />;
}
