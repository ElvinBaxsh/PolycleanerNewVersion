import Image from "next/image";
import { MapPin, CalendarDays, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const FACTS: { icon: LucideIcon | null; label: string; value: string }[] = [
  { icon: MapPin, label: "Location", value: "Balakhani Industrial Park, Baku, Azerbaijan" },
  { icon: CalendarDays, label: "Founded", value: "Built for modern recycling and global markets" },
  { icon: null, label: "Markets", value: "Exporting to Europe, Asia, Middle East & beyond" },
];

export default function CompanyOverview() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <Container className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Sol Hissə - Şəkil */}
        <Reveal className="lg:col-span-5 w-full h-full">
          <div className="relative aspect-[4/3] w-full h-full min-h-[380px] overflow-hidden rounded-2xl shadow-xs">
            <Image
              src="/images/aboutImg.jpg"
              alt="Poly Cleaner facility, Balakhani Industrial Park"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </Reveal>

        {/* Sağ Hissə - Şəkildən kənara çıxmayan, tam şəklin hündürlüyündə blok */}
        <Reveal delay={0.1} className="lg:col-span-7 flex flex-col justify-between h-full py-1">
          {/* Yuxarı Mətn Hissəsi */}
          <div>
            {/* Eyebrow */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#258D2A]">
              COMPANY OVERVIEW
            </p>

            {/* Əsas Başlıq - Export-ready tam alt sətirdə */}
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-[32px] font-extrabold leading-[1.25] text-[#0F2A4A]">
              Azerbaijan-based. Quality-driven. <br className="hidden sm:block" />
              Export-ready.
            </h2>

            {/* Paraqraflar */}
            <div className="mt-3.5 space-y-3 text-xs sm:text-sm font-medium leading-relaxed text-slate-600">
              <p>
                Poly Cleaner MMC operates in the Balakhani Industrial Park, Baku, Azerbaijan, with a
                purpose-built facility designed for efficient and sustainable rPET flakes
                production. Our advanced hot wash technology, strict quality control and responsible
                operations enable us to deliver consistent products that meet international
                standards.
              </p>
              <p>
                We are committed to long-term partnerships, transparent communication and creating
                value from waste — for our customers, our community and the planet.
              </p>
            </div>
          </div>

          {/* Aşağı Faktlar Bölməsi - İkonlar böyüdüldü və yanındakı mətnlərlə hizalandı */}
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
            {FACTS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                {Icon ? (
                  <Icon className="size-9 sm:size-10 shrink-0 text-[#1B365D] stroke-[1.4]" />
                ) : (
                  <span className="relative size-9 shrink-0 sm:size-10">
                    <Image
                      src="/images/icons/trimmed/globus-1B365D.png"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-[13px] font-bold text-[#1B365D] leading-tight">
                    {label}
                  </p>
                  <p className="mt-0.5 text-[11px] sm:text-xs leading-tight text-slate-500 font-normal">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}