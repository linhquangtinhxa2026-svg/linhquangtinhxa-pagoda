"use client";

import { useTranslation } from "react-i18next";
import { ETIQUETTE_ITEMS } from "@/data/visitData";
import { VisitIcon } from "@/components/public/visit/VisitIcon";

export function VisitEtiquette() {
  const { t } = useTranslation();
  const doItems = ETIQUETTE_ITEMS.filter((item) => item.isDo);
  const dontItems = ETIQUETTE_ITEMS.filter((item) => !item.isDo);

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("visitPage.etiquetteEyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.etiquetteTitle")}{" "}
            <span className="text-[#c4973a] italic">{t("visitPage.etiquetteTitleEmphasis")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-5">
            <h3 className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("visitPage.etiquetteDoLabel")}
            </h3>
            {doItems.map((item) => (
              <div key={item.key} className="flex items-start gap-3">
                <span className="mt-0.5 text-[#c4973a] shrink-0">
                  <VisitIcon iconKey="check" />
                </span>
                <p className="text-sm sm:text-base leading-relaxed text-[#e8d5c4]/70">
                  {t(`visitPage.${item.key}`)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <h3 className="text-xs tracking-widest uppercase font-semibold text-[#8b3a2e]">
              {t("visitPage.etiquetteDontLabel")}
            </h3>
            {dontItems.map((item) => (
              <div key={item.key} className="flex items-start gap-3">
                <span className="mt-0.5 text-[#8b3a2e] shrink-0">
                  <VisitIcon iconKey="cross" />
                </span>
                <p className="text-sm sm:text-base leading-relaxed text-[#e8d5c4]/70">
                  {t(`visitPage.${item.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
