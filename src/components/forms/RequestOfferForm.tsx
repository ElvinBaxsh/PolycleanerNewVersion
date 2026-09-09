"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  Globe2,
  Mail,
  Phone,
  Package,
  BarChart3,
  Layers,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  OFFER_PRODUCT_INTEREST_OPTIONS,
  OFFER_VOLUME_OPTIONS,
  OFFER_APPLICATION_OPTIONS,
  COUNTRY_OPTIONS,
} from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CustomSelect from "./CustomSelect";

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestOfferForm({ onCancel }: { onCancel?: () => void }) {
  const { t, locale } = useLanguage();
  const f = t.forms;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    // CustomSelect submits via a hidden input, which the browser's native
    // required-field validation can't focus/scroll to — so the required
    // dropdowns (country, product interest) are checked here instead.
    if (!data.get("country") || !data.get("productInterest")) {
      setStatus("error");
      setErrorMessage(f.requiredNote);
      return;
    }

    const payload = {
      ...Object.fromEntries(data.entries()),
      consent: data.get("consent") === "on",
      sourcePage: window.location.href,
      userLanguage: locale.toUpperCase(),
    };

    trackEvent("request_offer_submit");

    try {
      const res = await fetch("/api/request-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || f.genericErrorContact);
      }

      setStatus("success");
      trackEvent("request_offer_success");
      form.reset();
    } catch (err) {
      setStatus("error");
      trackEvent("request_offer_error");
      setErrorMessage(err instanceof Error ? err.message : f.genericErrorContact);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/5 p-8 text-center sm:p-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        >
          <CheckCircle2 className="size-10 text-brand-green" />
        </motion.div>
        <h3 className="text-lg font-bold text-navy">
          {f.thankYouOffer}
        </h3>
        <p className="text-sm text-slate">
          {f.thankYouOfferSub}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border-2 border-border px-6 text-sm font-semibold text-navy transition-colors hover:bg-soft-gray"
        >
          {f.sendAnotherRequest}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <IconField icon={<User />} label={f.fullName} name="fullName" required placeholder="John Doe" />
        <IconField
          icon={<Building2 />}
          label={f.companyName}
          name="company"
          required
          placeholder={f.companyNamePlaceholder2}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CustomSelect
          icon={<Globe2 />}
          label={f.country}
          name="country"
          required
          placeholder={f.countryPlaceholder2}
          values={COUNTRY_OPTIONS}
          labels={COUNTRY_OPTIONS}
        />
        <IconField
          icon={<Mail />}
          label={f.emailAddress}
          name="email"
          type="email"
          required
          placeholder={f.emailPlaceholder}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <IconField
          icon={<Phone />}
          label={f.phone}
          name="phone"
          type="tel"
          required
          placeholder={f.phonePlaceholder2}
        />
        <CustomSelect
          icon={<Package />}
          label={f.productInterest}
          name="productInterest"
          required
          placeholder={f.selectProduct}
          values={OFFER_PRODUCT_INTEREST_OPTIONS}
          labels={f.offerProductInterestOptions}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CustomSelect
          icon={<BarChart3 />}
          label={f.requiredVolume}
          name="requiredVolume"
          placeholder={f.selectVolume}
          values={OFFER_VOLUME_OPTIONS}
          labels={f.offerVolumeOptions}
        />
        <CustomSelect
          icon={<Layers />}
          label={f.application}
          name="application"
          placeholder={f.selectApplication}
          values={OFFER_APPLICATION_OPTIONS}
          labels={f.offerApplicationOptions}
        />
      </div>

      <IconField
        icon={<MapPin />}
        label={f.deliveryDestination}
        name="deliveryDestination"
        placeholder={f.deliveryDestinationPlaceholder}
      />

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          {f.message} <span className="font-normal text-slate/60">{f.messageOptional}</span>
        </label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-slate/40" />
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={f.messagePlaceholderOffer}
            className="w-full rounded-lg border border-border py-3 pl-10 pr-4 text-base text-charcoal outline-none transition-colors focus:border-brand-blue sm:text-sm"
          />
        </div>
      </div>

      <label className="flex items-start gap-2 text-xs text-slate">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>
          {f.consentContact}{" "}
          <span className="text-brand-green">*</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-slate/60">
            <ShieldCheck className="size-3.5 shrink-0" />
            {f.consentDataUse}
          </span>
        </span>
      </label>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" /> {errorMessage}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-border px-6 text-sm font-semibold text-navy transition-colors hover:bg-soft-gray sm:w-auto sm:flex-1"
        >
          {f.cancel}
        </button>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70 sm:w-auto sm:flex-1"
        >
          {status === "submitting" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          {f.sendRequest}
        </button>
      </div>

      <p className="text-center text-xs text-slate/50">
        {f.requiredNote}
      </p>
    </form>
  );
}

function IconField({
  icon,
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  icon: ReactNode;
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
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate/40 [&>svg]:size-4">
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border py-2.5 pl-10 pr-4 text-base text-charcoal outline-none transition-colors focus:border-brand-blue sm:text-sm"
        />
      </div>
    </div>
  );
}
