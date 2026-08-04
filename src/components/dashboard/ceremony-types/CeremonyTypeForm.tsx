import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AdminInputField } from "@/components/form/AdminInputField";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CEREMONY_TYPE_COLOR_OPTIONS } from "@/lib/ceremonyTypeColors";
import type { CeremonyTypeFormData } from "@/lib/schemas/ceremonyType";

interface CeremonyTypeFormProps {
  control: Control<CeremonyTypeFormData>;
}

export function CeremonyTypeForm({ control }: CeremonyTypeFormProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <AdminInputField
        control={control}
        name="label"
        label={t("ceremonyTypes.labelField")}
        placeholder={t("ceremonyTypes.labelPlaceholder")}
      />
      <Controller
        control={control}
        name="colorKey"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label className="text-sm font-bold text-foreground/80 tracking-tight">
              {t("ceremonyTypes.colorField")}
            </Label>
            <div className="flex items-center gap-2">
              {CEREMONY_TYPE_COLOR_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => field.onChange(option.key)}
                  className={cn(
                    "size-9 rounded-full flex items-center justify-center border-2 transition-all duration-150 cursor-pointer",
                    field.value === option.key
                      ? "border-brand-gold scale-110"
                      : "border-transparent hover:border-border"
                  )}
                  aria-label={option.key}
                >
                  <span className={cn("size-5 rounded-full", option.dotClass)} />
                </button>
              ))}
            </div>
            {fieldState.error?.message && (
              <p className="text-xs text-red-600">{t(fieldState.error.message)}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
