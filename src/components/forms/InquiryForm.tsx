"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  PRODUCT_INTERESTS,
  SAMPLE_TYPE_OPTIONS,
  OFFER_APPLICATION_OPTIONS,
  PARTNERSHIP_INTEREST_OPTIONS,
  MAX_UPLOAD_FILES,
  MAX_UPLOAD_FILE_SIZE,
} from "@/lib/constants";
import CustomSelect from "./CustomSelect";
import FileUpload from "./FileUpload";

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
  const isPartner = defaultType === "partner";
  const FIELD_LABELS: Record<string, string> = {
    fullName: f.fullName,
    company: isPartner ? f.companyOrganisation : f.companyName,
    country: f.country,
    city: f.city,
    email: f.email,
    phone: f.phone,
    productInterest: f.productInterest,
    monthlyVolume: f.monthlyVolume,
    sampleType: f.sampleType,
    application: f.application,
    deliveryDestination: f.deliveryDestination,
    deliveryAddress: f.deliveryAddress,
    courierAccount: f.courierAccount,
    attachments: f.attachments,
    partnershipInterest: f.partnershipInterest,
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

    // File objects can't survive JSON.stringify, so the whole form now
    // submits as multipart/form-data (the server accepts both that and
    // plain JSON — see /api/contact) rather than switching on whether an
    // attachment is actually present.
    const files = data.getAll("attachments").filter((v): v is File => v instanceof File && v.size > 0);
    if (files.length > MAX_UPLOAD_FILES) {
      setStatus("error");
      setErrorMessage(f.tooManyFiles);
      return;
    }
    const oversized = files.find((file) => file.size > MAX_UPLOAD_FILE_SIZE);
    if (oversized) {
      setStatus("error");
      setErrorMessage(f.fileTooLarge);
      return;
    }

    // The Partner form doesn't mark email/phone individually required (either
    // one is enough), so that combined rule is enforced here instead.
    // partnershipInterest is a CustomSelect (submits via a hidden input the
    // browser's native `required` can't focus/validate), so — same
    // established pattern as RequestOfferForm.tsx — it's checked manually
    // here too rather than relying on the server's rejection alone.
    if (isPartner) {
      const email = (data.get("email") as string | null)?.trim();
      const phone = (data.get("phone") as string | null)?.trim();
      if (!email && !phone) {
        setStatus("error");
        setErrorMessage(f.emailOrPhoneNote);
        return;
      }
      if (!data.get("partnershipInterest")) {
        setStatus("error");
        setErrorMessage(f.requiredNote);
        return;
      }
    }

    data.set("consent", data.get("consent") === "on" ? "true" : "false");
    data.set("sourcePage", window.location.href);
    data.set("userLanguage", locale.toUpperCase());

    // A display-safe copy for the success-screen summary — File values
    // don't render sensibly, so they're collapsed to a filename list.
    const displayPayload: Record<string, string | boolean> = {};
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") displayPayload[key] = value;
    }
    if (files.length > 0) displayPayload.attachments = files.map((file) => file.name).join(", ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || f.genericError);
      }

      setSubmitted(displayPayload);
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

      {isPartner ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={f.fullName} name="fullName" required placeholder={f.fullNamePlaceholder} />
            <Field
              label={`${f.companyOrganisation} ${f.messageOptional}`}
              name="company"
              placeholder={f.companyNamePlaceholder}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={f.country} name="country" required placeholder={f.countryPlaceholder} />
            <Field label={f.city} name="city" required placeholder={f.cityPlaceholder} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={f.email} name="email" type="email" placeholder={f.emailPlaceholder} />
            <Field label={f.phone} name="phone" placeholder={f.phonePlaceholder} />
          </div>
          <p className="-mt-2 text-xs text-slate/60">{f.emailOrPhoneNote}</p>
          <CustomSelect
            label={f.partnershipInterest}
            name="partnershipInterest"
            values={PARTNERSHIP_INTEREST_OPTIONS}
            labels={f.partnershipInterestOptions}
            placeholder={f.selectPartnershipType}
            required
          />
        </>
      ) : (
        <>
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
        </>
      )}

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

          <FileUpload
            name="attachments"
            label={`${f.attachments} ${f.messageOptional}`}
            hint={f.attachmentsHint}
            chooseLabel={f.chooseFiles}
            tooManyMessage={f.tooManyFiles}
            tooLargeMessage={f.fileTooLarge}
          />
        </>
      ) : !isPartner ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={f.monthlyVolume} name="monthlyVolume" placeholder={f.monthlyVolumePlaceholder} />
        </div>
      ) : null}

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
          {status === "submitting" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
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
