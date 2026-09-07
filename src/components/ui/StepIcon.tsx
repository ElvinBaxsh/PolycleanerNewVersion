import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import MaskIcon from "./MaskIcon";

// Custom line-art icons supplied in public/images/icons, keyed by process
// step name. Steps without one fall back to the lucide icon passed in.
// Both paths render in the same colour and box size so a row of steps
// looks uniform.
// The /trimmed copies have their transparent padding cropped away, so the
// glyph fills the box like an SVG icon does instead of sitting small inside it.
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
  // Washing/Quality Control have no supplied PNG, so they fall back to a
  // lucide icon — but lucide's default stroke-width reads noticeably
  // bolder than the hand-drawn PNGs (which were thinned to match Sorting).
  // stroke-[0.75] brings the two families to the same visual line weight
  // at every size this renders at.
  return <Fallback className={clsx("stroke-[0.75] text-current", className)} aria-hidden />;
}
