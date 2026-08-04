"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { pb } from "@/lib/pocketbase";
import { ROUTES } from "@/constants/routes";

export function DashboardTopNav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const email = pb.authStore.record?.email as string | undefined;

  const pageTitle =
    pathname === ROUTES.QUAN_LY_COT_VA_HINH
      ? t("dashboard.nav.memorialRecords")
      : pathname === ROUTES.QUAN_LY_CAU_AN_VA_CAU_SIEU
        ? t("dashboard.nav.prayerEvents")
        : pathname === ROUTES.QUAN_LY_LOAI_LE
          ? t("dashboard.nav.ceremonyTypes")
          : t("dashboard.nav.home");

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div>
        <p className="text-base font-semibold text-gray-800">{pageTitle}</p>
        <p className="text-xs text-gray-400">Admin / {pageTitle}</p>
      </div>
      {email && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-8 h-8 rounded-full bg-[#8B6A2E]/10 border border-[#8B6A2E]/20 text-[#8B6A2E] flex items-center justify-center text-xs font-semibold uppercase">
            {email.charAt(0)}
          </span>
          {email}
        </div>
      )}
    </header>
  );
}
