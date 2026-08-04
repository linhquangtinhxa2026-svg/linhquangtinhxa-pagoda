"use client";

import dynamic from "next/dynamic";

const LoginContainer = dynamic(
  () => import("@/features/auth/components/LoginContainer").then((mod) => mod.LoginContainer),
  { ssr: false }
);

export default function DangNhapPage() {
  return <LoginContainer />;
}
