"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { DOCUMENTS_FAQ } from "@/lib/constants";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y scroll-mt-24 bg-white">
      <Container className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading title="Frequently Asked Questions" />
        </Reveal>
        <RevealGroup className="mt-8 space-y-3">
          {DOCUMENTS_FAQ.map((item, i) => {
            const open = openIndex === i;
            return (
              <RevealItem key={item.q} className="overflow-hidden rounded-xl border border-border">
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
