"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { GalleryItem } from "@/types/news";
import { Lightbox } from "@/components/public/Lightbox";

export function NewsGallery({ gallery }: { gallery: GalleryItem[] }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (gallery.length === 0) return null;

  const lightboxMedia = gallery.map((item) => ({ src: item.url, alt: "", type: item.type }));

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl sm:text-3xl font-semibold text-[#1c0a0a] mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {t("newsPage.galleryTitle")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={item.type === "video" ? "View video" : "View image"}
              className="group relative aspect-square w-full overflow-hidden cursor-pointer"
            >
              {item.type === "video" ? (

                <video src={item.url} muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <Image
                  src={item.url}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-[#1c0a0a]/0 group-hover:bg-[#1c0a0a]/30 transition-colors duration-300" />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#1c0a0a]/60 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#fdf8f0] translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        images={lightboxMedia}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
