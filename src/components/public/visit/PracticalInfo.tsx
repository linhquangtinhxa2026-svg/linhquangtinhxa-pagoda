"use client";

import { useTranslation } from "react-i18next";
import { PAGODA_INFO } from "@/data/publicData";
import { DIRECTION_KEYS } from "@/data/visitData";
import { VisitIcon, type VisitIconKey } from "@/components/public/visit/VisitIcon";

const DIRECTION_ICONS: Record<(typeof DIRECTION_KEYS)[number], VisitIconKey> = {
  car: "car",
  transit: "bus",
  rideshare: "car",
};

export function PracticalInfo() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("visitPage.infoEyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.infoTitle")}{" "}
            <span className="text-[#c4973a] italic">{t("visitPage.infoTitleEmphasis")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          <div className="bg-[#2c1810]/5 border-2 border-transparent hover:border-[#c4973a] transition-colors duration-300 p-6 sm:p-8">
            <div className="w-12 h-12 flex items-center justify-center border border-[#c4973a]/30 text-[#c4973a]">
              <VisitIcon iconKey="location" />
            </div>
            <p className="mt-5 text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("visit.addressLabel")}
            </p>
            <a
              href={PAGODA_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-base sm:text-lg text-[#2c1810]/70 hover:text-[#c4973a] transition-colors duration-200"
            >
              {PAGODA_INFO.address}
            </a>
          </div>

          <div className="bg-[#2c1810]/5 border-2 border-transparent hover:border-[#c4973a] transition-colors duration-300 p-6 sm:p-8">
            <div className="w-12 h-12 flex items-center justify-center border border-[#c4973a]/30 text-[#c4973a]">
              <VisitIcon iconKey="clock" />
            </div>
            <p className="mt-5 text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("visit.hoursLabel")}
            </p>
            <p className="mt-2 text-base sm:text-lg text-[#2c1810]/70">{t("visit.hours")}</p>
          </div>
        </div>

        <div className="max-w-2xl mb-8">
          <h3
            className="text-xl sm:text-2xl font-semibold text-[#1c0a0a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.directionsTitle")}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {DIRECTION_KEYS.map((key) => (
            <div key={key} className="border border-[#c4973a]/20 p-6">
              <div className="w-10 h-10 flex items-center justify-center text-[#c4973a]">
                <VisitIcon iconKey={DIRECTION_ICONS[key]} />
              </div>
              <h4
                className="mt-4 text-lg font-semibold text-[#1c0a0a]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t(`visitPage.${key}Title`)}
              </h4>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#2c1810]/60">
                {t(`visitPage.${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
