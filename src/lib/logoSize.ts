// Equal-area logo sizes: width = u·√ratio, height = u/√ratio. The same width or
// the same height makes logos look uneven; the same area doesn't. `ratio` is
// the width ÷ height of the trimmed logo.
export function equalAreaFactors(ratio: number) {
  const root = Math.sqrt(ratio);
  return { width: root, height: 1 / root };
}

// The same for a logo inside a diamond tile. Very long logos are scaled down to
// fit.
export function diamondLogoFactors(ratio: number, unit = 0.33, maxSpan = 0.82) {
  const { width, height } = equalAreaFactors(ratio);
  const k = Math.min(unit, maxSpan / (width + height));
  return { width: k * width, height: k * height };
}
