import { Truck, Layers, Droplet, Wind, ShieldCheck, PackageCheck, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import StepIcon from "@/components/ui/StepIcon";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { PROCESS_STEPS } from "@/lib/constants";

const ICONS: LucideIcon[] = [Truck, Layers, Droplet, Wind, ShieldCheck, PackageCheck];

export default function FullProcessFlow() {
  return (
    <section className="section-y bg-white">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={step.name} className="relative flex flex-col items-center gap-3 text-center">
                <span className="absolute -top-2 -right-1 flex size-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white sm:right-2">
                  {i + 1}
                </span>
                <span className="flex size-24 items-center justify-center rounded-full border border-border bg-soft-gray text-brand-green">
                  <StepIcon name={step.name} fallback={Icon} className="size-14" />
                </span>
                <p className="text-xs font-bold uppercase tracking-wide text-navy">{step.name}</p>
                <p className="text-xs leading-relaxed text-slate">{step.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
