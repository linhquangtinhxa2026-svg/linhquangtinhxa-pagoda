"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getMonthGridDays,
  MONTH_LABELS_VI,
  WEEKDAY_LABELS_VI,
  type CalendarGridDay,
} from "@/lib/calendarGrid";
import { convertSolar2Lunar, formatLunarDate } from "@/lib/lunarCalendar";
import { useCeremonyTypesList } from "@/hooks/dashboard/useCeremonyTypes";
import { getCeremonyTypeIconOption } from "@/lib/ceremonyTypeIcons";
import type { CeremonyType } from "@/types/ceremonyType";
import type { PrayerEvent } from "@/types/prayerEvent";

interface PrayerEventsCalendarProps {
  eventsByDate: Map<string, PrayerEvent[]>;
  selectedDateKey: string | null;
  onSelectDate: (dateKey: string) => void;
  onAdd: (dateKey: string) => void;
}

export function PrayerEventsCalendar({
  eventsByDate,
  selectedDateKey,
  onSelectDate,
  onAdd,
}: PrayerEventsCalendarProps) {
  const { t } = useTranslation();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);
  const { data: ceremonyTypes = [] } = useCeremonyTypesList();

  const importantTypesByValue = useMemo(() => {
    return new Map(
      ceremonyTypes
        .filter(type => type.important)
        .map(type => [type.value, type]),
    );
  }, [ceremonyTypes]);

  const days = getMonthGridDays(viewYear, viewMonth);

  const goToPrevMonth = () => {
    if (viewMonth === 1) {
      setViewYear(y => y - 1);
      setViewMonth(12);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 12) {
      setViewYear(y => y + 1);
      setViewMonth(1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-bold text-foreground">
          {MONTH_LABELS_VI[viewMonth - 1]}, {viewYear}
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-border/60 bg-white text-muted-foreground hover:bg-muted/50"
            onClick={goToPrevMonth}
            aria-label={t("prayerEvents.prevMonth")}
          >
            <ChevronLeft className="size-4.5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-border/60 bg-white text-muted-foreground hover:bg-muted/50"
            onClick={goToNextMonth}
            aria-label={t("prayerEvents.nextMonth")}
          >
            <ChevronRight className="size-4.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAY_LABELS_VI.map(label => (
          <div
            key={label}
            className="text-center text-[16px] font-bold uppercase tracking-widest text-muted-foreground/60 py-2"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dayEvents = eventsByDate.get(day.dateKey);
          const importantType = dayEvents
            ?.map(event => importantTypesByValue.get(event.type))
            .find((type): type is CeremonyType => !!type);

          return (
            <PrayerEventsCalendarDay
              key={day.dateKey}
              day={day}
              hasEvents={eventsByDate.has(day.dateKey)}
              eventCount={dayEvents?.length ?? 0}
              importantType={importantType}
              isSelected={day.dateKey === selectedDateKey}
              onSelect={() => onSelectDate(day.dateKey)}
              onAdd={() => onAdd(day.dateKey)}
            />
          );
        })}
      </div>
    </div>
  );
}

interface PrayerEventsCalendarDayProps {
  day: CalendarGridDay;
  hasEvents: boolean;
  eventCount: number;
  importantType?: CeremonyType;
  isSelected: boolean;
  onSelect: () => void;
  onAdd: () => void;
}

function PrayerEventsCalendarDay({
  day,
  hasEvents,
  eventCount,
  importantType,
  isSelected,
  onSelect,
  onAdd,
}: PrayerEventsCalendarDayProps) {
  const { t } = useTranslation();
  const lunar = convertSolar2Lunar(day.day, day.month, day.year);
  const ImportantIcon = importantType
    ? getCeremonyTypeIconOption(importantType.iconKey).icon
    : null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-0.5 aspect-[4/5] sm:aspect-square rounded-xl transition-all duration-150 cursor-pointer",
        day.isCurrentMonth ? "text-foreground" : "text-muted-foreground/30",
        isSelected
          ? "bg-brand-gold text-white shadow-md shadow-brand-gold/20"
          : day.isToday
            ? "bg-brand-gold/10 text-brand-gold font-bold"
            : "hover:bg-muted/60",
      )}
    >
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          onAdd();
        }}
        aria-label={t("prayerEvents.addNew")}
        className={cn(
          "hidden sm:flex absolute top-1 right-1 size-5 rounded-md items-center justify-center transition-all active:scale-90 cursor-pointer",
          isSelected
            ? "text-white hover:bg-white/20"
            : "text-brand-gold hover:bg-brand-gold/15",
        )}
      >
        <Plus className="size-3.5" />
      </button>
      <span className="text-lg font-semibold">{day.day}</span>
      <span
        className={cn(
          "text-xs leading-none",
          isSelected ? "text-white/80" : "text-muted-foreground/50",
        )}
      >
        {formatLunarDate(lunar)}
      </span>
      {hasEvents && (
        <div
          className="absolute bottom-1.5 flex items-center gap-1"
          aria-label={`${eventCount}`}
        >
          <span
            className={cn(
              "size-3 rounded-full",
              isSelected ? "bg-white" : "bg-brand-gold",
            )}
          />
          {ImportantIcon && (
            <ImportantIcon
              className={cn(
                "size-4 fill-current",
                isSelected ? "text-white" : "text-brand-gold",
              )}
            />
          )}
        </div>
      )}
    </div>
  );
}
