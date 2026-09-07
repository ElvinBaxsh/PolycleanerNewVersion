"use client";

import { useState, type FormEvent, type ReactNode } from "react";
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

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestOfferForm({ onCancel }: { onCancel?: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      userLanguage: "EN",
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
        throw new Error(
          body.error ||
            "Something went wrong. Please try again or contact us directly by email."
        );
      }

      setStatus("success");
      trackEvent("request_offer_success");
      form.reset();
    } catch (err) {
      setStatus("error");
      trackEvent("request_offer_error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or contact us directly by email."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/5 p-8 text-center sm:p-10">
        <CheckCircle2 className="size-10 text-brand-green" />
        <h3 className="text-lg font-bold text-navy">
          Thank you. Your request has been received.
        </h3>
        <p className="text-sm text-slate">
          Our sales team will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-brand-blue underline"
        >
          Send another request
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <IconField icon={<User />} label="Full Name" name="fullName" required placeholder="John Doe" />
        <IconField
          icon={<Building2 />}
          label="Company Name"
          name="company"
          required
          placeholder="Company Ltd."
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <IconSelectField
          icon={<Globe2 />}
          label="Country"
          name="country"
          required
          placeholder="Select country"
          options={COUNTRY_OPTIONS}
        />
        <IconField
          icon={<Mail />}
          label="Email Address"
          name="email"
          type="email"
          required
          placeholder="name@company.com"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <IconField
          icon={<Phone />}
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          required
          placeholder="+48 123 456 789"
        />
        <IconSelectField
          icon={<Package />}
          label="Product Interest"
          name="productInterest"
          required
          placeholder="Select product"
          options={OFFER_PRODUCT_INTEREST_OPTIONS}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <IconSelectField
          icon={<BarChart3 />}
          label="Required Volume"
          name="requiredVolume"
          placeholder="Select volume"
          options={OFFER_VOLUME_OPTIONS}
        />
        <IconSelectField
          icon={<Layers />}
          label="Application"
          name="application"
          placeholder="Select application"
          options={OFFER_APPLICATION_OPTIONS}
        />
      </div>

      <IconField
        icon={<MapPin />}
        label="Delivery Destination"
        name="deliveryDestination"
        placeholder="Poland, Germany, Netherlands, Turkey, etc."
      />

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          Message <span className="font-normal text-slate/60">(optional)</span>
        </label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-slate/40" />
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Please describe your required product, target volume, delivery terms or any special specifications."
            className="w-full rounded-lg border border-border py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
          />
        </div>
      </div>

      <label className="flex items-start gap-2 text-xs text-slate">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>
          I agree to be contacted by Poly Cleaner regarding my inquiry.{" "}
          <span className="text-brand-green">*</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-slate/60">
            <ShieldCheck className="size-3.5 shrink-0" />
            Your information will only be used to respond to your request.
          </span>
        </span>
      </label>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" /> {errorMessage}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-border px-6 text-sm font-semibold text-navy transition-colors hover:bg-soft-gray"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70 sm:flex-none sm:px-10"
        >
          {status === "submitting" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Send Request
        </button>
      </div>

      <p className="text-center text-xs text-slate/50">
        All fields marked with <span className="text-brand-green">*</span> are required.
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
          className="w-full rounded-lg border border-border py-2.5 pl-10 pr-4 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
        />
      </div>
    </div>
  );
}

function IconSelectField({
  icon,
  label,
  name,
  options,
  required = false,
  placeholder = "Select an option",
}: {
  icon: ReactNode;
  label: string;
  name: string;
  options: string[];
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
        <select
          id={name}
          name={name}
          required={required}
          defaultValue=""
          className="w-full appearance-none rounded-lg border border-border bg-white py-2.5 pl-10 pr-8 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
