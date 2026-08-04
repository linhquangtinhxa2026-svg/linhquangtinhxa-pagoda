"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/constants/routes";

export function VisitCta() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl sm:text-4xl font-semibold text-[#fdf8f0]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {t("visitPage.ctaTitle")}{" "}
          <span className="text-[#c4973a] italic">{t("visitPage.ctaTitleEmphasis")}</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#e8d5c4]/60">
          {t("visitPage.ctaSubtitle")}
        </p>
        <Link
          href={ROUTES.CONTACT}
          className="mt-8 inline-block px-8 py-3.5 bg-[#c4973a] hover:bg-[#d4aa55] text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200"
        >
          {t("visitPage.ctaButton")}
        </Link>
      </div>
    </section>
  );
}
