"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PAGODA_INFO } from "@/data/publicData";
import { ROUTES } from "@/constants/routes";

export function VisitTeaser() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#fdf8f0]">
      <div className="relative h-64 sm:h-80">
        <Image
          src="/images/new-histories/image-01.jpg"
          alt="Ghé thăm Tịnh xá Linh Quang"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1c0a0a]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
          {t("visit.eyebrow")}
        </span>
        <h2
          className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {t("visit.title")}{" "}
          <span className="text-[#c4973a] italic">{t("visit.titleEmphasis")}</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
          {t("visitTeaser.subtitle")}
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto text-left border-t border-[#c4973a]/20 pt-8">
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("visit.addressLabel")}
            </p>
            <a
              href={PAGODA_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-base text-[#2c1810]/70 hover:text-[#c4973a] transition-colors duration-200"
            >
              {PAGODA_INFO.address}
            </a>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("visit.hoursLabel")}
            </p>
            <p className="mt-1 text-base text-[#2c1810]/70">{t("visit.hours")}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ROUTES.VISIT}
            className="px-8 py-3.5 bg-[#c4973a] hover:bg-[#d4aa55] text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200"
          >
            {t("visitTeaser.ctaPrimary")}
          </Link>
          <Link
            href={ROUTES.CONTACT}
            className="px-8 py-3.5 border border-[#c4973a] text-[#c4973a] hover:bg-[#c4973a]/10 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
          >
            {t("visitTeaser.ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
