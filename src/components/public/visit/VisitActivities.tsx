"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { VISIT_ACTIVITY_KEYS, VISIT_ACTIVITY_IMAGES } from "@/data/visitData";
import { VisitIcon, type VisitIconKey } from "@/components/public/visit/VisitIcon";

const ACTIVITY_ICONS: Record<(typeof VISIT_ACTIVITY_KEYS)[number], VisitIconKey> = {
  sightseeing: "sightseeing",
  pray: "pray",
  wish: "wish",
  festival: "festival",
};

export function VisitActivities() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("visitPage.activitiesEyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.activitiesTitle")}{" "}
            <span className="text-[#c4973a] italic">{t("visitPage.activitiesTitleEmphasis")}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
            {t("visitPage.activitiesSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
          {VISIT_ACTIVITY_KEYS.map((key) => (
            <div key={key} className="group">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={VISIT_ACTIVITY_IMAGES[key]}
                  alt={t(`visitPage.${key}Title`)}
                  fill
                  sizes="(min-width: 640px) 50vw, 90vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #1c0a0a 0%, rgba(28,10,10,0.15) 55%, transparent 100%)",
                  }}
                />
                <div className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center bg-[#1c0a0a]/80 border border-[#c4973a]/40 text-[#c4973a]">
                  <VisitIcon iconKey={ACTIVITY_ICONS[key]} />
                </div>
                <h3
                  className="absolute bottom-4 left-4 right-4 text-xl sm:text-2xl font-semibold text-[#fdf8f0]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t(`visitPage.${key}Title`)}
                </h3>
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#2c1810]/60">
                {t(`visitPage.${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
