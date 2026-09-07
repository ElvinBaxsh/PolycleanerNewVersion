import {
  Trash2,
  Settings,
  Droplet,
  Wind,
  Grid3x3,
  CheckCircle2,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import StepIcon from "@/components/ui/StepIcon";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { SUSTAINABILITY_STEPS } from "@/lib/constants";

const ICONS: LucideIcon[] = [Trash2, Settings, Droplet, Wind, Grid3x3, CheckCircle2, PackageCheck];

export default function BottleToFlakeStrip() {
  return (
    <section className="section-y bg-soft-gray">
      <Container>
        <Reveal>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">From Bottles to High-Quality rPET Flakes</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
          {SUSTAINABILITY_STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={step.name} className="flex flex-col items-center gap-2 text-center">
                <span className="flex size-24 items-center justify-center rounded-full border border-border bg-white text-brand-green">
                  <StepIcon name={step.name} fallback={Icon} className="size-14" />
                </span>
                <p className="text-xs font-bold text-navy">
                  {i + 1}. {step.name}
                </p>
                <p className="text-[11px] leading-relaxed text-slate">{step.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
