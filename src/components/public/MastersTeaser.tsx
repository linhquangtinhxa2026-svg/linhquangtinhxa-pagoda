"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MASTERS } from "@/data/mastersData";
import { ROUTES } from "@/constants/routes";

export function MastersTeaser() {
  const { t } = useTranslation();
  const abbot = MASTERS.abbot;

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Link
            href={`${ROUTES.MASTERS}/${abbot.slug}`}
            className="group block lg:col-span-5"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={abbot.image}
                alt={abbot.name}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c4973a] transition-colors duration-300" />
            </div>
          </Link>

          <div className="lg:col-span-7">
            <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
              {t("mastersTeaser.eyebrow")}
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t("mastersTeaser.title")}{" "}
              <span className="text-[#c4973a] italic">{t("mastersTeaser.titleEmphasis")}</span>
            </h2>

            <p className="mt-6 text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("mastersSection.abbotTitle")}
            </p>
            <h3
              className="mt-1 text-xl sm:text-2xl font-semibold text-[#1c0a0a]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {abbot.name}
            </h3>
            <p className="mt-1 text-sm text-[#2c1810]/40">{abbot.years}</p>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
              {t("mastersTeaser.subtitle")}
            </p>

            <Link
              href={`${ROUTES.MASTERS}/${abbot.slug}`}
              className="mt-8 inline-block px-8 py-3.5 bg-[#c4973a] hover:bg-[#d4aa55] text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200"
            >
              {t("mastersTeaser.cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
