"use client";

import { useTranslation } from "react-i18next";

import { pb } from "@/lib/pocketbase";

export function DashboardHomeContainer() {
  const { t } = useTranslation();
  const email = pb.authStore.record?.email as string | undefined;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800">{t("dashboard.welcomeTitle")}</h2>
      <p className="text-sm text-gray-500 mt-0.5">{t("dashboard.welcomeSubtitle")}</p>
      {email && (
        <p className="text-sm text-gray-600 mt-4">
          {t("dashboard.loggedInAs")}: <span className="font-medium text-gray-800">{email}</span>
        </p>
      )}
    </div>
  );
}
