"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { pb } from "@/lib/pocketbase";
import { clearSession, getSessionStatus, refreshSession } from "@/lib/session";
import { logoutService, refreshSuperuserSessionService } from "@/services/auth";
import { ROUTES } from "@/constants/routes";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopNav } from "./DashboardTopNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isAuthenticated = useSyncExternalStore(
    (callback) => pb.authStore.onChange(callback),
    () => pb.authStore.isValid,
    () => false
  );

  useEffect(() => {
    if (!isAuthenticated) {
      clearSession();
      router.push(ROUTES.LOGIN);
      return;
    }

    const status = getSessionStatus();
    if (status === "expired" || status === "missing") {
      logoutService();
      clearSession();
      router.push(ROUTES.LOGIN);
      return;
    }

    if (status === "needs-refresh") {
      refreshSuperuserSessionService()
        .then(() => refreshSession())
        .catch(() => {
          logoutService();
          clearSession();
          router.push(ROUTES.LOGIN);
        });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[#F1F5F9]">
      <DashboardSidebar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopNav onOpenMobileNav={() => setIsMobileNavOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
