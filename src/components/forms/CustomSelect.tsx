"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * A styled dropdown that stands in for a native <select> in the site's
 * forms. Native selects hand rendering to the OS on mobile (a dark,
 * inconsistent-looking sheet on iOS/Android) which clashes with the rest
 * of the form — this renders entirely in-page instead, matching every
 * other breakpoint and theme. Submits via a hidden input so it works with
 * plain FormData the same way a real <select> would.
 */
export default function CustomSelect({
  name,
  label,
  values,
  labels,
  defaultValue,
  placeholder,
  required = false,
  icon,
}: {
  name: string;
  label: string;
  values: readonly string[];
  labels: readonly string[];
  defaultValue?: string;
  placeholder: string;
  required?: boolean;
  icon?: ReactNode;
}) {
  const { t } = useLanguage();
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // A type-to-filter box only earns its keep on longer lists (e.g. Country)
  // — a handful of options is faster to just scan by eye.
  const searchable = values.length > 6;

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !searchable) return;
    // Focus after the dropdown has actually mounted.
    const id = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, searchable]);

  const selectedIndex = values.indexOf(value);
  const selectedLabel = selectedIndex >= 0 ? labels[selectedIndex] : null;

  const query = search.trim().toLowerCase();
  const visibleIndices = values
    .map((_, i) => i)
    .filter((i) => !query || labels[i].toLowerCase().includes(query) || values[i].toLowerCase().includes(query));

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-brand-green">*</span>}
      </label>
      <div ref={rootRef} className="relative">
        {/* Deliberately not `required` — a hidden input can't be focused,
            so the browser's native validation would silently block submit
            with no visible feedback. Required CustomSelects are validated
            manually in the parent form's submit handler instead. */}
        <input type="hidden" name={name} value={value} />
        <button
          type="button"
          onClick={() =>
            setOpen((v) => {
              const next = !v;
              if (next) setSearch("");
              return next;
            })
          }
          aria-haspopup="listbox"
          aria-expanded={open}
          className={clsx(
            "flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-white py-2.5 text-left text-base text-charcoal outline-none transition-colors focus:border-brand-blue sm:text-sm",
            icon ? "pl-3.5 pr-3.5" : "px-4"
          )}
        >
          {icon && <span className="shrink-0 text-slate/40 [&>svg]:size-4">{icon}</span>}
          <span className={clsx("flex-1 truncate", !selectedLabel && "text-slate/40")}>
            {selectedLabel ?? placeholder}
          </span>
          <ChevronDown className={clsx("size-4 shrink-0 text-slate/40 transition-transform", open && "rotate-180")} aria-hidden />
        </button>

        {open && (
          <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
            {searchable && (
              <div className="relative border-b border-border p-2">
                <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-slate/40" aria-hidden />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={t.forms.searchPlaceholder}
                  className="w-full rounded-lg border border-border py-2 pl-9 pr-3 text-base text-charcoal outline-none focus:border-brand-blue sm:text-sm"
                />
              </div>
            )}
            <ul role="listbox" className="scrollbar-thin max-h-60 overflow-y-auto py-1">
              {visibleIndices.length === 0 && (
                <li className="px-3.5 py-2.5 text-sm text-slate/50">{t.forms.noMatches}</li>
              )}
              {visibleIndices.map((i) => {
                const v = values[i];
                const active = v === value;
                return (
                  <li key={v}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setValue(v);
                        setOpen(false);
                      }}
                      className={clsx(
                        "flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium transition-colors",
                        active ? "bg-brand-green/10 text-brand-green-dark" : "text-navy hover:bg-soft-gray"
                      )}
                    >
                      <span className="flex-1">{labels[i]}</span>
                      {active && <Check className="size-4 shrink-0" aria-hidden />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
