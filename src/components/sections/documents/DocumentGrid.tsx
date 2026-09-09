"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Download,
  Building2,
  Boxes,
  FileText,
  Settings,
  Leaf,
  FolderOpen,
  ShieldCheck,
  Info,
  CalendarDays,
  CalendarCheck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useInquiryModal } from "@/components/inquiry/InquiryModalContext";
import { useDocumentRequestModal } from "./DocumentRequestModalContext";
import DocumentRequestForm from "./DocumentRequestForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DOCUMENT_LIST, TAROPAK_EVENT } from "@/lib/constants";

// Sənəd növünə görə ikon — bir neçəsi üçün icons qovluğundakı xüsusi
// fayllar var (daha dəqiq uyğun gəlir), qalanı lucide fallback-də qalır.
const DOC_ICONS: Record<string, LucideIcon | null> = {
  company: null,
  product: null,
  technical: FileText,
  traceability: null,
  process: Settings,
  sustainability: Leaf,
};
const DOC_ICON_IMAGES: Record<string, string> = {
  company: "/images/icons/trimmed/corporate-building.png",
  product: "/images/icons/trimmed/inventory.png",
  traceability: "/images/icons/trimmed/TraceabilityN.png",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Company: Building2,
  Product: Boxes,
  Quality: ShieldCheck,
  Sustainability: Leaf,
};

export default function DocumentGrid() {
  const { open: openInquiry } = useInquiryModal();
  const { open: openDocumentRequest } = useDocumentRequestModal();
  const { t } = useLanguage();
  const [active, setActive] = useState("All");

  const docsWithText = useMemo(
    () => DOCUMENT_LIST.map((doc, i) => ({ ...doc, name: t.documentList[i].name, description: t.documentList[i].description })),
    [t]
  );

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const doc of DOCUMENT_LIST) counts.set(doc.category, (counts.get(doc.category) ?? 0) + 1);
    return [
      { key: "All", label: t.documents.allDocuments, count: DOCUMENT_LIST.length },
      ...[...counts.entries()].map(([key, count]) => ({ key, label: t.documents.categories[key] ?? key, count })),
    ];
  }, [t]);

  const visible = active === "All" ? docsWithText : docsWithText.filter((doc) => doc.category === active);

  return (
    <section className="bg-white py-10 lg:py-14">
      <Container>
        {/* Category Pills */}
        <Reveal className="flex flex-wrap gap-2.5">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.key] ?? FolderOpen;
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActive(cat.key)}
                className={clsx(
                  "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-white text-slate hover:border-brand-blue/40"
                )}
              >
                <Icon className="size-4 stroke-[1.75]" aria-hidden />
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {/* Left: document cards + info banner */}
          <div className="lg:col-span-2">
            {/* key={active}: filtr dəyişəndə tam remount olunur ki, aşağıdakı
                CSS animasiyası hər dəfə yenidən oynasın. RevealGroup/
                RevealItem (framer-motion whileInView + viewport once:true)
                bu sadə dinamik siyahı üçün uyğun deyildi — bir dəfə
                tetiklənəndən sonra sonradan əlavə olunan uşaqları heç vaxt
                göstərmirdi (əbədi opacity:0 qalırdı), filtr işləmirmiş kimi
                görünürdü. */}
            <div key={active} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {visible.map((doc, i) => {
                const Icon = DOC_ICONS[doc.icon];
                const iconSrc = DOC_ICON_IMAGES[doc.icon];
                return (
                  <div key={doc.icon} style={{ animation: `card-fade-in 0.4s ease-out ${i * 0.05}s both` }}>
                    <div className="flex h-full items-start justify-between gap-3 rounded-2xl border border-border bg-white p-5">
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="text-sm font-bold text-navy">{doc.name}</p>
                        <p className="mt-1 text-xs text-slate/60">
                          {doc.format} &middot; {doc.size}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-slate">{doc.description}</p>
                        {doc.file ? (
                          <a
                            href={doc.file}
                            download
                            className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-brand-green-dark hover:underline"
                          >
                            {t.common.download}
                            <Download className="size-3.5" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={openDocumentRequest}
                            className="mt-3 inline-flex w-fit cursor-pointer items-center gap-1.5 text-xs font-semibold text-brand-green-dark hover:underline"
                          >
                            {t.common.request}
                            <Download className="size-3.5" />
                          </button>
                        )}
                      </div>
                      {/* İkon sağda, böyük — kartın hündürlüyünü artırmadan
                          (mətn sütunundan ayrı, öz sırasında) daha iri görünür. */}
                      <span className="flex size-18 shrink-0 items-center justify-center rounded-lg border border-border text-navy">
                        {Icon ? (
                          <Icon className="size-10 stroke-[1.4]" aria-hidden />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={iconSrc} alt="" className="size-11 object-contain" />
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info banner + kompakt TAROPAK dəvəti — filtr az nəticə
                göstərəndə belə sol sütun boş qalmasın. */}
            <Reveal delay={0.1}>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-4">
                <Info className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden />
                <p className="text-xs leading-relaxed text-slate">
                  {t.documents.infoBanner}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mt-4 flex min-h-[170px] w-full items-center overflow-hidden rounded-2xl">
                <Image
                  src="/images/destination-warsaw-hero-banner-taropak.jpg"
                  alt="Poznań, Poland — TAROPAK venue"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/40" />
                <div className="relative z-10 max-w-md p-6">
                  <h3 className="text-xl font-bold text-white">{t.documents.taropakMeet(TAROPAK_EVENT.name)}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-white/80">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-brand-green" />
                      {TAROPAK_EVENT.dates}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-brand-green" />
                      {TAROPAK_EVENT.location}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {t.documents.taropakTagline}
                  </p>
                  <button
                    type="button"
                    onClick={() => openInquiry({ type: "taropak" })}
                    className="mt-4 inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-navy px-5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-navy"
                  >
                    <CalendarCheck className="size-4" aria-hidden />
                    {t.documents.taropakButton}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: custom document package form — left sütunla eyni
              hündürlükdə (items-stretch), aşağıdakı boşluq Additional
              Notes sahəsinə paylanır. */}
          <Reveal delay={0.15} className="h-full">
            <DocumentRequestForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
