import {
  MessageCircle,
  FileText,
  Settings2,
  Ship,
  Handshake,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { HOW_WE_WORK } from "@/lib/constants";

const ICONS: LucideIcon[] = [MessageCircle, FileText, ClipboardList, Settings2, Ship, Handshake];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="section-y scroll-mt-24 bg-soft-gray">
      <Container>
        <Reveal>
          <SectionHeading title="How We Work" />
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {HOW_WE_WORK.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={step.title} className="relative flex flex-col items-center gap-2 text-center">
                <span className="absolute -top-2 -right-1 flex size-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white sm:right-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex size-20 items-center justify-center rounded-full bg-white text-brand-blue">
                  <Icon className="size-9 stroke-[1.5]" aria-hidden />
                </span>
                <p className="text-sm font-bold text-navy">{step.title}</p>
                <p className="text-xs leading-relaxed text-slate">{step.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
