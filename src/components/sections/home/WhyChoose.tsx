"use client";

import { Leaf, ShieldCheck, Handshake, Truck, Star, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ICONS: LucideIcon[] = [Leaf, ShieldCheck, Handshake, Truck, Star];

export default function WhyChoose() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-12 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeading title={t.home.whyChooseTitle} />
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.whyChooseItems.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem
                key={i}
                className="flex flex-col justify-start rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Dizayndakı Kimi Böyük Dairəvi İkon */}
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-brand-green/40 bg-white text-brand-green shadow-xs shrink-0">
                  <Icon className="size-8 stroke-[1.5]" aria-hidden />
                </div>

                {/* Başlıq */}
                <h3 className="mt-6 text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-navy">
                  {item.title}
                </h3>

                {/* Təsvir Mətni */}
                <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}