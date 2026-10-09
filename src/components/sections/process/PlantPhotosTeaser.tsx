"use client";

import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { RevealGroup, RevealItem } from "@/components/ui/RevealGroup";
import { useFactoryGallery } from "@/components/gallery/FactoryGallery";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FACTORY_GALLERY } from "@/lib/constants";

// Three frames out of the gallery, one per card, by their position in
// FACTORY_GALLERY: the equipment hall, the plant from outside, and the
// sorting line. A card opens the gallery on its own photo.
const CARD_PHOTOS = [12, 0, 8];

/**
 * A preview of the plant photographs under the capabilities cards: three
 * large frames and a way into the rest. It is a teaser, not the gallery —
 * the full set still lives in the modal, so the page gains one row rather
 * than a wall of pictures.
 *
 * Shares the capabilities section's background and has no top padding, so
 * the two read as one block.
 */
export default function PlantPhotosTeaser() {
  const { t } = useLanguage();
  const { openGrid, openAt, modal } = useFactoryGallery();
  const total = FACTORY_GALLERY.length;

  return (
    <section className="bg-slate-50/50 pb-12 lg:pb-16">
      <Container>
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="block h-1 w-16 rounded-full bg-brand-green" aria-hidden />
            <h2 className="mt-4 text-[26px] font-bold leading-[1.15] text-navy sm:text-[30px] lg:text-[34px]">
              {t.gallery.teaserTitle}
            </h2>
            <p className="mt-2 text-sm text-slate sm:text-base">{t.gallery.teaserDescription}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={openGrid}
              className="group inline-flex h-12 cursor-pointer items-center gap-3 rounded-full border-2 border-navy bg-white px-5 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Images className="size-5 text-brand-green" aria-hidden />
              {t.gallery.allPlantPhotos}
              <ArrowRight className="size-4 text-brand-green transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <span className="border-l border-border pl-4 text-sm font-semibold tabular-nums text-slate/70">
              {t.gallery.count(total)}
            </span>
          </div>
        </Reveal>

        {/* On a phone the three cards sit in one row that scrolls sideways
            and snaps card by card, rather than stacking into three screens
            of photographs. The row bleeds to the screen edges (-mx-5/px-5
            undoes the container's padding) so a card can slide out under
            the edge, and each card is a little narrower than the screen so
            the next one shows — that sliver is what says "there is more". */}
        <RevealGroup className="scrollbar-none -mx-5 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
          {CARD_PHOTOS.map((photoIndex, i) => (
            <RevealItem key={photoIndex} className="w-[84%] shrink-0 snap-center sm:w-auto">
              <button
                type="button"
                onClick={() => openAt(photoIndex)}
                className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-navy text-left shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:aspect-[6/5]"
              >
                <Image
                  src={FACTORY_GALLERY[photoIndex].src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 84vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Darkens only the foot of the photo, where the caption sits. */}
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/90 to-transparent" aria-hidden />
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="block h-0.5 w-10 rounded-full bg-brand-green" aria-hidden />
                  <span className="mt-2 block text-lg font-bold text-white sm:text-xl">
                    {t.gallery.teaserCards[i]}
                  </span>
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {modal}
    </section>
  );
}
