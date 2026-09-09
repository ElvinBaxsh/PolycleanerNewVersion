"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  User,
  Mail,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Check,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The buyer-document request form — shared by the Documents page sidebar
 * (rendered inline) and the "Can't find what you need?" / "Request Buyer
 * Pack" triggers elsewhere on the site (rendered inside the modal from
 * DocumentRequestModalProvider). One form, one place its fields are defined.
 */
export default function DocumentRequestForm({ onCancel }: { onCancel?: () => void }) {
  const { t, locale } = useLanguage();
  const f = t.documentRequestForm;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  function toggleType(type: string) {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      ...Object.fromEntries(data.entries()),
      sourcePage: window.location.href,
      userLanguage: locale.toUpperCase(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || t.forms.genericError);
      }

      setStatus("success");
      form.reset();
      setSelectedTypes([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : t.forms.genericError);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-2 rounded-2xl border border-brand-green/30 bg-brand-green/5 p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        >
          <CheckCircle2 className="size-8 text-brand-green" />
        </motion.div>
        <p className="text-sm font-bold text-navy">{f.successTitle}</p>
        <p className="text-xs text-slate">{f.successDescription}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border-2 border-border px-5 text-xs font-semibold text-navy transition-colors hover:bg-soft-gray"
        >
          {f.sendAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white"
    >
      {/* Yaşıl üst haşiyə */}
      <div className="h-1 shrink-0 bg-brand-green" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
        <input type="hidden" name="inquiryType" value="documents" />

        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
            <FileText className="size-6" aria-hidden />
          </span>
          <h2 className="text-lg font-bold text-navy">{f.heading}</h2>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate">
          {f.subtext}
        </p>

        <div className="mt-5 flex flex-1 flex-col gap-4">
          <FormField label={f.fullName} name="fullName" required placeholder={f.fullNamePlaceholder} icon={User} />
          <FormField label={f.company} name="company" required placeholder={f.companyPlaceholder} icon={Building2} />
          <FormField label={f.email} name="email" type="email" required placeholder={f.emailPlaceholder} icon={Mail} />

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy">{f.documentTypeLabel}</label>
            <input type="hidden" name="documentType" value={selectedTypes.join(", ")} />
            <div className="flex flex-wrap gap-2">
              {f.documentTypeOptions.map((type) => {
                const isSelected = selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    aria-pressed={isSelected}
                    className={clsx(
                      "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      isSelected
                        ? "border-brand-green bg-brand-green/10 text-brand-green-dark"
                        : "border-border bg-white text-slate hover:border-brand-blue/40"
                    )}
                  >
                    {isSelected && <Check className="size-3.5" aria-hidden />}
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
              {f.notesLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder={f.notesPlaceholder}
              className="w-full flex-1 resize-none rounded-lg border border-border px-3.5 py-2.5 text-base text-charcoal outline-none transition-colors focus:border-brand-blue sm:text-sm"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="mt-3 flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="size-4 shrink-0" /> {errorMessage}
          </p>
        )}

        <div className={onCancel ? "mt-5 flex flex-col-reverse gap-3 sm:flex-row" : ""}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-border px-5 text-xs font-bold uppercase tracking-wider text-navy transition-colors hover:bg-soft-gray sm:w-auto sm:flex-1"
            >
              {t.forms.cancel}
            </button>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className={
              onCancel
                ? "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70 sm:w-auto sm:flex-1"
                : "mt-5 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70"
            }
          >
            {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            {f.submit}
          </button>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate/60">
          <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
          {f.footnote}
        </p>
      </div>
    </form>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  icon: Icon,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  icon?: LucideIcon;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-brand-green">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate/50" aria-hidden />
        )}
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={clsx(
            "w-full rounded-lg border border-border py-2.5 text-base text-charcoal outline-none transition-colors focus:border-brand-blue sm:text-sm",
            Icon ? "pl-9 pr-3.5" : "px-3.5"
          )}
        />
      </div>
    </div>
  );
}
