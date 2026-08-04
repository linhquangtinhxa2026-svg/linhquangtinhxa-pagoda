"use client";

import { useTranslation } from "react-i18next";
import { CalendarDays, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { formatSolarWithLunar } from "@/lib/lunarCalendar";
import type { PrayerEvent } from "@/types/prayerEvent";
import { PrayerEventTypeBadge } from "./PrayerEventTypeBadge";

interface PrayerEventDayListProps {
  dateKey: string | null;
  events: PrayerEvent[];
  onAdd: () => void;
  onEdit: (event: PrayerEvent) => void;
  onDelete: (event: PrayerEvent) => void;
}

export function PrayerEventDayList({
  dateKey,
  events,
  onAdd,
  onEdit,
  onDelete,
}: PrayerEventDayListProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-border shadow-sm lg:sticky lg:top-6">
      {!dateKey ? (
        <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/40">
            <CalendarDays className="size-7" />
          </div>
          <TypographyMuted className="text-sm">{t("prayerEvents.selectDateHint")}</TypographyMuted>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <TypographySmall className="text-foreground font-bold text-base tracking-tight">
              {t("prayerEvents.dayListTitle", { date: formatSolarWithLunar(dateKey) })}
            </TypographySmall>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8.5 rounded-lg text-muted-foreground hover:text-brand-gold hover:bg-brand-gold/15 active:scale-95 transition-all shrink-0"
              onClick={onAdd}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          {events.length === 0 ? (
            <TypographyMuted className="text-sm py-6 text-center">
              {t("prayerEvents.dayListEmpty")}
            </TypographyMuted>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border border-border/60 rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <PrayerEventTypeBadge type={event.type} />
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7 rounded-lg text-muted-foreground hover:text-brand-gold hover:bg-brand-gold/15 active:scale-95 transition-all"
                        onClick={() => onEdit(event)}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15 active:scale-95 transition-all"
                        onClick={() => onDelete(event)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">{event.registrantName}</p>
                    <p className="text-sm text-muted-foreground">{event.subjectName}</p>
                    <p className="text-sm text-muted-foreground tabular-nums">{event.phone}</p>
                  </div>
                  {event.note && (
                    <p className="text-sm text-muted-foreground/80 pt-2 border-t border-border/50">
                      {event.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
