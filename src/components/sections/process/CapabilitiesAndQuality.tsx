import Image from "next/image";
import { CheckCircle2, Settings, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { PROCESS_CAPABILITIES, QUALITY_CONTROL } from "@/lib/constants";

export default function CapabilitiesAndQuality() {
  return (
    <section className="section-y bg-soft-gray">
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="rounded-2xl border border-border bg-white p-6 lg:p-8">
          <div className="flex items-center gap-2.5">
            <Settings className="size-8 stroke-[1.5] text-brand-blue" />
            <h3 className="text-lg font-bold text-navy">Process Capabilities</h3>
          </div>
          <p className="mt-1 text-sm text-slate">
            Our facility is designed for efficient, sustainable and scalable rPET flake production.
          </p>
          <ul className="mt-4 space-y-2.5">
            {PROCESS_CAPABILITIES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" />
                {item}
              </li>
            ))}
          </ul>
          <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/hero-rpet-flakes.webp"
              alt="Sorting & washing line"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-border bg-white p-6 lg:p-8">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-8 stroke-[1.5] text-brand-blue" />
            <h3 className="text-lg font-bold text-navy">Quality Control & Documentation</h3>
          </div>
          <p className="mt-1 text-sm text-slate">
            Every batch is tested and documented to meet international buyer requirements.
          </p>
          <ul className="mt-4 space-y-2.5">
            {QUALITY_CONTROL.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" />
                {item}
              </li>
            ))}
          </ul>
          <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/closeUpViewLast.png"
              alt="Lab / quality control testing"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
