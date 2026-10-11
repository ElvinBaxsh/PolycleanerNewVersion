import { clsx } from "clsx";

// Draws a PNG icon in one flat colour by using it as a CSS mask.
export default function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      // The colour comes from the parent's text colour.
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
