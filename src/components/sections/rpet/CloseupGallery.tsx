import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";

const CLOSEUPS = [
  { label: "Transparent flakes close-up", image: "/images/transparent.jpg" },
  { label: "Light Blue flakes close-up", image: "/images/lightBlue.jpg" },
  { label: "Green flakes close-up", image: "/images/green.jpg" },
  { label: "Mixed Colors flakes close-up", image: "/images/mixedColors.jpg" },
  { label: "Flakes in hand", image: "/images/closeUpViewLast.jpg" },
];

export default function CloseupGallery() {
  return (
    <section className="bg-soft-gray py-10 lg:py-14">
      <Container>
        <Reveal>
          <h2 className="text-xl font-bold text-navy sm:text-2xl">Close-up View</h2>
        </Reveal>

        {/* Dizayndakı kimi 5 kartlıq geniş Aspect-Ratio düzülüşü */}
        <RevealGroup className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CLOSEUPS.map((item) => (
            <RevealItem
              key={item.label}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xs"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}