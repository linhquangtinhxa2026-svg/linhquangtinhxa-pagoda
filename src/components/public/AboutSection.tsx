"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/constants/routes";

export function AboutSection() {
  const { t } = useTranslation();

  const stats = [
    { key: "stat1", value: t("about.stat1Value"), label: t("about.stat1Label") },
    { key: "stat2", value: t("about.stat2Value"), label: t("about.stat2Label") },
    { key: "stat3", value: t("about.stat3Value"), label: t("about.stat3Label") },
  ];

  return (
    <section id="about" className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden">
            <Image
              src="/images/new-histories/image-06.png"
              alt="Kiến trúc Tịnh xá Linh Quang"
              fill
              sizes="(min-width: 1024px) 448px, 90vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, #8b3a2e55 0%, rgba(28,10,10,0.2) 50%, transparent 100%)",
              }}
            />
          </div>

          <div>
            <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
              {t("about.eyebrow")}
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t("about.title")}{" "}
              <span className="text-[#c4973a] italic">{t("about.titleEmphasis")}</span>{" "}
              {t("about.titleEnd")}
            </h2>

            <div className="mt-6 space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
                {t("about.founding")}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
                {t("about.rebuild")}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
                {t("about.architecture")}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#c4973a]/20 pt-8">
              {stats.map((stat) => (
                <div key={stat.key}>
                  <p
                    className="text-2xl sm:text-3xl font-semibold text-[#8b3a2e]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs tracking-widest uppercase text-[#2c1810]/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href={ROUTES.HISTORY}
              className="mt-10 inline-block px-8 py-3.5 border border-[#c4973a] text-[#c4973a] hover:bg-[#c4973a] hover:text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200"
            >
              {t("about.readMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
