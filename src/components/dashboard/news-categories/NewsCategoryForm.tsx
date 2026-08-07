import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AdminInputField } from "@/components/form/AdminInputField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { NewsCategoryFormData } from "@/lib/schemas/newsCategory";

interface NewsCategoryFormProps {
  control: Control<NewsCategoryFormData>;
}

interface ColorFieldProps {
  control: Control<NewsCategoryFormData>;
  name: "backgroundColor" | "textColor";
  label: string;
}

function ColorField({ control, name, label }: ColorFieldProps) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <Label className="text-sm font-bold text-foreground/80 tracking-tight">{label}</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={field.value || "#000000"}
              onChange={(e) => field.onChange(e.target.value)}
              className="size-11 rounded-lg border border-border/60 cursor-pointer p-1 bg-white"
            />
            <Input
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="#000000"
              className={cn(
                "h-11 rounded-xl bg-muted/5 border-border/60 transition-all font-mono",
                "focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
              )}
            />
          </div>
          {fieldState.error?.message && (
            <p className="text-xs text-red-600">{t(fieldState.error.message)}</p>
          )}
        </div>
      )}
    />
  );
}

export function NewsCategoryForm({ control }: NewsCategoryFormProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <AdminInputField
        control={control}
        name="label"
        label={t("newsCategories.labelField")}
        placeholder={t("newsCategories.labelPlaceholder")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColorField
          control={control}
          name="backgroundColor"
          label={t("newsCategories.backgroundColorField")}
        />
        <ColorField control={control} name="textColor" label={t("newsCategories.textColorField")} />
      </div>
      <AdminInputField
        control={control}
        name="order"
        type="number"
        label={t("newsCategories.orderField")}
      />
    </div>
  );
}
