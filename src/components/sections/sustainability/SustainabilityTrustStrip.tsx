import { Recycle, FileCheck2, ShieldCheck, Sprout, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";

const ITEMS: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Circular Economy", description: "Keeping materials in use for longer", icon: Recycle },
  { title: "Traceable & Documented", description: "Full transparency from source to flakes", icon: FileCheck2 },
  { title: "Responsible Operations", description: "High standards for people and planet", icon: ShieldCheck },
  { title: "From Waste to Value", description: "Creating high-quality rPET for a better tomorrow", icon: Sprout },
];

export default function SustainabilityTrustStrip() {
  return (
    <section className="relative z-10 -mt-8 sm:-mt-10">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-[0_20px_45px_-25px_rgba(6,43,58,0.35)] sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ title, description, icon: Icon }) => (
            <RevealItem key={title} className="flex items-start gap-3 bg-white px-5 py-5">
              <Icon className="size-9 shrink-0 stroke-[1.5] text-brand-blue" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-navy">{title}</p>
                <p className="mt-0.5 text-xs text-slate">{description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
