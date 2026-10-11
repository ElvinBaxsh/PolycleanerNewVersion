"use client";

import { useState } from "react";
import { MapPin, LocateFixed, Navigation, Copy, Check, FileText, FlaskConical, CalendarCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InquiryButton from "@/components/inquiry/InquiryButton";
import LocationMap from "./LocationMap";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { COMPANY } from "@/lib/constants";

const QUICK_CARD_ICONS = [FileText, FlaskConical, CalendarCheck];
const QUICK_CARD_TYPES = ["offer", "sample", "taropak"];

const { lat, lng } = COMPANY.coordinates;
const COORDS_PRECISE = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
const COORDS_SHOWN = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

// Universal links: they open the app on a phone and the web version on a
// desktop.
const DIRECTIONS = [
  { name: "Google Maps", href: `https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}`, primary: true },
  { name: "Waze", href: `https://waze.com/ul?ll=${lat}%2C${lng}&navigate=yes`, primary: false },
  { name: "Apple Maps", href: `https://maps.apple.com/?daddr=${lat}%2C${lng}`, primary: false },
];

export default function MapAndActions() {
  const { t } = useLanguage();
  return (
    // The address in Contact Information links to #map.
    <section id="map" className="section-y scroll-mt-24 bg-soft-gray">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-navy">{t.contact.findUsTitle}</h2>
            <p className="mt-2 text-slate">{t.contact.findUsDescription}</p>

            <dl className="mt-6 grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate/60">{t.contactInfo[2].label}</dt>
                  <dd className="font-semibold text-navy">{t.common.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LocateFixed className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate/60">{t.contact.coordinates}</dt>
                  <dd className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold tabular-nums text-navy">{COORDS_SHOWN}</span>
                    <CopyCoordinates copyLabel={t.contact.copy} copiedLabel={t.contact.copied} />
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 border-t border-border pt-6 lg:mt-auto">
              <p className="text-sm font-bold text-navy">{t.contact.getDirections}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DIRECTIONS.map((app) => (
                  <Button
                    key={app.name}
                    href={app.href}
                    variant={app.primary ? "primary" : "secondary"}
                    icon={app.primary ? <Navigation className="size-4" aria-hidden /> : undefined}
                  >
                    {app.name}
                  </Button>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate/60">{t.contact.directionsHint}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="h-full">
            <LocationMap />
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
          {t.contact.quickCards.map((card, i) => (
            <RevealItem key={i} className="h-full">
              <QuickCard
                icon={QUICK_CARD_ICONS[i]}
                title={card.title}
                description={card.description}
                inquiryType={QUICK_CARD_TYPES[i]}
                cta={card.cta}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

// Copies the full-precision coordinates. The page shows them rounded.
function CopyCoordinates({ copyLabel, copiedLabel }: { copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(COORDS_PRECISE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused. The coordinates are still on the page.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold text-brand-blue transition-colors hover:bg-soft-gray focus-visible:outline-2 focus-visible:outline-brand-blue"
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}

function QuickCard({
  icon: Icon,
  title,
  description,
  inquiryType,
  cta,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
  inquiryType: string;
  cta: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6">
      <Icon className="size-10 stroke-[1.5] text-brand-blue" />
      <h3 className="mt-3 text-base font-bold text-navy">{title}</h3>
      <p className="mt-1 mb-4 text-sm text-slate">{description}</p>
      <InquiryButton type={inquiryType} size="md" showArrow className="mt-auto self-start">
        {cta}
      </InquiryButton>
    </div>
  );
}
