import sizes from "./image-sizes.json";
import manifest from "./image-variants.json";

// The resized copies that scripts/build-image-variants.mjs made for each
// photo: [hash of the file, its original width].
const VARIANTS = manifest as unknown as Record<string, [string, number]>;
const WIDTHS = [...sizes.imageSizes, ...sizes.deviceSizes];

// For icons drawn as a plain <img> or a CSS mask, up to about 100px on
// screen. Large enough that fine line art stays sharp on 2x and 3x screens.
export const ICON_WIDTH = 256;

// The smallest ready-made copy of `src` that is at least `width` wide.
// Anything without copies (SVGs, a photo added without running the script)
// is returned as it is, and so is everything in `next dev` and in builds
// made without the copies (see next.config.ts).
export function imageVariant(src: string, width: number): string {
  if (process.env.NEXT_PUBLIC_IMAGE_VARIANTS !== "1") return src;

  const entry = VARIANTS[src];
  if (!entry) return src;

  const [hash, original] = entry;
  const fit = WIDTHS.find((w) => w >= width && w < original) ?? original;
  return `/_img${src.replace(/\.\w+$/, "")}.${hash}-${fit}.webp`;
}
