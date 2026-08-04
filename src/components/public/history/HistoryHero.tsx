"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/public/PageHero";

export function HistoryHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image="/images/new-histories/image-01.jpg"
      eyebrow={t("historyPage.eyebrow")}
      title={t("historyPage.title")}
      titleEmphasis={t("historyPage.titleEmphasis")}
      subtitle={t("historyPage.subtitle")}
    />
  );
}
