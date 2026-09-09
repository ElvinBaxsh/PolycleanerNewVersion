"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y scroll-mt-24 bg-white">
      <Container className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading title={t.documents.faqTitle} />
        </Reveal>
        <RevealGroup className="mt-8 space-y-3">
          {t.documentsFaq.map((item, i) => {
            const open = openIndex === i;
            return (
              <RevealItem key={i} className="overflow-hidden rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-navy">{item.q}</span>
                  <ChevronDown
                    className={clsx("size-4 shrink-0 text-brand-blue transition-transform", open && "rotate-180")}
                  />
                </button>
                {open && <p className="px-5 pb-4 text-sm leading-relaxed text-slate">{item.a}</p>}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
