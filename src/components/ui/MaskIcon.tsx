import { clsx } from "clsx";

/**
 * Renders a transparent PNG icon as a single flat brand colour using it as a
 * CSS mask: the PNG's alpha supplies the shape, `background-color` supplies
 * the colour. This makes the supplied line-art icons (which come in a mix
 * of black / green / blue) all look identical in colour and weight.
 */
export default function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      // bg-current: the colour comes from the parent's `text-*` class, exactly
      // like a lucide SVG does — so mixed PNG/SVG icons in one row can't drift.
      className={clsx("block bg-current", className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
