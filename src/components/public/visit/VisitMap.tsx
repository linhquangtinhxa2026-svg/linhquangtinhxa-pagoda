"use client";

import { useTranslation } from "react-i18next";
import { PAGODA_INFO } from "@/data/publicData";

export function VisitMap() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mb-10">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("visitPage.mapEyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.mapTitle")}{" "}
            <span className="text-[#c4973a] italic">{t("visitPage.mapTitleEmphasis")}</span>
          </h2>
        </div>

        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] border-2 border-[#c4973a]/20">
          <iframe
            src={PAGODA_INFO.mapEmbedUrl}
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            title={PAGODA_INFO.name}
          />
        </div>
      </div>
    </section>
  );
}
