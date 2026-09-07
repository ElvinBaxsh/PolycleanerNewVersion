import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Recycle } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PlasticCreditBanner() {
  return (
    <section className="section-y bg-soft-gray">
      <Container>
        <Reveal className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-border lg:grid-cols-[1fr_320px]">
          <div className="relative aspect-[16/9] lg:h-full lg:aspect-auto">
            <Image
              src="/images/hero-rpet-flakes.webp"
              alt="Poly Cleaner rPET flakes production"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-3 bg-navy p-6 text-white lg:p-8">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-green/20 text-brand-green">
              <Recycle className="size-5" />
            </span>
            <h3 className="text-lg font-bold">Plastic Credit Supported</h3>
            <p className="text-sm text-white/70">
              Contributing to a cleaner environment and better livelihoods.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 max-w-2xl">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            Driving Positive Impact Beyond Our Operations
          </h2>
          <p className="mt-3 text-slate">
            We support plastic credit projects that help prevent plastic waste from leaking into the
            environment. These projects create verified environmental and social benefits in communities
            where waste management infrastructure is limited.
          </p>
          <Link href="/sustainability" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-dark">
            Learn more about our impact approach <ArrowRight className="size-3.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
