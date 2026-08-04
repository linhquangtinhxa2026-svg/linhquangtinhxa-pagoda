"use client";

import { useTranslation } from "react-i18next";
import { ACTIVITY_ICON_KEYS } from "@/data/publicData";
import { ActivityIcon } from "@/components/public/ActivityIcon";

export function ActivitiesSection() {
  const { t } = useTranslation();

  const items = ACTIVITY_ICON_KEYS.map((iconKey, index) => ({
    iconKey,
    title: t(`activities.item${index + 1}Title`),
    description: t(`activities.item${index + 1}Desc`),
  }));

  return (
    <section id="activities" className="py-20 bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("activities.eyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("activities.title")}{" "}
            <span className="text-[#c4973a] italic">{t("activities.titleEmphasis")}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#e8d5c4]/60">
            {t("activities.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {items.map((item) => (
            <div
              key={item.iconKey}
              className="group bg-[#2c1810]/30 border-2 border-transparent hover:border-[#c4973a] transition-colors duration-300 p-6 sm:p-8"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#c4973a]/30 text-[#c4973a]">
                <ActivityIcon iconKey={item.iconKey} />
              </div>
              <h3
                className="mt-5 text-xl sm:text-2xl font-semibold text-[#fdf8f0]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#e8d5c4]/50">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
