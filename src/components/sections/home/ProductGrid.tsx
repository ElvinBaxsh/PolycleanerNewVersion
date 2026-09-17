"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import SlashBreaks from "@/components/ui/SlashBreaks";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePath } from "@/lib/i18n/localizePath";
import { PRODUCT_GRADES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function ProductGrid() {
  const { t, locale } = useLanguage();
  return (
    <section className="bg-white pt-12 pb-6 lg:pt-16 lg:pb-8">
      {/* Intro beside the cards only from xl. Between 1024 and 1279px the
          intro column left each card ~122px wide, too narrow for words like
          "termoformalaşdırma" and "ŞƏFFAF/AÇIQ", which the card's rounded
          overflow clip then cut off — so the intro sits above the cards
          there, and the cards get the full width. */}
      <Container className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        {/* Sol tərəf: Dizayndakı kimi daha geniş və yana yayılan mətn */}
        <Reveal className="flex flex-col items-start xl:max-w-[400px] xl:shrink-0">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {t.home.productsTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t.home.productsDescription}
          </p>

          <Link
            href={localizePath("/rpet-flakes", locale)}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#2E7D32] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1B5E20]"
          >
            {t.common.viewAllProducts}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        {/* Sağ tərəf: 4-lü Məhsul Kartları — four across from md; at 640px four
            columns were as narrow as the desktop problem above. */}
        <RevealGroup className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {PRODUCT_GRADES.map((grade, i) => {
            const gradeText = t.productGrades[i];
            return (
            <RevealItem key={grade.slug}>
              <Link
                href={localizePath(`/rpet-flakes#${grade.slug}`, locale)}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xs transition-all duration-300 hover:shadow-md"
              >
                {/* Şəkil Bloku */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <Image
                    src={grade.image}
                    alt={`${gradeText.name} rPET flakes close-up`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
                  />
                </div>

                {/* Mətn Bloku */}
                <div className="flex flex-1 flex-col justify-start p-4 sm:p-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy sm:text-[13px]">
                    <SlashBreaks text={gradeText.name} />
                  </h3>
                  <p className="mt-2 text-xs leading-normal text-slate-500">
                    {gradeText.description}
                  </p>
                </div>
              </Link>
            </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
