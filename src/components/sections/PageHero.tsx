"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { ArrowRight, FlaskConical, FileText, Headset } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import InquiryButton from "@/components/inquiry/InquiryButton";
import FactoryGalleryButton from "@/components/gallery/FactoryGallery";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";

export type PageHeroKey = "about" | "rpet" | "process" | "sustainability" | "documents";

export default function PageHero({
  pageKey,
  image = "/images/factory/hero-plant-interior.webp",
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
  const hasGallery = pageKey === "about" || pageKey === "process";

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
    // From lg the banner fills the screen below the sticky header (h-20
    // there), the same as the home hero; phones and tablets keep the
    // height they had.
    <section
      className={clsx(
        "relative min-h-[420px] w-full overflow-hidden bg-navy pb-14 pt-8 sm:pt-10 lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center lg:py-14",
        // On a tablet the row of buttons reaches the corner the gallery card
        // sits in, so it gets a strip of its own beneath them. A phone needs
        // none (the card is an icon in the top corner there), and from lg
        // the banner is a full screen and the corner is clear.
        hasGallery && "sm:max-lg:pb-24",
      )}
    >
      {/* Background photo + left-to-right gradient so the copy stays legible */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt ?? `${title} ${titleAccent ?? ""}`.trim()}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 lg:from-navy/95 lg:via-navy/80 lg:to-navy/10" />
      </div>

      <Container className="relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-white/60 lg:text-sm" aria-label="Breadcrumb">
          <Link href={localizePath("/", locale)} className="hover:text-white/90">
            {t.nav.home}
          </Link>
          <span>&gt;</span>
          <span className="text-brand-green">{crumb}</span>
        </nav>

        <Reveal className="max-w-2xl">
          <h1 className="text-[32px] font-bold leading-[1.15] text-white sm:text-[40px] lg:text-[60px] xl:text-[72px] 2xl:text-[80px] lg:[@media(max-height:820px)]:text-[48px]">
            {title}
            {titleAccent && <span className="text-brand-green"> {titleAccent}</span>}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl lg:mt-6 lg:max-w-xl lg:text-[26px] lg:leading-relaxed lg:[@media(max-height:820px)]:mt-4 lg:[@media(max-height:820px)]:text-xl">
            {description}
          </p>
          {cta && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-9 lg:[@media(max-height:820px)]:mt-7">
              {cta.map((c, i) =>
                c.inquiryType ? (
                  <InquiryButton
                    key={i}
                    type={c.inquiryType}
                    variant={i === 0 ? "primary" : "ghost-light"}
                    className="h-12 w-full px-6 text-sm font-bold uppercase tracking-wider sm:w-auto lg:h-14 lg:px-8 lg:text-base lg:[@media(max-height:820px)]:h-12 lg:[@media(max-height:820px)]:text-sm"
                  >
                    {c.label}
                    {CTA_ICONS[c.inquiryType]}
                  </InquiryButton>
                ) : (
                  <Button
                    key={i}
                    href={c.href!}
                    variant={i === 0 ? "primary" : "ghost-light"}
                    className="h-12 w-full px-6 text-sm font-bold uppercase tracking-wider sm:w-auto lg:h-14 lg:px-8 lg:text-base lg:[@media(max-height:820px)]:h-12 lg:[@media(max-height:820px)]:text-sm"
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

      {/* The plant photo gallery, floating in the banner's bottom-right
          corner on the two pages about the plant itself. In the corner
          rather than in the copy column: the banner fills the screen from
          lg, and that corner is otherwise empty. On a phone the bottom is
          taken by full-width buttons, so it moves to the top-right corner,
          level with the breadcrumb, as an icon alone. */}
      {hasGallery && (
        <FactoryGalleryButton
          variant="hero"
          className="absolute right-4 top-5 z-10 sm:bottom-5 sm:right-6 sm:top-auto lg:bottom-8 lg:right-10"
        />
      )}
    </section>
  );
}
