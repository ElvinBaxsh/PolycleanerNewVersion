import { Leaf, TrendingUp, Users, Handshake, FileCheck2, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { SUSTAINABILITY_PILLARS } from "@/lib/constants";

const ICONS: LucideIcon[] = [Leaf, TrendingUp, Users, Handshake, FileCheck2];

export default function SustainabilityPillars() {
  return (
    <section className="section-y bg-white">
      <Container>
        <Reveal>
          <SectionHeading title="Our Sustainability Pillars" />
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SUSTAINABILITY_PILLARS.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={item.title} className="rounded-2xl border border-border p-6">
                <span className="flex size-16 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Icon className="size-8 stroke-[1.5]" />
                </span>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
