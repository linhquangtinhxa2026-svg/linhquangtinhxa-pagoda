"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  HISTORY_ERA_KEYS,
  HISTORY_ERAS,
  HISTORY_LINEAGE_IMAGE,
} from "@/data/historyData";
import { MASTERS, MASTER_KEYS, type MasterKey } from "@/data/mastersData";
import { ROUTES } from "@/constants/routes";
import { VINTAGE_FILTER } from "@/lib/vintagePhoto";

const LINEAGE_LINE_KEYS: Record<MasterKey, string> = {
  founder: "lineageFounderLine",
  pastAbbot: "lineagePastAbbotLine",
  abbot: "lineageAbbotLine",
};

export function HistoryTimeline() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {HISTORY_ERA_KEYS.map((key, index) => {
          const era = HISTORY_ERAS[key];
          const imageFirst = index % 2 === 0;
          const descIndices = Array.from(
            { length: era.descCount },
            (_, i) => i + 1,
          );

          return (
            <div
              key={key}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div
                className={`relative ${era.imageAspectClass ?? "aspect-[9/16]"} w-full overflow-hidden ${
                  imageFirst ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Image
                  src={era.image}
                  alt={t(`historyPage.${key}Title`)}
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover object-center"
                  style={{ filter: VINTAGE_FILTER }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #8b3a2e33 0%, rgba(28,10,10,0.15) 50%, transparent 100%)",
                  }}
                />
              </div>

              <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                <p
                  className="text-3xl sm:text-4xl font-semibold text-[#8b3a2e]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {key === "thirdAbbot"
                    ? t("historyPage.thirdAbbotYear")
                    : era.yearRange}
                </p>
                <h3
                  className="mt-2 text-2xl sm:text-3xl font-semibold text-[#1c0a0a]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t(`historyPage.${key}Title`)}
                </h3>

                {descIndices.map(i => (
                  <Fragment key={i}>
                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
                      {t(`historyPage.${key}Desc${i}`)}
                    </p>
                    {key === "succession" && i === 3 && (
                      <ul className="mt-2 space-y-2">
                        {[1, 2, 3, 4, 5].map(bulletIndex => (
                          <li
                            key={bulletIndex}
                            className="flex gap-3 text-base sm:text-lg leading-relaxed text-[#2c1810]/60"
                          >
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#c4973a] shrink-0" />
                            <span>
                              {t(`historyPage.successionBullet${bulletIndex}`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Fragment>
                ))}

                {era.masterKey && (
                  <Link
                    href={`${ROUTES.MASTERS}/${MASTERS[era.masterKey].slug}`}
                    className="group/master mt-6 flex items-center gap-4 border-t border-[#c4973a]/20 pt-6"
                  >
                    <div className="relative w-16 h-16 shrink-0 overflow-hidden">
                      <Image
                        src={MASTERS[era.masterKey].image}
                        alt={MASTERS[era.masterKey].name}
                        fill
                        sizes="64px"
                        className="object-cover object-center transition-transform duration-500 group-hover/master:scale-105"
                      />
                    </div>
                    <div>
                      <p
                        className="text-base font-semibold text-[#1c0a0a] group-hover/master:text-[#8b3a2e] transition-colors duration-200"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {MASTERS[era.masterKey].name}
                      </p>
                      <p className="text-xs tracking-widest uppercase text-[#c4973a]">
                        {t(`mastersSection.${era.masterKey}Title`)}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        <div className="pt-16 border-t border-[#c4973a]/20 max-w-3xl mx-auto text-center">
          <div className="relative aspect-[16/9] w-full overflow-hidden mb-10">
            <Image
              src={HISTORY_LINEAGE_IMAGE}
              alt={t("historyPage.lineageTitle")}
              fill
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover object-center"
              style={{ filter: VINTAGE_FILTER }}
            />
          </div>
          <h3
            className="text-2xl sm:text-3xl font-semibold text-[#1c0a0a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("historyPage.lineageTitle")}
          </h3>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
            {t("historyPage.lineageIntro")}
          </p>
          <ul className="mt-8 space-y-4 text-left">
            {MASTER_KEYS.map(masterKey => (
              <li key={masterKey} className="flex flex-col sm:flex-row sm:gap-3">
                <span className="text-[#8b3a2e] font-semibold sm:shrink-0">
                  {MASTERS[masterKey].name}
                </span>
                <span className="text-[#2c1810]/60">
                  {t(`historyPage.${LINEAGE_LINE_KEYS[masterKey]}`)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base sm:text-lg leading-relaxed text-[#2c1810]/60 italic">
            {t("historyPage.lineageClosing")}
          </p>
        </div>
      </div>
    </section>
  );
}
