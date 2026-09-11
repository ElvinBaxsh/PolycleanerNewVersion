"use client";

import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useDownloadFeedback, DownloadStatusIcon, type DownloadState } from "@/components/ui/DownloadFeedback";
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
                <BuyerDocDownload href={doc.file} name={t.buyerDocuments[i].name} format={doc.format} />
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

/** A downloadable card that shows the download happening (see useDownloadFeedback). */
function BuyerDocDownload({ href, name, format }: { href: string; name: string; format: string }) {
  const { state, start } = useDownloadFeedback();
  return (
    <a
      href={href}
      download
      onClick={start}
      className="group flex h-[82px] w-full items-center gap-2.5 rounded-lg border border-slate-100 bg-white p-3 text-left shadow-xs transition-all hover:border-slate-200 hover:shadow-sm"
    >
      <BuyerDocCardContent doc={{ name, format }} state={state} />
    </a>
  );
}

function BuyerDocCardContent({
  doc,
  state = "idle",
}: {
  doc: { name: string; format: string };
  state?: DownloadState;
}) {
  const { t } = useLanguage();
  return (
    <>
      {/* Sol Böyüdülmüş PDF Vector İkonu */}
      <motion.div
        className="flex shrink-0 items-center justify-center text-[#1B365D]"
        animate={state === "downloading" ? { y: [0, -3, 0] } : { y: 0 }}
        transition={state === "downloading" ? { duration: 0.7, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      >
        <FileText className="size-10 stroke-[1.3]" />
      </motion.div>

      {/* Sağ Tərəf: Ad, PDF mətni və Yükləmə İkonu */}
      <div className="flex h-full min-w-0 flex-1 flex-col justify-between py-0.5">
        <p className="text-[11px] font-bold leading-tight text-[#1B365D] sm:text-[12px] line-clamp-2">
          {doc.name}
        </p>

        <div className="flex items-center justify-between">
          <span
            aria-live="polite"
            className={
              state === "done"
                ? "text-[10px] font-semibold tracking-wide text-brand-green-dark"
                : "text-[10px] font-semibold tracking-wide text-slate-400"
            }
          >
            {state === "done" ? t.common.downloaded : state === "downloading" ? t.common.downloading : doc.format}
          </span>
          <DownloadStatusIcon
            state={state}
            className="size-3.5 text-[#1B365D] transition-transform group-hover:translate-y-0.5"
          />
        </div>
      </div>
    </>
  );
}