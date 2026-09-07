import {
  ClipboardCheck,
  Globe2,
  MapPin,
  ShieldCheck,
  PackageSearch,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import MaskIcon from "@/components/ui/MaskIcon";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";

const ITEMS: { label: string; sub: string; icon?: LucideIcon; image?: string }[] = [
  { label: "PRODUCER", sub: "NOT A TRADER", image: "/images/icons/trimmed/producerTrader.png" },
  { label: "DOCUMENTED &", sub: "AUDITABLE", icon: ClipboardCheck },
  { label: "EXPORT READY", sub: "WORLDWIDE", icon: Globe2 },
  { label: "BALAKHANI", sub: "INDUSTRIAL PARK", icon: MapPin },
  { label: "TRACEABLE", sub: "OPERATIONS", icon: ShieldCheck },
  { label: "TRIAL VOLUMES", sub: "AVAILABLE", icon: PackageSearch },
];

export default function TrustBar() {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-14">
      <Container>
        {/*
          A CSS grid with a fixed column count per breakpoint always lays
          items out in complete, even rows (2/2/2 on mobile, 3/3 on tablet,
          all 6 in one row on desktop). The previous flex-wrap approach let
          the browser pack as many items as happened to fit per line, which
          produced an uneven 2/3/1 split on narrow phones.
        */}
        <RevealGroup className="grid grid-cols-2 gap-x-2 gap-y-7 rounded-2xl border border-slate-200/80 bg-white px-4 py-7 shadow-2xl shadow-slate-900/15 sm:grid-cols-3 sm:gap-y-8 lg:grid-cols-6 lg:gap-y-0 lg:py-8">
          {ITEMS.map(({ label, sub, icon: Icon, image }) => (
            <RevealItem key={label} className="flex flex-col items-center justify-center gap-3 px-2 text-center">
              {image ? (
                <MaskIcon src={image} className="size-12 text-[#0f2d4a] sm:size-14" />
              ) : (
                Icon && <Icon className="size-12 stroke-[1.5] text-[#0f2d4a] sm:size-14" aria-hidden />
              )}
              <p className="text-xs font-black leading-snug tracking-wide text-[#0f2d4a] sm:text-sm">
                {label}
                <br />
                {sub}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}