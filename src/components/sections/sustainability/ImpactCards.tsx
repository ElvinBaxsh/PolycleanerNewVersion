import Link from "next/link";
import Image from "next/image";
import { Recycle, Trash2, ShieldCheck, Sprout, ArrowRight, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";

const ITEMS: { title: string; description: string; icon: LucideIcon; photo: string }[] = [
  {
    title: "Circular Economy",
    description: "We close the loop by turning post-consumer PET waste into valuable raw material for new products.",
    icon: Recycle,
    photo: "/images/closeUpViewLast.jpg",
  },
  {
    title: "Waste Reduction",
    description: "Our process diverts plastic waste from landfills and oceans, reducing environmental footprint.",
    icon: Trash2,
    photo: "/images/mixedColors.jpg",
  },
  {
    title: "Responsible Operations",
    description: "Energy-efficient technologies, strict quality controls, and safe working conditions guide our daily operations.",
    icon: ShieldCheck,
    photo: "/images/aboutUs.jpg",
  },
  {
    title: "Long-Term Impact",
    description: "We invest in partnerships and innovation to create lasting social, environmental, and economic value.",
    icon: Sprout,
    photo: "/images/green.jpg",
  },
];

export default function ImpactCards() {
  return (
    <section className="section-y bg-white">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title} className="overflow-hidden rounded-2xl border border-border">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.photo}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green-dark">
                    <Icon className="size-7 stroke-[1.5]" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
                  <Link href="/sustainability" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-dark">
                    Learn more <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
