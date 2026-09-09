"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import { clsx } from "clsx";

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
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const selectedIndex = values.indexOf(value);
  const selectedLabel = selectedIndex >= 0 ? labels[selectedIndex] : null;

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
          onClick={() => setOpen((v) => !v)}
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
          <ul
            role="listbox"
            className="scrollbar-thin absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-y-auto rounded-xl border border-border bg-white py-1 shadow-lg"
          >
            {values.map((v, i) => {
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
        )}
      </div>
    </div>
  );
}
