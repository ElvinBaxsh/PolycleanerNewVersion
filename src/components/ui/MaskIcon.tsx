import { clsx } from "clsx";
import { ICON_WIDTH, imageVariant } from "@/lib/image-variants";

// Draws a PNG icon in one flat colour by using it as a CSS mask.
export default function MaskIcon({ src, className }: { src: string; className?: string }) {
  const url = `url(${imageVariant(src, ICON_WIDTH)})`;
  return (
    <span
      aria-hidden
      // The colour comes from the parent's text colour.
      className={clsx("block bg-current", className)}
      style={{
        WebkitMaskImage: url,
        maskImage: url,
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
