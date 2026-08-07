"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";

import { pb } from "@/lib/pocketbase";
import { ROUTES } from "@/constants/routes";

interface DashboardTopNavProps {
  onOpenMobileNav: () => void;
}

export function DashboardTopNav({ onOpenMobileNav }: DashboardTopNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const email = pb.authStore.record?.email as string | undefined;

  const pageTitle =
    pathname === ROUTES.QUAN_LY_COT_VA_HINH
      ? t("dashboard.nav.memorialRecords")
      : pathname === ROUTES.LUU_TRU_COT_VA_HINH
        ? t("dashboard.nav.memorialRecordsArchive")
        : pathname === ROUTES.QUAN_LY_CAU_AN_VA_CAU_SIEU
          ? t("dashboard.nav.prayerEvents")
          : pathname === ROUTES.LUU_TRU_CAU_AN_VA_CAU_SIEU
            ? t("dashboard.nav.prayerEventsArchive")
            : pathname === ROUTES.QUAN_LY_LOAI_LE
              ? t("dashboard.nav.ceremonyTypes")
              : pathname === ROUTES.QUAN_LY_TIN_TUC
                ? t("dashboard.nav.news")
                : pathname === ROUTES.QUAN_LY_DANH_MUC
                  ? t("dashboard.nav.newsCategories")
                  : t("dashboard.nav.home");

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="lg:hidden shrink-0 text-gray-500 hover:text-gray-800 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <div className="min-w-0">
          <p className="text-base font-semibold text-gray-800 truncate">{pageTitle}</p>
          <p className="text-xs text-gray-400 truncate">Admin / {pageTitle}</p>
        </div>
      </div>
      {email && (
        <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
          <span className="w-8 h-8 rounded-full bg-[#8B6A2E]/10 border border-[#8B6A2E]/20 text-[#8B6A2E] flex items-center justify-center text-xs font-semibold uppercase">
            {email.charAt(0)}
          </span>
          <span className="hidden sm:inline">{email}</span>
        </div>
      )}
    </header>
  );
}
