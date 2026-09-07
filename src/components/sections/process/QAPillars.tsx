import { BadgeCheck, ShieldCheck, FileText, LineChart, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBadge from "@/components/ui/IconBadge";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { QA_PILLARS } from "@/lib/constants";

const ICONS: LucideIcon[] = [BadgeCheck, ShieldCheck, FileText, LineChart];

export default function QAPillars() {
  return (
    <section className="section-y bg-white">
      <Container>
        <Reveal>
          <SectionHeading title="Our Quality Assurance Pillars" />
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QA_PILLARS.map((item, i) => (
            <RevealItem key={item.title} className="rounded-2xl border border-border p-6">
              <IconBadge icon={ICONS[i]} tone="green" size="lg" />
              <h3 className="mt-4 text-base font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
