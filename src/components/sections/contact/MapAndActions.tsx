"use client";

import { MapPin, FileText, FlaskConical, CalendarCheck } from "lucide-react";
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

export default function MapAndActions() {
  const { t } = useLanguage();
  return (
    <section className="section-y bg-soft-gray">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-navy">{t.contact.findUsTitle}</h2>
            <p className="mt-2 text-slate">
              {t.contact.findUsDescription}
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm text-navy">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <span className="font-semibold">{t.common.address}</span>
            </div>
            <Button
              href={`https://www.openstreetmap.org/directions?to=${COMPANY.coordinates.lat}%2C${COMPANY.coordinates.lng}`}
              variant="secondary"
              className="mt-5"
              showArrow
            >
              {t.contact.getDirections}
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
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
