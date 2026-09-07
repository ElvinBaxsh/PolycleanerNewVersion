import { ShieldCheck, Handshake, Globe2 } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

const ITEMS = [
  { icon: ShieldCheck, title: "Reliable Quality", description: "Consistent rPET quality you can count on." },
  { icon: Handshake, title: "Long-term Partnership", description: "Transparent collaboration built on trust." },
  { icon: Globe2, title: "Global Support", description: "Responsive service globally, locally." },
];

export default function ContactHero() {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-navy pb-14 pt-8 sm:pt-10 lg:min-h-[480px]">
      <div className="absolute inset-0 z-0">
        <Image src="/images/aboutUs.png" alt="Poly Cleaner facility" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 lg:from-navy/95 lg:via-navy/80 lg:to-navy/10" />
      </div>
      <Container className="relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white/80">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-brand-green">Contact</span>
        </nav>

        <div className="max-w-3xl">
          <Reveal>
            <h1 className="text-[32px] font-bold leading-[1.15] text-white sm:text-[40px] lg:text-[48px]">
              Contact <span className="text-brand-green">Poly Cleaner</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              We&rsquo;re here to support your business with high-quality rPET solutions and reliable
              service. Reach out to our team for inquiries, samples, offers, or partnership opportunities.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {ITEMS.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 size-8 shrink-0 text-brand-green" />
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
