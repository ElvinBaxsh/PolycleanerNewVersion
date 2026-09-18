"use client";

import { Mail, Phone, MapPin, Globe, MessageCircle, type LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import InquiryForm from "@/components/forms/InquiryForm";
import Reveal from "@/components/ui/Reveal";
import { LinkedinIcon, FacebookIcon, WhatsappIcon } from "@/components/ui/SocialIcons";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";
import { CONTACT_INFO, CONTACT_EMAILS, CONTACT_PHONES, SITE_URL } from "@/lib/constants";

const ICONS: LucideIcon[] = [Mail, Phone, MapPin, Globe, MessageCircle];

const LINK = "text-base text-slate underline-offset-4 transition-colors hover:text-brand-blue hover:underline";
// Icon-only buttons as tall as the number's line and in the card's icon
// colour, so they sit beside the number without competing with it.
const ROUND =
  "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-soft-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

export default function ContactFormSection({
  defaultType,
  defaultInterest,
}: {
  defaultType?: string;
  defaultInterest?: string;
}) {
  const { t } = useLanguage();

  return (
    <section id="form" className="section-y scroll-mt-24 bg-white">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        {/* A column, so whatever is below the heading can take the rest of
            the card. The row is stretched to the taller of the two cards
            (lg:items-stretch above), and after the form is sent the
            confirmation is shorter than the form was — without this it left
            a band of empty card under itself. */}
        <Reveal className="flex h-full flex-col rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy">{t.contact.formTitle}</h2>
          <p className="mt-1 text-sm text-slate">{t.contact.formIntro}</p>
          <div className="mt-6 flex flex-1 flex-col">
            <InquiryForm defaultType={defaultType} defaultInterest={defaultInterest} />
          </div>
        </Reveal>

        {/* Tighter on phones (smaller icon tiles, padding and gaps) so a number and
            its call and WhatsApp buttons still fit on one line at 360px. */}
        <Reveal delay={0.1} className="flex h-full flex-col rounded-2xl border border-border p-4 sm:p-8">
          <h2 className="text-2xl font-bold text-navy">{t.contact.infoTitle}</h2>
          <ul className="mt-6 flex flex-1 flex-col justify-between gap-6">
            {CONTACT_INFO.map((_, i) => {
              const Icon = ICONS[i];
              return (
                <li key={i} className="flex items-start gap-3 sm:gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border text-brand-blue sm:size-18">
                    <Icon className="size-6 stroke-[1.5] sm:size-9" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-navy">{t.contactInfo[i].label}</p>
                    <ContactValue index={i} />
                    <p className="mt-0.5 text-sm text-slate/60">{t.contactInfo[i].sub}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy">{t.footer.followUs}</h3>
            <div className="mt-3 flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex size-12 items-center justify-center rounded-lg border border-border text-brand-blue transition-colors hover:bg-soft-gray"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex size-12 items-center justify-center rounded-lg border border-border text-brand-blue transition-colors hover:bg-soft-gray"
              >
                <FacebookIcon className="size-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Each row's value is the action someone wants from it: an address writes
 * a mail, a number offers both a call and a WhatsApp chat (people in the
 * region reach a supplier either way), the location scrolls down to the map
 * on this page, and the site name opens the site.
 */
function ContactValue({ index }: { index: number }) {
  const { t, locale } = useLanguage();

  switch (index) {
    case 0:
      return (
        <div className="flex flex-col">
          {CONTACT_EMAILS.map((email) => (
            <a key={email} href={`mailto:${email}`} className={LINK}>
              {email}
            </a>
          ))}
        </div>
      );

    case 1:
      return (
        <ul className="mt-1 space-y-1.5">
          {CONTACT_PHONES.map((phone) => (
            <li key={phone.tel} className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5 sm:gap-x-2.5">
              <a href={`tel:${phone.tel}`} className={clsx(LINK, "whitespace-nowrap tabular-nums")}>
                {phone.display}
              </a>
              <span className="flex gap-1">
                <a
                  href={`tel:${phone.tel}`}
                  aria-label={`${t.contact.callLabel} ${phone.display}`}
                  title={t.contact.callLabel}
                  className={ROUND}
                >
                  <Phone className="size-4" aria-hidden />
                </a>
                <a
                  href={`https://wa.me/${phone.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${phone.display}`}
                  title="WhatsApp"
                  className={ROUND}
                >
                  <WhatsappIcon className="size-4" aria-hidden />
                </a>
              </span>
            </li>
          ))}
        </ul>
      );

    case 2:
      return (
        <a href="#map" className={clsx(LINK, "font-semibold")}>
          {t.common.address}
        </a>
      );

    case 3:
      return (
        <a href={`${SITE_URL}${localizePath("/", locale)}`} className={LINK}>
          polycleaner.az
        </a>
      );

    default:
      return <p className="text-base text-slate">{t.contactInfo[index].value}</p>;
  }
}
