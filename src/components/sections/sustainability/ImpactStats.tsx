import { Leaf, Package, Droplet, Zap, Users, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { IMPACT_STATS } from "@/lib/constants";

const ICONS: LucideIcon[] = [Leaf, Package, Droplet, Zap, Users];

export default function ImpactStats() {
  return (
    <section className="pb-10 bg-white">
      <Container>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold text-navy sm:text-3xl">Impact at a Glance</h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {IMPACT_STATS.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={stat.label} className="flex flex-col items-center gap-2 rounded-2xl border border-border p-5 text-center">
                <Icon className="size-9 stroke-[1.5] text-brand-green" aria-hidden />
                <p className="text-xl font-extrabold text-brand-green-dark">{stat.value}</p>
                <p className="text-xs leading-snug text-slate">{stat.label}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <p className="mt-4 text-xs text-slate/60">
          Figures represent approximate annual impact and continue to improve as we grow.
        </p>
      </Container>
    </section>
  );
}
