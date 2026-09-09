"use client";

import Link from "next/link";
import Image from "next/image";
import { Recycle, Trash2, ShieldCheck, Globe, ArrowRight, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";

const ICONS: LucideIcon[] = [Recycle, Trash2, ShieldCheck, Globe];
const PHOTOS = ["/images/CircularEconomy.jpg", "/images/WasteReduction.jpg", "/images/ResponsibleOperations.jpg", "/images/LongTermImpact.jpg"];
const HREFS = ["/sustainability#circular-economy", "/sustainability#impact", "/process-quality", "/sustainability#pillars"];

export default function ImpactCards() {
  const { t, locale } = useLanguage();
  return (
    <section className="bg-white py-8 md:py-10 lg:py-12">
      <Container>
        <RevealGroup className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.impactCards.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem
                key={i}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={PHOTOS[i]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5">
                  {/* `relative` promotes the badge to the positioned-elements
                      paint layer — without it, the absolutely-positioned
                      (fill) photo above always paints over a plain in-flow
                      sibling, regardless of DOM order, hiding the icon. */}
                  <span className="relative -mt-8 flex size-16 items-center justify-center rounded-full bg-white text-brand-green-dark shadow-md ring-1 ring-black/5">
                    <Icon className="size-8 stroke-[1.5]" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
                  <Link
                    href={localizePath(HREFS[i], locale)}
                    className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-brand-green-dark"
                  >
                    {t.common.learnMore} <ArrowRight className="size-3.5" />
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
