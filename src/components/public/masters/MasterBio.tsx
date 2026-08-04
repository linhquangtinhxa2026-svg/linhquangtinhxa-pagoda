"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/constants/routes";
import { MASTERS, type MasterKey } from "@/data/mastersData";

export function MasterBio({ masterKey }: { masterKey: MasterKey }) {
  const { t } = useTranslation();
  const master = MASTERS[masterKey];
  const worldlyName = t(`masterDetail.${masterKey}.worldlyName`);

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.CONTACT}
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#c4973a] hover:text-[#8b3a2e] transition-colors duration-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t("masterDetail.backLabel")}
        </Link>

        <div className="relative aspect-[3/4] w-48 sm:w-56 mx-auto mt-8 overflow-hidden border border-[#c4973a]/20">
          <Image
            src={master.image}
            alt={master.name}
            fill
            sizes="224px"
            className="object-cover object-center"
          />
        </div>

        {worldlyName && (
          <p className="mt-8 text-xs tracking-widest uppercase font-semibold text-[#c4973a] text-center">
            {worldlyName}
          </p>
        )}

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2c1810]/70">
          {t(`masterDetail.${masterKey}.intro`)}
        </p>
      </div>
    </section>
  );
}
