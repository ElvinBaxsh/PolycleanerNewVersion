import { MapPin, ShieldCheck, Recycle, Truck, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";

const ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "Made in Azerbaijan\nExport to Europe", icon: MapPin },
  { label: "Consistent\nQuality", icon: ShieldCheck },
  { label: "Sustainable &\nTraceable", icon: Recycle },
  { label: "Reliable\nSupply", icon: Truck },
];

export default function RpetTrustStrip() {
  return (
    <section className="relative z-10 -mt-8 sm:-mt-10">
      <Container className="max-w-[1400px]">
        <RevealGroup className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-md sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {ITEMS.map(({ label, icon: Icon }) => (
            <RevealItem 
              key={label} 
              className="flex items-center gap-3.5 px-5 py-4 sm:px-6 sm:py-5"
            >
              {/* İkon - 2 sətirlik mətnin hündürlüyünə tam mütənasibdir */}
              <Icon 
                className="size-10 sm:size-11 shrink-0 text-[#0F2A4A] stroke-[1.4]" 
                aria-hidden 
              />
              
              {/* Mətn - Uppercase, tünd göy və 2 sətirə sığan */}
              <p className="whitespace-pre-line text-[11px] sm:text-xs font-extrabold uppercase leading-tight tracking-wide text-[#0F2A4A]">
                {label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}