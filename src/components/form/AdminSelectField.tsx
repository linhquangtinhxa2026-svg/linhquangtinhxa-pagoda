import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const amberFocus = "focus:ring-brand-gold/20 data-[state=open]:border-brand-gold";

interface AdminSelectFieldOption {
  value: string;
  label: string;
}

interface AdminSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: AdminSelectFieldOption[];
  className?: string;
}

export function AdminSelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  className,
}: AdminSelectFieldProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2", className)}>
          <Label className="text-sm font-bold text-foreground/80 tracking-tight">{label}</Label>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className={cn("h-11 w-full rounded-xl bg-muted/5 border-border/60", amberFocus)}
            >
              <SelectValue>
                {(value: string) => options.find((option) => option.value === value)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.error?.message && (
            <p className="text-xs text-red-600">{t(fieldState.error.message)}</p>
          )}
        </div>
      )}
    />
  );
}
