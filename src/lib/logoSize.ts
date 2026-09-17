/**
 * Optically equal logo sizes.
 *
 * Giving every logo the same width makes a square mark look huge next to a
 * long wordmark; the same height does the reverse. Giving each the same
 * *area* is what makes a set of logos read as one size: for a logo whose
 * drawn content is `ratio` times wider than tall, width = u·√ratio and
 * height = u/√ratio, where u is the side of a square logo of that area.
 *
 * `ratio` has to describe the drawn content, not the file — partner logo
 * files are trimmed of empty margins so the two match (see PARTNERS).
 */
export function equalAreaFactors(ratio: number) {
  const root = Math.sqrt(ratio);
  return { width: root, height: 1 / root };
}

/**
 * Equal area for a logo inside a diamond tile, as fractions of the tile's
 * diagonal. An upright box fits inside a diamond only while its width plus
 * its height stays under the diagonal, so a very long wordmark is scaled
 * below equal area until it fits (`maxSpan` leaves a margin to the edges).
 */
export function diamondLogoFactors(ratio: number, unit = 0.33, maxSpan = 0.82) {
  const { width, height } = equalAreaFactors(ratio);
  const k = Math.min(unit, maxSpan / (width + height));
  return { width: k * width, height: k * height };
}
