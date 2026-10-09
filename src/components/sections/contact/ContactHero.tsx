"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";

const ICON_SRCS = [
  "/images/icons/trimmed/reliability.png",
  "/images/icons/trimmed/handshake.png",
  "/images/icons/trimmed/globus-green.png",
];

export default function ContactHero() {
  const { t, locale } = useLanguage();
  return (
    // From lg the banner fills the screen below the sticky header (h-20
    // there), the same as the home hero; phones and tablets keep the
    // height they had.
    <section className="relative min-h-[420px] overflow-hidden bg-navy pb-14 pt-8 sm:pt-10 lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center lg:py-14">
      <div className="absolute inset-0 z-0">
        <Image src="/images/factory/hero-plant-interior.webp" alt="Poly Cleaner facility" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 lg:from-navy/95 lg:via-navy/80 lg:to-navy/10" />
      </div>
      <Container className="relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-white/60 lg:text-sm" aria-label="Breadcrumb">
          <Link href={localizePath("/", locale)} className="hover:text-white/80">
            {t.nav.home}
          </Link>
          <span>&gt;</span>
          <span className="text-brand-green">{t.nav.contact}</span>
        </nav>

        {/* Wider from lg than the copy above it: at 3xl the middle column
            was narrow enough to break "Long-term Partnership" across two
            lines, which pushed its description onto a third. */}
        <div className="max-w-3xl lg:max-w-5xl">
          <Reveal>
            <h1 className="text-[32px] font-bold leading-[1.15] text-white sm:text-[40px] lg:text-[60px] xl:text-[72px] 2xl:text-[80px] lg:[@media(max-height:820px)]:text-[48px]">
              {t.contact.heroTitle} <span className="text-brand-green">{t.contact.heroTitleAccent}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg lg:mt-6 lg:text-[26px] lg:leading-relaxed lg:[@media(max-height:820px)]:mt-4 lg:[@media(max-height:820px)]:text-xl">
              {t.contact.heroDescription}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-6 lg:[@media(max-height:820px)]:mt-10">
              {t.contact.heroItems.map(({ title, description }, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICON_SRCS[i]} alt="" className="mt-0.5 size-11 shrink-0 object-contain lg:size-14" />
                  <div>
                    <p className="text-sm font-bold text-white lg:text-lg">{title}</p>
                    <p className="text-xs text-white/60 lg:text-base">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
