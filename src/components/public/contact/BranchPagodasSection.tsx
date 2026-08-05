"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BRANCH_PAGODAS } from "@/data/branchPagodasData";

export function BranchPagodasSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 bg-[#fdf8f0]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4973a] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
            {t("branchPagodas.eyebrow")}
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c0a0a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("branchPagodas.title")}{" "}
            <span className="text-[#c4973a] italic">
              {t("branchPagodas.titleEmphasis")}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2c1810]/60">
            {t("branchPagodas.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {BRANCH_PAGODAS.map(pagoda => (
            <div
              key={pagoda.slug}
              className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={pagoda.image}
                  alt={pagoda.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #1c0a0a99 0%, rgba(28,10,10,0.2) 50%, transparent 100%)",
                  }}
                />
                <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-[#fdf8f0]">
                  {pagoda.name}
                </h3>
              </div>

              <div className="mt-4 space-y-2.5">
                <div className="flex items-start gap-2">
                  <svg
                    className="size-4 mt-1 shrink-0 text-[#c4973a]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
                    <path d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
                  </svg>
                  <p className="text-[16px] leading-relaxed text-[#2c1810]/60 font-bold">
                    {pagoda.abbotName}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="size-4 mt-0.5 shrink-0 text-[#c4973a]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7-6.13-7-11a7 7 0 0 1 14 0c0 4.87-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <p className="text-sm leading-relaxed text-[#2c1810]/60">
                    {pagoda.address}
                  </p>
                </div>
                {pagoda.phone && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="size-4 shrink-0 text-[#c4973a]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6.5 3h3l1.5 4.5-2.3 1.5a11 11 0 0 0 5.8 5.8l1.5-2.3L20.5 14v3a2 2 0 0 1-2 2h-.5C10.6 19 5 13.4 5 5.5V5a2 2 0 0 1 1.5-2Z" />
                    </svg>
                    <a
                      href={`tel:${pagoda.phone.replace(/[.\s]/g, "")}`}
                      className="text-sm text-[#2c1810]/60 tabular-nums hover:text-[#c4973a] transition-colors duration-200"
                    >
                      {pagoda.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
