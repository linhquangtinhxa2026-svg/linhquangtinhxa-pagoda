"use client";

import { useTranslation } from "react-i18next";
import {
  RECURRING_ACTIVITY_KEYS,
  type RecurringActivityKey,
} from "@/data/visitData";
import {
  VisitIcon,
  type VisitIconKey,
} from "@/components/public/visit/VisitIcon";

const RECURRING_ICONS: Record<RecurringActivityKey, VisitIconKey> = {
  refuge: "wish",
  repentanceChanting: "pray",
  clinic: "medicine",
};

export function VisitRecurringActivities() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("visitPage.recurringEyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.recurringTitle")}{" "}
            <span className="text-[#c4973a] italic">
              {t("visitPage.recurringTitleEmphasis")}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
            {t("visitPage.recurringSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {RECURRING_ACTIVITY_KEYS.map(key => (
            <div
              key={key}
              className="bg-[#2c1810]/5 border-2 border-transparent hover:border-[#c4973a] transition-colors duration-300 p-6 sm:p-8"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#c4973a]/30 text-[#c4973a]">
                <VisitIcon iconKey={RECURRING_ICONS[key]} />
              </div>
              <h3
                className="mt-5 text-lg sm:text-xl font-semibold text-[#1c0a0a]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t(`visitPage.${key}Title`)}
              </h3>
              <p className="mt-2 text-xs tracking-widest uppercase font-semibold text-[#c4973a] leading-relaxed">
                <span className="block">{t(`visitPage.${key}ScheduleDay`)}</span>
                <span className="block">{t(`visitPage.${key}ScheduleTime`)}</span>
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#2c1810]/60">
                {t(`visitPage.${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
