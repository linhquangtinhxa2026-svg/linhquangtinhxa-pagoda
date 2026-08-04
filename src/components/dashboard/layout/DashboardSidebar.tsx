"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Archive,
  CalendarHeart,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Tags,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { clearSession } from "@/lib/session";
import { logoutService } from "@/services/auth";
import { BrandMark } from "@/components/public/BrandMark";

const NAV_ITEMS = [
  {
    key: "home",
    href: ROUTES.DASHBOARD_HOME,
    icon: LayoutDashboard,
    exact: true,
  },
  {
    key: "memorialRecords",
    href: ROUTES.QUAN_LY_COT_VA_HINH,
    icon: Archive,
    exact: false,
  },
  {
    key: "prayerEvents",
    href: ROUTES.QUAN_LY_CAU_AN_VA_CAU_SIEU,
    icon: CalendarHeart,
    exact: false,
    children: [
      { key: "prayerEventsManage", href: ROUTES.QUAN_LY_CAU_AN_VA_CAU_SIEU },
      { key: "prayerEventsArchive", href: ROUTES.LUU_TRU_CAU_AN_VA_CAU_SIEU },
    ],
  },
  {
    key: "ceremonyTypes",
    href: ROUTES.QUAN_LY_LOAI_LE,
    icon: Tags,
    exact: false,
  },
  {
    key: "news",
    href: ROUTES.QUAN_LY_TIN_TUC,
    icon: Newspaper,
    exact: false,
  },
] as const;

export function DashboardSidebar() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logoutService();
    clearSession();
    router.push(ROUTES.LOGIN);
  };

  return (
    <aside className="w-64 shrink-0 bg-slate-800 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link
          href="/"
          className="text-white text-sm font-semibold tracking-wide flex gap-2 items-center"
        >
          <BrandMark className="w-[46px] h-[46px] text-[#c4973a]" />
          Tịnh Xá Linh Quang
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="px-3 text-xs uppercase tracking-widest font-medium text-[#8D99AE] mb-2">
          Menu
        </p>
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map(item => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <div key={item.key} className="flex flex-col gap-1">
                <Link
                  href={item.href}
                  className={
                    isActive
                      ? "flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white font-medium text-sm"
                      : "flex items-center gap-2 px-3 py-2 rounded-lg text-[#8D99AE] hover:bg-white/5 hover:text-white text-sm transition-colors duration-150"
                  }
                >
                  <Icon className="size-4" />
                  {t(`dashboard.nav.${item.key}`)}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8B6A2E]" />
                  )}
                </Link>
                {"children" in item && item.children && (
                  <div className="ml-6 flex flex-col gap-1">
                    {item.children.map(child => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.key}
                          href={child.href}
                          className={
                            isChildActive
                              ? "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium text-sm"
                              : "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#8D99AE] hover:bg-white/5 hover:text-white text-sm transition-colors duration-150"
                          }
                        >
                          {t(`dashboard.nav.${child.key}`)}
                          {isChildActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8B6A2E]" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#8D99AE] hover:bg-red-500/10 hover:text-red-400 transition-colors duration-150 cursor-pointer"
        >
          <LogOut className="size-4" />
          {t("dashboard.logout")}
        </button>
      </div>
    </aside>
  );
}
