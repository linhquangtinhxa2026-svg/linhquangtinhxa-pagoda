"use client";

import dynamic from "next/dynamic";

const DashboardShell = dynamic(
  () => import("@/components/dashboard/layout/DashboardShell").then((mod) => mod.DashboardShell),
  { ssr: false }
);

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>;
}
