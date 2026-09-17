"use client";

import { PARTNERS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { diamondLogoFactors } from "@/lib/logoSize";

const MAX_PER_ROW = 5;

/**
 * Row lengths for the diamond wall, alternating one short and one long row
 * (4-5-4 for 13 partners) so the rows interlock. Tries starting with either
 * kind and keeps the one whose last row comes out complete; when neither
 * does, the last row simply holds whatever is left.
 */
function diamondRows(count: number, max: number): number[] {
  function build(startShort: boolean) {
    const rows: number[] = [];
    let left = count;
    let short = startShort;
    let lastFull = true;
    while (left > 0) {
      const length = short ? max - 1 : max;
      const take = Math.min(length, left);
      lastFull = take === length;
      rows.push(take);
      left -= take;
      short = !short;
    }
    return { rows, lastFull };
  }
  const shortFirst = build(true);
  const longFirst = build(false);
  return shortFirst.lastFull || !longFirst.lastFull ? shortFirst.rows : longFirst.rows;
}

/**
 * Tile positions on a diamond lattice, in half-steps: a tile may sit only
 * where (column + row) has one fixed parity, which is what guarantees that
 * neighbouring diamonds interlock instead of overlapping — for any partner
 * count, including a short leftover row, which is nudged half a step when
 * centring it would break the parity.
 */
function latticePositions(rows: number[], max: number) {
  const lastColumn = 2 * max - 2;
  const parity = (max - rows[0]) % 2;
  const positions: { row: number; column: number }[] = [];
  rows.forEach((length, row) => {
    let start = max - length;
    if ((start + row) % 2 !== parity) {
      start = start + 1 + 2 * (length - 1) <= lastColumn ? start + 1 : Math.max(0, start - 1);
    }
    for (let i = 0; i < length; i++) positions.push({ row, column: start + 2 * i });
  });
  return positions;
}

/**
 * Desktop partner wall: every partner visible at once as a tile in an
 * interlocking diamond pattern, with no animation to wait for.
 *
 * Each tile is two siblings in an upright cell. The link is the rotated
 * square itself, so its hit area is the diamond — not the cell, whose
 * corners overlap the neighbouring tiles. The logo is a separate upright
 * layer above it that ignores the pointer, sized to the same optical area as
 * every other logo (see diamondLogoFactors).
 *
 * The logo must not live inside the rotated link: browsers grow the
 * scrollable-overflow box at every rotated level, so a counter-rotated logo
 * layer nested in the link made the rightmost tile count as roughly half a
 * cell wider than it looks, and the whole page scrolled sideways.
 */
export default function PartnersDiamond() {
  const { t } = useLanguage();
  const rows = diamondRows(PARTNERS.length, MAX_PER_ROW);
  const positions = latticePositions(rows, MAX_PER_ROW);
  const halfStep = "(var(--cell) + var(--gap)) / 2";

  return (
    <div
      className="relative mx-auto [--cell:180px] [--gap:10px] xl:[--cell:216px] xl:[--gap:12px]"
      style={{
        width: `calc(${halfStep} * ${2 * MAX_PER_ROW - 2} + var(--cell))`,
        height: `calc(${halfStep} * ${rows.length - 1} + var(--cell))`,
      }}
    >
      {PARTNERS.map((partner, i) => {
        const { row, column } = positions[i];
        const logo = diamondLogoFactors(partner.ratio);
        const name = t.partners[i].name;
        return (
          <div
            key={partner.name}
            className="group pointer-events-none absolute size-[var(--cell)]"
            style={{ left: `calc(${halfStep} * ${column})`, top: `calc(${halfStep} * ${row})` }}
          >
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${name} website`}
              title={name}
              className="pointer-events-auto absolute inset-[14.645%] rotate-45 rounded-2xl bg-[#F8FAFB] ring-1 ring-slate-100 transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {/* Decorative here: the link beside it already carries the name. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt=""
                decoding="async"
                className="object-contain transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
                style={{
                  width: `calc(var(--cell) * ${logo.width.toFixed(4)})`,
                  height: `calc(var(--cell) * ${logo.height.toFixed(4)})`,
                }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}
