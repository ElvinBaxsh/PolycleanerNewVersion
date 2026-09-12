"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Globe, MessageCircle, type LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import InquiryForm from "@/components/forms/InquiryForm";
import Reveal from "@/components/ui/Reveal";
import { LinkedinIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CONTACT_INFO } from "@/lib/constants";

const ICONS: LucideIcon[] = [Mail, Phone, MapPin, Globe, MessageCircle];

export default function ContactFormSection({
  defaultType,
  defaultInterest,
}: {
  defaultType?: string;
  defaultInterest?: string;
}) {
  const { t } = useLanguage();
  // Once the form is gone, "fill in the form below" is describing something
  // that is no longer on screen.
  const [sent, setSent] = useState(false);
  const contactItems = CONTACT_INFO.map((item, i) => ({
    label: t.contactInfo[i].label,
    value: i === 2 ? t.common.address : i === 4 ? t.contactInfo[i].value! : item.value,
    sub: t.contactInfo[i].sub,
  }));

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
          {!sent && <p className="mt-1 text-sm text-slate">{t.contact.formIntro}</p>}
          <div className="mt-6 flex flex-1 flex-col">
            <InquiryForm
              defaultType={defaultType}
              defaultInterest={defaultInterest}
              onSuccess={() => setSent(true)}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex h-full flex-col rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy">{t.contact.infoTitle}</h2>
          <ul className="mt-6 flex flex-1 flex-col justify-between gap-6">
            {contactItems.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex size-18 shrink-0 items-center justify-center rounded-lg border border-border text-brand-blue">
                    <Icon className="size-9 stroke-[1.5]" />
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy">{item.label}</p>
                    <p className={clsx("text-base text-slate", i === 2 && "font-semibold")}>
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-sm text-slate/60">{item.sub}</p>
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
