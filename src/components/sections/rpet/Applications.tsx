import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { APPLICATIONS } from "@/lib/constants";

const ICON_IMAGES = [
  "/images/icons/trimmed/sheet.png",
  "/images/icons/trimmed/strap.png",
  "/images/icons/trimmed/fiber.png",
  "/images/icons/trimmed/nonFood.png",
  "/images/icons/trimmed/trading.png",
];

export default function Applications() {
  return (
    <section className="bg-soft-gray py-8 lg:py-10">
      <Container>
        <Reveal>
          <SectionHeading title="Applications" description="Our rPET flakes are used across a wide range of industries." />
        </Reveal>
        <RevealGroup className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {APPLICATIONS.map((app, i) => (
            <RevealItem key={app.name} className="flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-white p-4 text-center">
              {/* Fixed height + auto width (plain img, not next/image fill):
                  every icon's actual ink ends up the same height regardless
                  of whether the source glyph is wide/flat (Sheet, Strap) or
                  squarish (Trading) — a fixed square box would've let the
                  flat ones look smaller. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ICON_IMAGES[i]}
                alt=""
                className="h-auto max-h-14 w-auto max-w-[100px] object-contain sm:max-h-16 sm:max-w-[116px]"
              />
              <p className="text-sm font-bold uppercase tracking-wide text-navy">{app.name}</p>
              <p className="text-xs text-slate">{app.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
