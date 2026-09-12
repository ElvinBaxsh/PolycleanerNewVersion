"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, FileText } from "lucide-react";

export type SummaryRow = { label: string; value: string };

/** One field of a form, for turning its submitted data into summary rows. */
export type SummaryField = {
  name: string;
  label: string;
  /** For a select: its submitted values and the labels the visitor saw.
   *  The form posts the English constant (what the email and the server
   *  expect); the summary shows the visitor's own language instead. */
  options?: readonly [readonly string[], readonly string[]];
};

/**
 * Rows for the "Inquiry Details" card, in the order `fields` lists them,
 * skipping anything left empty. File inputs collapse to their file names.
 */
export function summarize(data: FormData, fields: SummaryField[]): SummaryRow[] {
  const rows: SummaryRow[] = [];
  for (const { name, label, options } of fields) {
    const entries = data.getAll(name);
    const files = entries.filter((v): v is File => v instanceof File && v.size > 0);
    let value = files.length
      ? files.map((file) => file.name).join(", ")
      : entries.filter((v): v is string => typeof v === "string").join(", ").trim();
    if (!value) continue;
    if (options) {
      const i = options[0].indexOf(value);
      if (i !== -1 && options[1][i]) value = options[1][i];
    }
    rows.push({ label, value });
  }
  return rows;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The confirmation shown in place of a form once it has been sent: the
 * acknowledgement on one side, what was sent on the other.
 *
 * Laid out by the width of the form it replaces (a container query), not
 * the viewport — the same component sits in the wide contact card, the
 * inquiry modal and the narrow Documents sidebar. Two columns from 32rem
 * (the contact card on desktop and the modal both clear it); stacked below
 * that, with the "send another" button after the details so they're read
 * first. Container queries measure the content box, so the panel's own
 * padding counts against that threshold — 36rem missed the contact card.
 */
export default function SubmissionSuccess({
  title,
  subtitle,
  pill,
  detailsTitle,
  rows,
  resetLabel,
  onReset,
}: {
  title: string;
  subtitle: string;
  pill: string;
  detailsTitle: string;
  rows: SummaryRow[];
  resetLabel: string;
  onReset: () => void;
}) {
  const hasRows = rows.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="@container/panel relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green/[0.07] via-white to-white p-5 ring-1 ring-brand-green/15 sm:p-7"
      role="status"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-24 size-72 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        className={
          hasRows
            ? "relative grid gap-6 @lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @lg:items-start @lg:gap-x-8"
            : "relative grid gap-6"
        }
      >
        {/* The acknowledgement and the way out stay together, so "send
            another" sits under the message instead of being pushed to the
            bottom of however long the details list happens to be. */}
        <div className="flex flex-col items-start">
          <SuccessMark />
          <h3 className="mt-5 text-2xl font-bold leading-tight text-navy [text-wrap:balance]">{title}</h3>
          <p className="mt-2 text-slate">{subtitle}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3.5 py-1.5 text-sm font-semibold text-brand-green-dark">
            <Clock className="size-4" aria-hidden />
            {pill}
          </span>
          {hasRows && <Leaves className="mt-6 hidden @lg:block" />}
          <button
            type="button"
            onClick={onReset}
            className="mt-6 inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-brand-green px-5 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-brand-green/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {resetLabel}
          </button>
        </div>

        {hasRows && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
            className="@container flex min-h-0 flex-col rounded-xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="flex shrink-0 items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green-dark">
                <FileText className="size-5" aria-hidden />
              </span>
              <h4 className="text-lg font-bold text-navy">{detailsTitle}</h4>
            </div>
            {/* Side by side, a long list would otherwise stretch the panel
                past the window — a sample request sends ten fields — and
                push the button out of view. The list scrolls inside its own
                card instead, under a heading that stays put. Only from @lg:
                stacked on a phone it just flows down the page. */}
            <dl className="scrollbar-thin mt-2 divide-y divide-border @lg/panel:max-h-80 @lg/panel:overflow-y-auto">
              {rows.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.25 + i * 0.04 }}
                  className="grid gap-0.5 py-2.5 @sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] @sm:gap-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate/60">{row.label}</dt>
                  <dd className="text-sm text-navy [overflow-wrap:anywhere]">{row.value}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/** A ring that draws itself, then the tick. */
function SuccessMark() {
  return (
    <div className="relative flex size-24 shrink-0 items-center justify-center">
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-brand-green/10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <motion.svg
        viewBox="0 0 64 64"
        className="relative size-16"
        aria-hidden
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
      >
        <circle cx="32" cy="32" r="28" fill="white" />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="var(--color-brand-green)"
          strokeWidth="5"
          transform="rotate(-90 32 32)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        />
        <motion.path
          d="M20 33 L28 41 L44 24"
          fill="none"
          stroke="var(--color-brand-green-dark)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.55 }}
        />
      </motion.svg>
    </div>
  );
}

/** Two leaves — the brand's "from waste to value" motif, drawn inline. */
function Leaves({ className }: { className?: string }) {
  const id = useId();
  return (
    <motion.svg
      viewBox="0 0 120 80"
      width="112"
      height="75"
      aria-hidden
      className={className}
      style={{ transformOrigin: "50% 100%" }}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-brand-green)" stopOpacity="0.75" />
          <stop offset="1" stopColor="var(--color-brand-green-dark)" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-brand-green)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--color-brand-green-dark)" />
        </linearGradient>
      </defs>
      <path d="M58 78 C30 72 10 46 14 10 C44 16 62 42 58 78 Z" fill={`url(#${id}-a)`} />
      <path d="M62 78 C90 72 110 46 106 10 C76 16 58 42 62 78 Z" fill={`url(#${id}-b)`} />
      <path d="M57 74 C47 56 33 36 19 17" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
      <path d="M63 74 C73 56 87 36 101 17" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
    </motion.svg>
  );
}
