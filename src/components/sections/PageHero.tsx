import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import InquiryButton from "@/components/inquiry/InquiryButton";
import { NAV_LINKS } from "@/lib/constants";

// Same icon convention the Home hero uses for these two CTAs.
const CTA_ICONS: Record<string, ReactNode> = {
  offer: <ArrowRight className="ml-1.5 size-4 stroke-[2.5]" aria-hidden />,
  sample: <FlaskConical className="ml-1.5 size-4 stroke-[1.8]" aria-hidden />,
};

type CtaItem = { label: string } & ({ href: string; inquiryType?: never } | { href?: never; inquiryType: string });

export default function PageHero({
  crumb,
  title,
  titleAccent,
  description,
  image = "/images/aboutUs.jpg",
  imageAlt,
  cta,
  extra,
}: {
  crumb: string;
  title: string;
  titleAccent?: string;
  description: string;
  /** Full-bleed background photo (same treatment as the Home hero). */
  image?: string;
  imageAlt?: string;
  /** @deprecated kept for call-site compatibility; the photo is now a background */
  photoLabel?: string;
  cta?: CtaItem[];
  extra?: ReactNode;
}) {
  const currentLink = NAV_LINKS.find((l) => l.label === crumb);

  return (
    <section className="relative min-h-[420px] w-full overflow-hidden bg-navy pb-14 pt-8 sm:pt-10 lg:min-h-[480px]">
      {/* Background photo + left-to-right gradient so the copy stays legible */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt ?? `${title} ${titleAccent ?? ""}`.trim()}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 lg:from-navy/95 lg:via-navy/80 lg:to-navy/10" />
      </div>

      <Container className="relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white/90">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-brand-green">{currentLink?.label ?? crumb}</span>
        </nav>

        <Reveal className="max-w-2xl">
          <h1 className="text-[32px] font-bold leading-[1.15] text-white sm:text-[40px] lg:text-[48px]">
            {title}
            {titleAccent && <span className="text-brand-green"> {titleAccent}</span>}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
          {cta && (
            <div className="mt-7 flex flex-wrap gap-3">
              {cta.map((c, i) =>
                c.inquiryType ? (
                  <InquiryButton
                    key={c.label}
                    type={c.inquiryType}
                    variant={i === 0 ? "primary" : "ghost-light"}
                    className="h-11 px-4 text-xs font-bold uppercase tracking-wider"
                  >
                    {c.label}
                    {CTA_ICONS[c.inquiryType]}
                  </InquiryButton>
                ) : (
                  <Button
                    key={c.label}
                    href={c.href!}
                    variant={i === 0 ? "primary" : "ghost-light"}
                    className="h-11 px-4 text-xs font-bold uppercase tracking-wider"
                  >
                    {c.label}
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
