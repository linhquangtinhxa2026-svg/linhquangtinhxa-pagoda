import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const amberFocus = "focus-visible:border-brand-gold focus-visible:ring-brand-gold/20";

interface AdminInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  onChangeTransform?: (value: string) => string;
}

export function AdminInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
  onChangeTransform,
}: AdminInputFieldProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2", className)}>
          <Label className="text-sm font-bold text-foreground/80 tracking-tight">{label}</Label>
          <Input
            {...field}
            value={field.value ?? ""}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              const nextValue = onChangeTransform ? onChangeTransform(e.target.value) : e.target.value;
              field.onChange(nextValue);
            }}
            className={cn(
              "h-11 rounded-xl bg-muted/5 border-border/60 transition-all",
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
