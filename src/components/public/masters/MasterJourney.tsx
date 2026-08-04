"use client";

import { useTranslation } from "react-i18next";
import { MASTER_JOURNEY_LENGTH, type MasterKey } from "@/data/mastersData";

export function MasterJourney({ masterKey }: { masterKey: MasterKey }) {
  const { t } = useTranslation();
  const steps = Array.from({ length: MASTER_JOURNEY_LENGTH[masterKey] }, (_, i) => i + 1);

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
          {t("masterDetail.journeyEyebrow")}
        </span>
        <h2
          className="mt-4 text-3xl sm:text-4xl font-semibold text-[#fdf8f0]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {t("masterDetail.journeyTitle")}
        </h2>

        <div className="relative mt-12 pl-8 border-l-2 border-[#c4973a]/20 space-y-12">
          {steps.map((step) => (
            <div key={step} className="relative">
              <span className="absolute -left-[calc(2rem+7px)] top-1.5 w-3 h-3 rounded-full bg-[#c4973a]" />
              <p className="text-sm font-semibold tracking-widest uppercase text-[#c4973a]">
                {t(`masterDetail.${masterKey}.journey${step}Year`)}
              </p>
              <h3
                className="mt-2 text-xl sm:text-2xl font-semibold text-[#fdf8f0]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t(`masterDetail.${masterKey}.journey${step}Title`)}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#e8d5c4]/60">
                {t(`masterDetail.${masterKey}.journey${step}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
