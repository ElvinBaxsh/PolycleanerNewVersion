import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { PRODUCT_GRADES } from "@/lib/constants";

export default function ProductGrades() {
  return (
    <section className="section-y bg-white">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Product Range"
            title="Our rPET Flakes Grades"
            description="Different colors and specifications to suit your production needs."
          />
          <Button href="/rpet-flakes" showArrow className="shrink-0">
            View All Products
          </Button>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_GRADES.map((grade) => (
            <RevealItem key={grade.slug} id={grade.slug} className="scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={grade.image}
                  alt={`${grade.name} rPET flakes close-up`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-navy">{grade.name}</h3>
                <p className="mt-1 text-sm text-slate">{grade.description}</p>
                <Link
                  href={`#${grade.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
                >
                  View Details
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
