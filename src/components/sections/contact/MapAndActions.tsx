import { MapPin, FileText, FlaskConical, CalendarCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InquiryButton from "@/components/inquiry/InquiryButton";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { COMPANY } from "@/lib/constants";

export default function MapAndActions() {
  return (
    <section className="section-y bg-soft-gray">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-navy">Find Us</h2>
            <p className="mt-2 text-slate">
              Our facility is located in the Balakhani Industrial Park, strategically positioned for
              efficient logistics and global shipping.
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm text-navy">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <span className="font-semibold">{COMPANY.address}</span>
            </div>
            <Button
              href="https://maps.google.com/?q=Balakhani+Industrial+Park+Baku+Azerbaijan"
              variant="secondary"
              className="mt-5"
              showArrow
            >
              Get Directions
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <PhotoPlaceholder label="Map — Balakhani Industrial Park, Baku" aspect="aspect-[4/3]" />
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <RevealItem>
            <QuickCard
              icon={FileText}
              title="Request Offer"
              description="Get a tailored offer for your required rPET flakes specifications."
              inquiryType="offer"
              cta="Request Offer"
            />
          </RevealItem>
          <RevealItem>
            <QuickCard
              icon={FlaskConical}
              title="Request Sample"
              description="Receive a sample to evaluate our rPET flakes quality."
              inquiryType="sample"
              cta="Request Sample"
            />
          </RevealItem>
          <RevealItem>
            <QuickCard
              icon={CalendarCheck}
              title="Book TAROPAK Meeting"
              description="Let's meet at TAROPAK 2026 in Poznań, Poland."
              inquiryType="taropak"
              cta="Book Meeting"
            />
          </RevealItem>
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
    <div className="rounded-2xl border border-border bg-white p-6">
      <Icon className="size-10 stroke-[1.5] text-brand-blue" />
      <h3 className="mt-3 text-base font-bold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-slate">{description}</p>
      <InquiryButton type={inquiryType} size="md" showArrow className="mt-4">
        {cta}
      </InquiryButton>
    </div>
  );
}
