"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Hash, X, type LucideIcon } from "lucide-react";

export type SummaryRow = { label: string; value: string; icon?: LucideIcon };

// One form field in the summary.
export type SummaryField = {
  name: string;
  label: string;
  icon?: LucideIcon;
  /** For a select: the submitted values and the labels the visitor saw. */
  options?: readonly [readonly string[], readonly string[]];
};

// Summary rows in field order, skipping empty ones.
export function summarize(data: FormData, fields: SummaryField[]): SummaryRow[] {
  const rows: SummaryRow[] = [];
  for (const { name, label, icon, options } of fields) {
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
    rows.push({ label, value, icon });
  }
  return rows;
}

const EASE = [0.22, 1, 0.36, 1] as const;

// The confirmation content: what was sent and what happens next.
export default function SubmissionSuccess({
  title,
  subtitle,
  sentBadge,
  referenceLabel,
  reference,
  detailsTitle,
  rows,
  resetLabel,
  closeLabel,
  onReset,
  onClose,
}: {
  title: string;
  subtitle: string;
  sentBadge: string;
  referenceLabel: string;
  reference: string;
  detailsTitle: string;
  rows: SummaryRow[];
  resetLabel: string;
  closeLabel: string;
  onReset: () => void;
  onClose: () => void;
}) {
  const hasRows = rows.length > 0;

  // White base under the gradient, so the form behind doesn't show through.
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="relative overflow-hidden rounded-3xl bg-white bg-gradient-to-br from-brand-green/10 via-white to-white shadow-2xl ring-1 ring-brand-green/15"
      role="status"
    >
      {/* Green wash behind the leaves. It belongs to the panel, not to the
          scrolling content, so it stays put when the content scrolls. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-brand-green/25 blur-[72px]" />
        <div className="absolute bottom-0 left-0 h-56 w-2/3 bg-gradient-to-tr from-brand-green/20 via-brand-green/5 to-transparent" />
      </div>

      {/* The scrolling happens in here, inside the panel's rounded corners,
          and without a visible scrollbar. */}
      <div className="@container/panel scrollbar-none relative max-h-[90dvh] overflow-y-auto overflow-x-hidden p-5 sm:p-8 [@media(max-height:780px)]:!p-5">
        <div
          className={
            hasRows
              ? "relative grid gap-6 @lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] @lg:items-center @lg:gap-x-10"
              : "relative grid gap-6"
          }
        >
          <div className="flex flex-col items-start pr-10 @lg:pr-0">
            <SuccessMark />

            <span className="mt-4 inline-flex items-center rounded-full bg-brand-green/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-green-dark">
              {sentBadge}
            </span>

            <h3 className="mt-3 text-2xl font-bold leading-tight text-navy [text-wrap:balance] @lg:text-3xl">
              {title}
            </h3>
            <p className="mt-2 max-w-sm text-slate">{subtitle}</p>

            {/* nowrap keeps the reference code on one line. */}
            <div className="mt-5 flex w-full max-w-sm items-center gap-3 rounded-2xl bg-brand-green/10 px-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/80 text-brand-green-dark">
                <Hash className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-brand-green-dark/80">{referenceLabel}</span>
                <span className="block whitespace-nowrap font-mono text-base font-bold tracking-tight text-navy">
                  {reference}
                </span>
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onReset}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-brand-green px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {resetLabel}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate transition-colors hover:bg-white/70 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-white/80 text-slate">
                  <X className="size-4" aria-hidden />
                </span>
                {closeLabel}
              </button>
            </div>

            {/* Decoration, hidden on short windows. */}
            {hasRows && <Leaves className="mt-6 hidden @lg:block [@media(max-height:780px)]:!hidden" />}
          </div>

          {hasRows && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
              className="@container flex min-h-0 flex-col rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green-dark">
                  <FileText className="size-5" aria-hidden />
                </span>
                <h4 className="text-lg font-bold text-navy">{detailsTitle}</h4>
              </div>

              <dl className="mt-3 divide-y divide-border">
                {rows.map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE, delay: 0.25 + i * 0.04 }}
                      className="flex items-start gap-3 py-3"
                    >
                      {Icon && (
                        <Icon className="mt-0.5 size-4 shrink-0 text-slate/40" aria-hidden />
                      )}
                      <div className="min-w-0 flex-1">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate/60">{row.label}</dt>
                        <dd className="mt-0.5 whitespace-pre-wrap text-sm text-navy [overflow-wrap:anywhere]">
                          {row.value}
                        </dd>
                      </div>
                    </motion.div>
                  );
                })}
              </dl>
            </motion.div>
          )}
        </div>
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
