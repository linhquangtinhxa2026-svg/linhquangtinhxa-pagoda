"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";
import { loginSuperuserService } from "@/services/auth";
import { getSessionStatus, startSession } from "@/lib/session";
import { pb } from "@/lib/pocketbase";
import { AdminInputField } from "@/components/form/AdminInputField";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function LoginContainer() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = useSyncExternalStore(
    (callback) => pb.authStore.onChange(callback),
    () => pb.authStore.isValid,
    () => false
  );
  const sessionStatus = isAuthenticated ? getSessionStatus() : "missing";
  const hasValidSession = isAuthenticated && sessionStatus !== "expired" && sessionStatus !== "missing";

  useEffect(() => {
    if (hasValidSession) {
      router.push(ROUTES.DASHBOARD_HOME);
    }
  }, [hasValidSession, router]);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await loginSuperuserService(data.email, data.password);
      startSession();
      toast.success(t("auth.success"));
      router.push(ROUTES.DASHBOARD_HOME);
    } catch {
      toast.error(t("auth.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasValidSession) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-800">{t("auth.title")}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t("auth.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AdminInputField
            control={control}
            name="email"
            type="email"
            label={t("auth.emailLabel")}
            placeholder={t("auth.emailPlaceholder")}
          />
          <AdminInputField
            control={control}
            name="password"
            type="password"
            label={t("auth.passwordLabel")}
            placeholder={t("auth.passwordPlaceholder")}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 bg-[#8B6A2E] hover:bg-[#7a5c25] active:scale-[0.97] text-white text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? t("auth.submitting") : t("auth.submit")}
          </Button>
        </form>

        <Link
          href={ROUTES.HOME}
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-150"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t("auth.backToHome")}
        </Link>
      </div>
    </div>
  );
}
