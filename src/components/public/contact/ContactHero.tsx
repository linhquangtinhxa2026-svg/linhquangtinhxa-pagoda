"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/public/PageHero";

export function ContactHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image="/images/lien-he/pagoda-gate.jpg"
      eyebrow={t("contactPage.eyebrow")}
      title={t("contactPage.title")}
      titleEmphasis={t("contactPage.titleEmphasis")}
      subtitle={t("contactPage.subtitle")}
    />
  );
}
