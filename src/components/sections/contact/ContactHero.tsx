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
    <section className="relative min-h-[420px] overflow-hidden bg-navy pb-14 pt-8 sm:pt-10 lg:min-h-[480px]">
      <div className="absolute inset-0 z-0">
        <Image src="/images/aboutUs.jpg" alt="Poly Cleaner facility" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 lg:from-navy/95 lg:via-navy/80 lg:to-navy/10" />
      </div>
      <Container className="relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
          <Link href={localizePath("/", locale)} className="hover:text-white/80">
            {t.nav.home}
          </Link>
          <span>&gt;</span>
          <span className="text-brand-green">{t.nav.contact}</span>
        </nav>

        <div className="max-w-3xl">
          <Reveal>
            <h1 className="text-[32px] font-bold leading-[1.15] text-white sm:text-[40px] lg:text-[48px]">
              {t.contact.heroTitle} <span className="text-brand-green">{t.contact.heroTitleAccent}</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t.contact.heroDescription}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {t.contact.heroItems.map(({ title, description }, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICON_SRCS[i]} alt="" className="mt-0.5 size-11 shrink-0 object-contain" />
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-xs text-white/60">{description}</p>
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
