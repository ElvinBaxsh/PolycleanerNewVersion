"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function SpecsAndInfo() {
  const { t } = useLanguage();
  return (
    <section className="bg-slate-50/50 py-12 lg:py-16">
      <Container className="grid grid-cols-1 gap-8 items-stretch lg:grid-cols-2">
        {/* Specifications Table */}
        <Reveal className="flex flex-col h-full">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F2A4A]">
            {t.rpet.specsTitle}
          </h2>
          <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs flex flex-col">
            <table className="w-full h-full border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100 h-full">
                {t.specTable.map((row) => (
                  <tr key={row.label} className="transition-colors hover:bg-slate-50/40">
                    <td className="w-[38%] bg-slate-50/80 px-4 py-2.5 font-bold text-[#0F2A4A] align-middle">
                      {row.label}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-600 align-middle">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Product Information Card */}
        <Reveal delay={0.1} className="flex flex-col h-full">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F2A4A]">
            {t.rpet.productInfoTitle}
          </h2>
          <div className="mt-4 flex-1 rounded-xl border border-slate-200/80 bg-white shadow-xs flex flex-col justify-between overflow-hidden">
            <ul className="divide-y divide-slate-100 flex-1 flex flex-col justify-between">
              {t.productInfo.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 px-4 py-2.5 flex-1 text-xs sm:text-sm leading-tight"
                >
                  <span className="font-bold text-emerald-500 shrink-0 select-none" aria-hidden>
                    &#8212;
                  </span>
                  <div className="text-slate-600">
                    <span className="font-bold text-[#0F2A4A]">{item.label}:</span>{" "}
                    <span className="font-medium">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}