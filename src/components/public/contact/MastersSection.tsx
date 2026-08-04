"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MASTERS } from "@/data/mastersData";
import { ROUTES } from "@/constants/routes";

export function MastersSection() {
  const { t } = useTranslation();
  const abbot = MASTERS.abbot;

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Link
            href={`${ROUTES.MASTERS}/${abbot.slug}`}
            className="group relative block aspect-[3/4] w-full overflow-hidden lg:col-span-5"
          >
            <Image
              src={abbot.image}
              alt={abbot.name}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, #1c0a0a 0%, rgba(28,10,10,0.3) 45%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
                {t("mastersSection.abbotTitle")}
              </p>
              <h3
                className="mt-1 text-xl font-semibold text-[#fdf8f0]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {abbot.name}
              </h3>
              <p className="mt-1 text-xs text-[#e8d5c4]/50">{abbot.years}</p>
            </div>
          </Link>

          <div className="lg:col-span-7">
            <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
              {t("mastersSection.title")}{" "}
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t("mastersSection.titleEmphasis")}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#e8d5c4]/60">
              {t("mastersSection.subtitle")}
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#e8d5c4]/60">
              {t("mastersSection.abbotBio")}
            </p>

            <Link
              href={`${ROUTES.MASTERS}/${abbot.slug}`}
              className="mt-8 inline-block px-8 py-3.5 bg-[#c4973a] hover:bg-[#d4aa55] text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200"
            >
              {t("mastersSection.cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
