"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/constants/routes";
import { Lightbox } from "@/components/public/Lightbox";

const GALLERY_PREVIEW_IMAGES = [
  { key: "media01", src: "/images/media/image_01.png" },
  { key: "media02", src: "/images/media/image_02.png" },
  { key: "media03", src: "/images/media/image_03.png" },
  { key: "media04", src: "/images/media/image_04.png" },
  { key: "media05", src: "/images/media/image_05.png" },
  { key: "media06", src: "/images/media/image_06.png" },
  { key: "media07", src: "/images/media/image_07.png" },
  { key: "media08", src: "/images/media/image_08.png" },
  { key: "media09", src: "/images/media/image_09.png" },
  { key: "media10", src: "/images/media/image_10.png" },
] as const;

export function GalleryPreview() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxImages = GALLERY_PREVIEW_IMAGES.map((image) => ({
    src: image.src,
    alt: t(`galleryPreview.${image.key}Alt`),
  }));

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("galleryPreview.eyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("galleryPreview.title")}{" "}
            <span className="text-[#c4973a] italic">{t("galleryPreview.titleEmphasis")}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#e8d5c4]/60">
            {t("galleryPreview.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {GALLERY_PREVIEW_IMAGES.map((image, index) => (
            <button
              key={image.key}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={t(`galleryPreview.${image.key}Alt`)}
              className="group relative aspect-square w-full overflow-hidden cursor-pointer"
            >
              <Image
                src={image.src}
                alt={t(`galleryPreview.${image.key}Alt`)}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1c0a0a]/0 group-hover:bg-[#1c0a0a]/20 transition-colors duration-300" />
            </button>
          ))}
        </div>

        <Link
          href={ROUTES.HISTORY}
          className="mt-10 inline-block px-8 py-3.5 border border-[#c4973a] text-[#c4973a] hover:bg-[#c4973a] hover:text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200"
        >
          {t("galleryPreview.cta")}
        </Link>
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
