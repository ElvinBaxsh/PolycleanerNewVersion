"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { LinkedinIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import Logo from "./Logo";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  NAV_LINKS,
  FOOTER_PRODUCT_LINKS,
  FOOTER_INFO_LINKS,
  COMPANY,
} from "@/lib/constants";

export default function Footer() {
  const { t } = useLanguage();
  const navLabels = [t.nav.home, t.nav.about, t.nav.rpet, t.nav.process, t.nav.sustainability, t.nav.documents, t.nav.contact];

  return (
    <footer className="bg-navy text-white/80">
      {/* The "Let's build a cleaner future together" CTA banner lives in
          <FinalCta />, rendered by every page right before this Footer —
          it used to be duplicated here too, showing the same banner twice
          in a row on every single page. */}
      <Container className="grid grid-cols-1 gap-10 pb-12 pt-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo size="large" />
          <p className="mt-4 text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.quickLinks}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/60 hover:text-white">
                  {navLabels[i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.products}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_PRODUCT_LINKS.map((link, i) => (
              <li key={link.label}>
                <Link href={link.href} className="text-white/60 hover:text-white">
                  {t.footer.productLinks[i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.information}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_INFO_LINKS.map((link, i) => (
              <li key={link.label}>
                <Link href={link.href} className="text-white/60 hover:text-white">
                  {t.footer.infoLinks[i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.contactUs}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5">
              <MapPin className="size-4 shrink-0 mt-0.5 text-brand-green" />
              {t.common.address}
            </li>
            <li className="flex gap-2.5">
              <Phone className="size-4 shrink-0 mt-0.5 text-brand-green" />
              {COMPANY.phone}
            </li>
            <li className="flex gap-2.5">
              <Mail className="size-4 shrink-0 mt-0.5 text-brand-green" />
              {COMPANY.email}
            </li>
            <li className="flex gap-2.5">
              <Globe className="size-4 shrink-0 mt-0.5 text-brand-green" />
              {t.footer.website}
            </li>
          </ul>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-white">{t.footer.followUs}</h3>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="LinkedIn" className="flex size-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
              <LinkedinIcon className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
              <FacebookIcon className="size-4" />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-4 text-xs text-white/50 sm:flex-row">
          <p>{t.footer.copyright(2025)}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white/80">
              {t.footer.privacyPolicy}
            </Link>
            <Link href="/terms-of-use" className="hover:text-white/80">
              {t.footer.termsOfUse}
            </Link>
            <LanguageSwitcher variant="simple" />
          </div>
        </Container>
      </div>
    </footer>
  );
}
