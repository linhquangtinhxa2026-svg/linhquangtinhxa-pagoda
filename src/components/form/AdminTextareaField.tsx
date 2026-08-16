import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const amberFocus = "focus-visible:border-brand-gold focus-visible:ring-brand-gold/20";

interface AdminTextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  onChangeTransform?: (value: string) => string;
}

export function AdminTextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  className,
  onChangeTransform,
}: AdminTextareaFieldProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2", className)}>
          <Label className="text-sm font-bold text-foreground/80 tracking-tight">{label}</Label>
          <Textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            onChange={(e) => {
              const nextValue = onChangeTransform ? onChangeTransform(e.target.value) : e.target.value;
              field.onChange(nextValue);
            }}
            className={cn(
              "rounded-xl bg-muted/5 border-border/60 transition-all min-h-[120px]",
              amberFocus
            )}
          />
          {fieldState.error?.message && (
            <p className="text-xs text-red-600">{t(fieldState.error.message)}</p>
          )}
        </div>
      )}
    />
  );
}
