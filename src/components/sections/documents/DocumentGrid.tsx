"use client";

import { useState, type FormEvent } from "react";
import {
  Download,
  FolderOpen,
  Building2,
  Boxes,
  FileText,
  FlaskConical,
  Search,
  Settings,
  ShieldCheck,
  Leaf,
  Calendar,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { DOCUMENT_CATEGORIES, DOCUMENT_LIST } from "@/lib/constants";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "All Documents": FolderOpen,
  Company: Building2,
  Product: Boxes,
  Quality: ShieldCheck,
  Sustainability: Leaf,
  Events: Calendar,
};

const DOC_ICONS: Record<string, LucideIcon> = {
  company: Building2,
  product: Boxes,
  technical: FileText,
  coa: FlaskConical,
  traceability: Search,
  process: Settings,
  sustainability: Leaf,
  event: Calendar,
};

export default function DocumentGrid() {
  const [active, setActive] = useState("All Documents");

  const visible =
    active === "All Documents" ? DOCUMENT_LIST : DOCUMENT_LIST.filter((doc) => doc.category === active);

  return (
    <section className="bg-white py-10 lg:py-14">
      <Container>
        {/* Category Tabs */}
        <Reveal className="flex flex-wrap gap-2.5">
          {DOCUMENT_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] ?? FolderOpen;
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-white text-slate hover:border-brand-blue/40"
                )}
              >
                <Icon className="size-4 stroke-[1.75]" aria-hidden />
                {cat}
              </button>
            );
          })}
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: document cards + info banner */}
          <div className="lg:col-span-2">
            <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {visible.map((doc) => {
                const Icon = DOC_ICONS[doc.icon] ?? FileText;
                return (
                  <RevealItem key={doc.name}>
                    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-5">
                      <span className="flex size-11 items-center justify-center rounded-lg border border-border text-navy">
                        <Icon className="size-5 stroke-[1.6]" aria-hidden />
                      </span>
                      <p className="mt-3.5 text-sm font-bold text-navy">{doc.name}</p>
                      <p className="mt-1 text-xs text-slate/60">
                        {doc.format} &middot; {doc.size}
                      </p>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-brand-green-dark hover:underline"
                      >
                        Download
                        <Download className="size-3.5" />
                      </a>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            {/* <Reveal delay={0.1}>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-4">
                <Info className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden />
                <p className="text-xs leading-relaxed text-slate">
                  All documents are available in PDF format. Need another format or additional
                  information? Contact us and we&rsquo;ll be happy to help.
                </p>
              </div>
            </Reveal> */}
          </div>

          {/* Right: custom document package form */}
          <Reveal delay={0.15}>
            <CustomDocumentForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

function CustomDocumentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-brand-green/30 bg-brand-green/5 p-6 text-center">
        <CheckCircle2 className="size-8 text-brand-green" />
        <p className="text-sm font-bold text-navy">Request received.</p>
        <p className="text-xs text-slate">Our team will prepare your document package shortly.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-xs font-semibold text-brand-blue underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-5 sm:p-6">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <input type="hidden" name="inquiryType" value="documents" />

      <h2 className="text-lg font-bold text-navy">Need a custom document package?</h2>
      <p className="mt-1 text-xs leading-relaxed text-slate">
        Tell us what you need and we&rsquo;ll prepare a tailored package for you.
      </p>

      <div className="mt-5 space-y-4">
        <FormField label="Full Name" name="fullName" required placeholder="Enter your full name" />
        <FormField label="Company" name="company" required placeholder="Enter your company name" />
        <FormField label="Email" name="email" type="email" required placeholder="Enter your email address" />

        <div>
          <label htmlFor="documentType" className="mb-1.5 block text-sm font-semibold text-navy">
            Document Type
          </label>
          <select
            id="documentType"
            name="documentType"
            defaultValue=""
            className="w-full appearance-none rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
          >
            <option value="" disabled>
              Select document type
            </option>
            {DOCUMENT_LIST.map((doc) => (
              <option key={doc.name} value={doc.name}>
                {doc.name}
              </option>
            ))}
            <option value="Other">Other / Custom</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
            Additional Notes
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us more about your request"
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 flex items-center gap-2 text-xs text-red-600">
          <AlertCircle className="size-4 shrink-0" /> {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70"
      >
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        Request Document Pack
      </button>
      <p className="mt-3 text-center text-[11px] text-slate/60">
        We respect your data. See our Privacy Policy.
      </p>
    </form>
  );
}

function FormField({
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
        className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-brand-blue"
      />
    </div>
  );
}
