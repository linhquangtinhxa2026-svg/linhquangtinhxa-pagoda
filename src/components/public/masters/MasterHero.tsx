"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/public/PageHero";
import { MASTERS, type MasterKey } from "@/data/mastersData";

export function MasterHero({ masterKey }: { masterKey: MasterKey }) {
  const { t } = useTranslation();
  const master = MASTERS[masterKey];

  return (
    <PageHero
      image="/images/new-histories/image-01.jpg"
      eyebrow={t("masterDetail.eyebrow")}
      title={master.name}
      subtitle={`${t(`mastersSection.${masterKey}Title`)} · ${master.years}`}
    />
  );
}
