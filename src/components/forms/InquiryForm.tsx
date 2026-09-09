"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PRODUCT_INTERESTS, SAMPLE_TYPE_OPTIONS, OFFER_APPLICATION_OPTIONS } from "@/lib/constants";
import CustomSelect from "./CustomSelect";

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm({
  defaultType,
  defaultInterest,
  onCancel,
}: {
  defaultType?: string;
  defaultInterest?: string;
  onCancel?: () => void;
}) {
  const { t, locale } = useLanguage();
  const f = t.forms;
  const isSample = defaultType === "sample";
  const FIELD_LABELS: Record<string, string> = {
    fullName: f.fullName,
    company: f.companyName,
    country: f.country,
    email: f.email,
    phone: f.phone,
    productInterest: f.productInterest,
    monthlyVolume: f.monthlyVolume,
    sampleType: f.sampleType,
    application: f.application,
    deliveryDestination: f.deliveryDestination,
    deliveryAddress: f.deliveryAddress,
    courierAccount: f.courierAccount,
    message: f.message,
  };

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<Record<string, string | boolean> | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      ...Object.fromEntries(data.entries()),
      consent: data.get("consent") === "on",
      sourcePage: window.location.href,
      userLanguage: locale.toUpperCase(),
    } as Record<string, string | boolean>;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || f.genericError);
      }

      console.log("[InquiryForm] Submitted values:", payload);
      setSubmitted(payload);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : f.genericError);
    }
  }

  if (status === "success" && submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-6 sm:p-8"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          >
            <CheckCircle2 className="size-10 text-brand-green" />
          </motion.div>
          <h3 className="text-lg font-bold text-navy">{f.thankYouInquiry}</h3>
          <p className="text-sm text-slate">{f.thankYouInquirySub}</p>
        </div>

        <dl className="mt-6 space-y-2 rounded-xl border border-border bg-white p-4">
          {Object.entries(submitted)
            .filter(
              ([key, value]) =>
                !["website", "inquiryType", "consent", "sourcePage", "userLanguage"].includes(key) && value
            )
            .map(([key, value]) => (
              <div key={key} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate/60">
                  {FIELD_LABELS[key] ?? key}
                </dt>
                <dd className="text-sm font-medium text-navy sm:text-right">{String(value)}</dd>
              </div>
            ))}
        </dl>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSubmitted(null);
          }}
          className="mx-auto mt-5 inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border-2 border-border px-6 text-sm font-semibold text-navy transition-colors hover:bg-soft-gray"
        >
          {f.sendAnotherInquiry}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.fullName} name="fullName" required placeholder={f.fullNamePlaceholder} />
        <Field label={f.companyName} name="company" required placeholder={f.companyNamePlaceholder} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.country} name="country" required placeholder={f.countryPlaceholder} />
        <Field label={f.email} name="email" type="email" required placeholder={f.emailPlaceholder} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.phone} name="phone" required placeholder={f.phonePlaceholder} />
        <CustomSelect
          label={f.productInterest}
          name="productInterest"
          defaultValue={defaultInterest}
          values={PRODUCT_INTERESTS}
          labels={f.productInterestOptions}
          placeholder={f.selectOption}
        />
      </div>

      {isSample ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CustomSelect
              label={f.sampleType}
              name="sampleType"
              values={SAMPLE_TYPE_OPTIONS}
              labels={f.sampleTypeOptions}
              placeholder={f.selectSampleType}
            />
            <CustomSelect
              label={f.application}
              name="application"
              values={OFFER_APPLICATION_OPTIONS}
              labels={f.offerApplicationOptions}
              placeholder={f.selectApplication}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label={f.deliveryDestination}
              name="deliveryDestination"
              placeholder={f.deliveryDestinationPlaceholder}
            />
            <Field label={f.deliveryAddress} name="deliveryAddress" placeholder={f.deliveryAddressPlaceholder} />
          </div>

          <Field
            label={`${f.courierAccount} ${f.messageOptional}`}
            name="courierAccount"
            placeholder={f.courierAccountPlaceholder}
          />
        </>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={f.monthlyVolume} name="monthlyVolume" placeholder={f.monthlyVolumePlaceholder} />
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          {f.message} <span className="text-brand-green">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={f.messagePlaceholder}
          className="w-full rounded-lg border border-border px-4 py-3 text-base text-charcoal outline-none transition-colors focus:border-brand-blue sm:text-sm"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-slate">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        {f.consentPrivacy}
      </label>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="size-4" /> {errorMessage}
        </p>
      )}

      <div className={onCancel ? "flex flex-col-reverse gap-3 sm:flex-row" : ""}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-border px-6 text-sm font-semibold text-navy transition-colors hover:bg-soft-gray sm:w-auto sm:flex-1"
          >
            {f.cancel}
          </button>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className={
            onCancel
              ? "inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70 sm:w-auto sm:flex-1"
              : "inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70 sm:w-auto sm:px-8"
          }
        >
          {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
          {f.sendMessage}
        </button>
      </div>
      <p className="text-xs text-slate/60">{f.secureNote}</p>
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
        className="w-full rounded-lg border border-border px-4 py-2.5 text-base text-charcoal outline-none transition-colors focus:border-brand-blue sm:text-sm"
      />
    </div>
  );
}
