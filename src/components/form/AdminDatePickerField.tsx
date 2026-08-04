"use client";

import { useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CalendarIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatSolarDate } from "@/lib/lunarCalendar";
import { toDateKey, type CalendarGridDay } from "@/lib/calendarGrid";

const amberFocus = "focus-visible:border-brand-gold focus-visible:ring-brand-gold/20";

interface AdminDatePickerFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
  renderDaySubLabel?: (day: CalendarGridDay) => React.ReactNode;
}

const parseIsoDate = (iso: string): Date | undefined => {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
};

export function AdminDatePickerField<T extends FieldValues>({
  control,
  name,
  label,
  className,
  renderDaySubLabel,
}: AdminDatePickerFieldProps<T>) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedDate = parseIsoDate(field.value ?? "");

        return (
          <div className={cn("space-y-2", className)}>
            <Label className="text-sm font-bold text-foreground/80 tracking-tight">{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                type="button"
                className={cn(
                  "flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/5 px-3 text-sm outline-none transition-all cursor-pointer",
                  amberFocus
                )}
              >
                <span className={selectedDate ? "text-foreground" : "text-muted-foreground/50"}>
                  {selectedDate ? formatSolarDate(toDateKey(selectedDate)) : t("common.selectDate")}
                </span>
                <CalendarIcon className="size-4 text-muted-foreground/60" />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  selected={selectedDate}
                  onSelect={(date) => {
                    field.onChange(toDateKey(date));
                    setOpen(false);
                  }}
                  renderDaySubLabel={renderDaySubLabel}
                />
              </PopoverContent>
            </Popover>
            {fieldState.error?.message && (
              <p className="text-xs text-red-600">{t(fieldState.error.message)}</p>
            )}
          </div>
        );
      }}
    />
  );
}
