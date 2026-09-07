"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { PRODUCT_INTERESTS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  company: "Company Name",
  country: "Country",
  email: "Email",
  phone: "Phone / WhatsApp",
  productInterest: "Product Interest",
  monthlyVolume: "Monthly Volume",
  message: "Message",
};

export default function InquiryForm({
  defaultType,
  defaultInterest,
}: {
  defaultType?: string;
  defaultInterest?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries()) as Record<string, string>;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      console.log("[InquiryForm] Submitted values:", payload);
      setSubmitted(payload);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success" && submitted) {
    return (
      <div className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <CheckCircle2 className="size-10 text-brand-green" />
          <h3 className="text-lg font-bold text-navy">Thank you — your inquiry was sent.</h3>
          <p className="text-sm text-slate">Our team will get back to you within 24 hours.</p>
        </div>

        <dl className="mt-6 space-y-2 rounded-xl border border-border bg-white p-4">
          {Object.entries(submitted)
            .filter(([key, value]) => key !== "website" && key !== "inquiryType" && value)
            .map(([key, value]) => (
              <div key={key} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate/60">
                  {FIELD_LABELS[key] ?? key}
                </dt>
                <dd className="text-sm font-medium text-navy sm:text-right">{value}</dd>
              </div>
            ))}
        </dl>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSubmitted(null);
          }}
          className="mx-auto mt-5 block text-sm font-semibold text-brand-blue underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field — hidden from real users, bots tend to fill every input */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      {/* Carries which CTA the visitor came from (Request Offer/Sample/TAROPAK/etc.) without showing a field for it */}
      <input type="hidden" name="inquiryType" value={defaultType ?? "general"} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required placeholder="Your full name" />
        <Field label="Company Name" name="company" required placeholder="Your company name" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Country" name="country" required placeholder="Select your country" />
        <Field label="Email" name="email" type="email" required placeholder="name@company.com" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" name="phone" required placeholder="+00 000 000 0000" />
        <SelectField
          label="Product Interest"
          name="productInterest"
          defaultValue={defaultInterest}
          options={PRODUCT_INTERESTS}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Monthly Volume" name="monthlyVolume" placeholder="e.g. 20-40 MT" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          Message <span className="text-brand-green">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your requirements..."
          className="w-full rounded-lg border border-border px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-slate">
        <input type="checkbox" required className="mt-0.5" />
        I agree to the processing of my personal data in accordance with the Privacy Policy.
      </label>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="size-4" /> {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
        Send Message
      </button>
      <p className="text-xs text-slate/60">Your information is secure and will only be used to respond to your inquiry.</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-brand-green">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  optionLabels,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  optionLabels?: Record<string, string>;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {optionLabels?.[opt] ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
