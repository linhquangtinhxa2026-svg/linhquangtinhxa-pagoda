"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4973a] to-transparent z-10" />

      <Image
        src="/images/home/hero-bg-2.jpg"
        alt="Tịnh xá Linh Quang"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c0a0a]/80 via-[#1c0a0a]/60 to-[#1c0a0a]/90" />

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a] mb-6">
          {t("hero.eyebrow")}
        </span>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#fdf8f0]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {t("hero.titleLine1")}{" "}
          <span className="text-[#c4973a] italic">
            {t("hero.titleEmphasis")}
          </span>
          <br />
          {t("hero.titleLine2")}
        </h1>

        <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#e8d5c4]/70 max-w-2xl">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href={ROUTES.HISTORY}
            className="px-8 py-3.5 bg-[#c4973a] hover:bg-[#d4aa55] text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          >
            {t("hero.ctaPrimary")}
          </Link>
          <Link
            href={ROUTES.VISIT}
            className="px-8 py-3.5 border border-[#c4973a] text-[#c4973a] hover:bg-[#c4973a]/10 text-sm font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest uppercase text-[#e8d5c4]/50">
            {t("hero.scrollHint")}
          </span>
          <svg
            className="w-5 h-5 text-[#c4973a]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4973a] to-transparent z-10" />
    </section>
  );
}
