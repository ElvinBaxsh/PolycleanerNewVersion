"use client";

import Image from "next/image";
import { Check, Settings, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CapabilitiesAndQuality() {
  const { t } = useLanguage();
  return (
    <section className="bg-slate-50/50 py-12 lg:py-16">
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
        
        {/* Process Capabilities Card */}
        <Reveal className="flex flex-col h-full rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3">
            <Settings className="size-7 sm:size-8 shrink-0 text-[#0F2A4A] stroke-[1.4]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#0F2A4A]">
              {t.process.capabilitiesTitle}
            </h3>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal">
            {t.process.capabilitiesDescription}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-1">
            {/* Left Bullet List */}
            <ul className="md:col-span-7 space-y-2 text-xs sm:text-[13px] text-slate-600 font-medium">
              {t.processCapabilities.map((item) => (
                <li key={item} className="flex items-start gap-2 leading-snug">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500 stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Right Image */}
            <div className="relative md:col-span-5 h-48 sm:h-56 md:h-full min-h-[180px] w-full overflow-hidden rounded-xl border border-slate-100 shadow-xs">
              <Image
                src="/images/processCapabilities.jpg"
                alt="Sorting & washing line"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 100vw"
              />
            </div>
          </div>
        </Reveal>

        {/* Quality Control & Documentation Card */}
        <Reveal delay={0.1} className="flex flex-col h-full rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-7 sm:size-8 shrink-0 text-[#0F2A4A] stroke-[1.4]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#0F2A4A]">
              {t.process.qualityTitle}
            </h3>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal">
            {t.process.qualityDescription}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-1">
            {/* Left Bullet List */}
            <ul className="md:col-span-7 space-y-2 text-xs sm:text-[13px] text-slate-600 font-medium">
              {t.qualityControl.map((item) => (
                <li key={item} className="flex items-start gap-2 leading-snug">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500 stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Right Image */}
            <div className="relative md:col-span-5 h-48 sm:h-56 md:h-full min-h-[180px] w-full overflow-hidden rounded-xl border border-slate-100 shadow-xs">
              <Image
                src="/images/controlDocumention.jpg"
                alt="Lab / quality control testing"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 100vw"
              />
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}