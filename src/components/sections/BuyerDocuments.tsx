"use client";

import { Download, FileText } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useInquiryModal } from "@/components/inquiry/InquiryModalContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BUYER_DOCUMENTS } from "@/lib/constants";

export default function BuyerDocuments({
  bg = "soft",
}: {
  bg?: "soft" | "white";
}) {
  const { open } = useInquiryModal();
  const { t } = useLanguage();

  return (
    <section className={`py-8 sm:py-10 ${bg === "soft" ? "bg-[#F4F7FA]" : "bg-white"}`}>
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Sol Tərəf - Başlıq və Açıqlama */}
        <Reveal className="max-w-xs shrink-0">
          <h2 className="text-xl font-extrabold tracking-tight text-[#1B365D] sm:text-2xl">{t.home.buyerDocsTitle}</h2>
          <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">{t.home.buyerDocsDescription}</p>
        </Reveal>

        {/* Sağ Tərəf - Dizayndakı kimi eyni ölçülü və böyük ikonlu kartlar */}
        <RevealGroup className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
          {BUYER_DOCUMENTS.map((doc, i) => (
            <RevealItem key={doc.name} className="h-full">
              {doc.file ? (
                <a
                  href={doc.file}
                  download
                  className="group flex h-[82px] w-full items-center gap-2.5 rounded-lg border border-slate-100 bg-white p-3 text-left shadow-xs transition-all hover:border-slate-200 hover:shadow-sm"
                >
                  <BuyerDocCardContent doc={{ name: t.buyerDocuments[i].name, format: doc.format }} />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => open({ type: "documents" })}
                  className="group flex h-[82px] w-full items-center gap-2.5 rounded-lg border border-slate-100 bg-white p-3 text-left shadow-xs transition-all hover:border-slate-200 hover:shadow-sm"
                >
                  <BuyerDocCardContent doc={{ name: t.buyerDocuments[i].name, format: doc.format }} />
                </button>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function BuyerDocCardContent({ doc }: { doc: { name: string; format: string } }) {
  return (
    <>
      {/* Sol Böyüdülmüş PDF Vector İkonu */}
      <div className="flex shrink-0 items-center justify-center text-[#1B365D]">
        <FileText className="size-10 stroke-[1.3]" />
      </div>

      {/* Sağ Tərəf: Ad, PDF mətni və Yükləmə İkonu */}
      <div className="flex h-full min-w-0 flex-1 flex-col justify-between py-0.5">
        <p className="text-[11px] font-bold leading-tight text-[#1B365D] sm:text-[12px] line-clamp-2">
          {doc.name}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-wide text-slate-400">{doc.format}</span>
          <Download className="size-3.5 shrink-0 text-[#1B365D] transition-transform group-hover:translate-y-0.5" />
        </div>
      </div>
    </>
  );
}