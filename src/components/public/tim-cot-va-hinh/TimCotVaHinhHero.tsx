"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/public/PageHero";

export function TimCotVaHinhHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image="/images/lien-he/pagoda-gate.jpg"
      eyebrow={t("timCotVaHinh.eyebrow")}
      title={t("timCotVaHinh.title")}
      titleEmphasis={t("timCotVaHinh.titleEmphasis")}
      subtitle={t("timCotVaHinh.subtitle")}
    />
  );
}
