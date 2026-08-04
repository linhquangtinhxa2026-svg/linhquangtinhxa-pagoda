"use client";

import { useTranslation } from "react-i18next";
import { DAILY_SCHEDULE_ITEMS } from "@/data/visitData";

export function VisitDailySchedule() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("visitPage.scheduleEyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("visitPage.scheduleTitle")}{" "}
            <span className="text-[#c4973a] italic">
              {t("visitPage.scheduleTitleEmphasis")}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#e8d5c4]/50">
            {t("visitPage.scheduleSubtitle")}
          </p>
        </div>

        <ol className="relative">
          <div className="absolute left-[92px] sm:left-[116px] top-2 bottom-2 w-px bg-[#c4973a]/20" />

          {DAILY_SCHEDULE_ITEMS.map(({ time, key }) => (
            <li
              key={key}
              className="relative flex gap-6 sm:gap-10 pb-8 last:pb-0"
            >
              <div className="w-[68px] sm:w-[88px] shrink-0 text-right pt-0.5">
                <span className="text-lg sm:text-xl text-[#c4973a]">
                  {time}
                </span>
              </div>

              <span className="absolute left-[92px] sm:left-[116px] top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#c4973a] ring-4 ring-[#1c0a0a]" />

              <div className="pl-6 sm:pl-10">
                <h3 className="text-lg sm:text-xl font-semibold text-[#fdf8f0]">
                  {t(`visitPage.${key}Title`)}
                </h3>
                <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#e8d5c4]/50">
                  {t(`visitPage.${key}Desc`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
