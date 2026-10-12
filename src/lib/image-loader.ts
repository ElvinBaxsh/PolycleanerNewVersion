"use client";

import { imageVariant } from "./image-variants";

// next/image asks this for the URL of every width it puts in a srcset.
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  return imageVariant(src, width);
}
