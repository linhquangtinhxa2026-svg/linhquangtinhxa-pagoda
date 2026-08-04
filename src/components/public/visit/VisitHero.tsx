"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/public/PageHero";

export function VisitHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image="/images/visit/visit-01.webp"
      eyebrow={t("visitPage.eyebrow")}
      title={t("visitPage.title")}
      titleEmphasis={t("visitPage.titleEmphasis")}
      subtitle={t("visitPage.subtitle")}
    />
  );
}
