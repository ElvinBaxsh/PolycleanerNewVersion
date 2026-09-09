"use client";

import { Package } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useDocumentRequestModal } from "./DocumentRequestModalContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BuyerPackCta() {
  const { open } = useDocumentRequestModal();
  const { t } = useLanguage();

  return (
    <section className="bg-white pb-10 lg:pb-14">
      <Container>
        <Reveal className="flex flex-col items-center gap-5 rounded-2xl bg-navy p-6 text-center sm:flex-row sm:justify-between sm:text-left sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <span className="flex size-24 shrink-0 items-center justify-center text-white sm:size-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/trimmed/buyerPack.png" alt="" className="size-16 object-contain sm:size-20" />
            </span>
            <div>
              <p className="text-lg font-bold text-white">{t.documents.buyerPackTitle}</p>
              <p className="mt-1 text-sm text-white/70">
                {t.documents.buyerPackDescription}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-2 sm:items-end">
            <button
              type="button"
              onClick={open}
              className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg bg-brand-green px-7 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark"
            >
              <Package className="size-5" aria-hidden />
              {t.documents.buyerPackButton}
            </button>
            <p className="text-[11px] font-medium text-white/50">{t.documents.buyerPackFootnote}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
