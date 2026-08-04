"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { HISTORY_GALLERY_IMAGES } from "@/data/historyData";
import { VINTAGE_FILTER } from "@/lib/vintagePhoto";
import { Lightbox } from "@/components/public/Lightbox";

export function HistoryGallery() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxImages = HISTORY_GALLERY_IMAGES.map((image) => ({
    src: image.src,
    alt: t(`historyGallery.${image.key}Alt`),
  }));

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("historyGallery.eyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("historyGallery.title")}{" "}
            <span className="text-[#c4973a] italic">{t("historyGallery.titleEmphasis")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {HISTORY_GALLERY_IMAGES.map((image, index) => (
            <button
              key={image.key}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={t(`historyGallery.${image.key}Alt`)}
              className="group relative aspect-square w-full overflow-hidden cursor-pointer"
            >
              <Image
                src={image.src}
                alt={t(`historyGallery.${image.key}Alt`)}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                style={{ filter: VINTAGE_FILTER }}
              />
              <div className="absolute inset-0 bg-[#1c0a0a]/0 group-hover:bg-[#1c0a0a]/20 transition-colors duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c4973a] transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
