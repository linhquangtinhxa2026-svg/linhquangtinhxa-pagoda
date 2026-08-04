"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { VISIT_GALLERY_IMAGES } from "@/data/visitData";
import { Lightbox } from "@/components/public/Lightbox";

export function VisitGallery() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxImages = VISIT_GALLERY_IMAGES.map((image) => ({
    src: image.src,
    alt: t(`visitPage.${image.key}Alt`),
  }));

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("visitPage.galleryEyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.galleryTitle")}{" "}
            <span className="text-[#c4973a] italic">{t("visitPage.galleryTitleEmphasis")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {VISIT_GALLERY_IMAGES.map((image, index) => (
            <button
              key={image.key}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={t(`visitPage.${image.key}Alt`)}
              className="group relative aspect-square w-full overflow-hidden cursor-pointer"
            >
              <Image
                src={image.src}
                alt={t(`visitPage.${image.key}Alt`)}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1c0a0a]/0 group-hover:bg-[#1c0a0a]/20 transition-colors duration-300" />
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
