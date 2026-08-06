import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AdminInputField } from "@/components/form/AdminInputField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CEREMONY_TYPE_COLOR_OPTIONS } from "@/lib/ceremonyTypeColors";
import { CEREMONY_TYPE_ICON_OPTIONS } from "@/lib/ceremonyTypeIcons";
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
      <Controller
        control={control}
        name="iconKey"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label className="text-sm font-bold text-foreground/80 tracking-tight">
              {t("ceremonyTypes.iconField")}
            </Label>
            <div className="flex flex-wrap items-center gap-2">
              {CEREMONY_TYPE_ICON_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => field.onChange(option.key)}
                  className={cn(
                    "size-9 rounded-lg flex items-center justify-center border-2 transition-all duration-150 cursor-pointer",
                    field.value === option.key
                      ? "border-brand-gold scale-110 text-brand-gold"
                      : "border-border text-muted-foreground hover:border-border/80"
                  )}
                  aria-label={option.key}
                >
                  <option.icon className="size-4.5 fill-current" />
                </button>
              ))}
            </div>
            {fieldState.error?.message && (
              <p className="text-xs text-red-600">{t(fieldState.error.message)}</p>
            )}
          </div>
        )}
      />
      <Controller
        control={control}
        name="important"
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id="ceremony-type-important"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
            <Label
              htmlFor="ceremony-type-important"
              className="text-sm font-bold text-foreground/80 tracking-tight cursor-pointer"
            >
              {t("ceremonyTypes.importantField")}
            </Label>
          </div>
        )}
      />
    </div>
  );
}
