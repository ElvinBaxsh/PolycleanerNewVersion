"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlaskConical, FileText, Headset } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import InquiryButton from "@/components/inquiry/InquiryButton";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";

export type PageHeroKey = "about" | "rpet" | "process" | "sustainability" | "documents";

export default function PageHero({
  pageKey,
  image = "/images/aboutUs.jpg",
  imageAlt,
  imagePosition = "center",
  extra,
}: {
  pageKey: PageHeroKey;
  /** Full-bleed background photo (same treatment as the Home hero). */
  image?: string;
  imageAlt?: string;
  /** object-position for the background photo — e.g. "right" when the photo's main subject sits toward its right edge. */
  imagePosition?: string;
  extra?: ReactNode;
}) {
  const { t, locale } = useLanguage();

  const crumb = pageKey === "documents" ? t.documents.heroCrumb : t.nav[pageKey === "rpet" ? "rpet" : pageKey];

  let title: string;
  let titleAccent: string | undefined;
  let description: string;
  switch (pageKey) {
    case "about":
      title = t.about.heroTitle;
      titleAccent = t.about.heroTitleAccent;
      description = t.about.heroDescription;
      break;
    case "rpet":
      title = t.rpet.heroTitle;
      titleAccent = t.rpet.heroTitleAccent;
      description = t.rpet.heroDescription;
      break;
    case "process":
      title = t.process.heroTitle;
      titleAccent = t.process.heroTitleAccent;
      description = t.process.heroDescription;
      break;
    case "sustainability":
      title = t.sustainability.heroTitle;
      titleAccent = t.sustainability.heroTitleAccent;
      description = t.sustainability.heroDescription;
      break;
    case "documents":
      title = t.documents.heroTitle;
      titleAccent = t.documents.heroTitleAccent;
      description = t.documents.heroDescription;
      break;
  }

  type CtaItem = { label: string } & ({ href: string; inquiryType?: never } | { href?: never; inquiryType: string });
  let cta: CtaItem[] | undefined;
  if (pageKey === "process") {
    cta = [
      { label: t.process.ctaRequestInfo, href: localizePath("/documents", locale) },
      { label: t.process.ctaSpeakWithSales, inquiryType: "general" },
    ];
  } else if (pageKey !== "documents") {
    cta = [
      { label: t.common.requestRpetOffer, inquiryType: "offer" },
      { label: t.common.requestSample, inquiryType: "sample" },
    ];
  }

  const CTA_ICONS: Record<string, ReactNode> = {
    offer: <ArrowRight className="ml-1.5 size-5 stroke-[2.5]" aria-hidden />,
    sample: <FlaskConical className="ml-1.5 size-5 stroke-[1.8]" aria-hidden />,
    general: <Headset className="ml-1.5 size-5 stroke-[1.8]" aria-hidden />,
  };
  const HREF_CTA_ICON = <FileText className="ml-1.5 size-5 stroke-[1.8]" aria-hidden />;

  return (
    <section className="relative min-h-[420px] w-full overflow-hidden bg-navy pb-14 pt-8 sm:pt-10 lg:min-h-[480px]">
      {/* Background photo + left-to-right gradient so the copy stays legible */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt ?? `${title} ${titleAccent ?? ""}`.trim()}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 lg:from-navy/95 lg:via-navy/80 lg:to-navy/10" />
      </div>

      <Container className="relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
          <Link href={localizePath("/", locale)} className="hover:text-white/90">
            {t.nav.home}
          </Link>
          <span>&gt;</span>
          <span className="text-brand-green">{crumb}</span>
        </nav>

        <Reveal className="max-w-2xl">
          <h1 className="text-[32px] font-bold leading-[1.15] text-white sm:text-[40px] lg:text-[48px]">
            {title}
            {titleAccent && <span className="text-brand-green"> {titleAccent}</span>}
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80 sm:text-xl">
            {description}
          </p>
          {cta && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {cta.map((c, i) =>
                c.inquiryType ? (
                  <InquiryButton
                    key={i}
                    type={c.inquiryType}
                    variant={i === 0 ? "primary" : "ghost-light"}
                    className="h-12 w-full px-6 text-sm font-bold uppercase tracking-wider sm:w-auto"
                  >
                    {c.label}
                    {CTA_ICONS[c.inquiryType]}
                  </InquiryButton>
                ) : (
                  <Button
                    key={i}
                    href={c.href!}
                    variant={i === 0 ? "primary" : "ghost-light"}
                    className="h-12 w-full px-6 text-sm font-bold uppercase tracking-wider sm:w-auto"
                  >
                    {c.label}
                    {HREF_CTA_ICON}
                  </Button>
                )
              )}
            </div>
          )}
          {extra}
        </Reveal>
      </Container>
    </section>
  );
}
