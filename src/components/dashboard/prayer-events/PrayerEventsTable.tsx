"use client";

import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp, Inbox, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TypographySmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  daysUntil,
  formatLunarDateFull,
  getLunarDateFromIso,
} from "@/lib/lunarCalendar";
import type { PrayerEvent } from "@/types/prayerEvent";
import { PrayerEventTypeBadge } from "./PrayerEventTypeBadge";

interface PrayerEventsTableProps {
  items: PrayerEvent[];
  isLoading?: boolean;
  onEdit: (event: PrayerEvent) => void;
  onDelete: (event: PrayerEvent) => void;
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  sortDir: "asc" | "desc";
  onSortDirChange: (sortDir: "asc" | "desc") => void;
}

const COLUMNS = [
  "colType",
  "colRegistrant",
  "colNotes",
] as const;

/** Row highlight escalates as the event date approaches: <=5 days blue, <=3 days yellow, <=1 day red. */
function getUpcomingHighlightClass(eventDate: string): string {
  const days = daysUntil(eventDate);
  if (days < 0) return "";
  if (days <= 1) return "bg-red-100 hover:bg-red-200/70";
  if (days <= 3) return "bg-amber-100 hover:bg-amber-200/70";
  if (days <= 5) return "bg-blue-100 hover:bg-blue-200/70";
  return "";
}

export function PrayerEventsTable({
  items,
  isLoading,
  onEdit,
  onDelete,
  selectedIds,
  onToggleRow,
  onToggleAll,
  sortDir,
  onSortDirChange,
}: PrayerEventsTableProps) {
  const { t } = useTranslation();

  const allSelected =
    items.length > 0 && items.every(item => selectedIds.has(item.id));
  const someSelected = items.some(item => selectedIds.has(item.id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 border border-border rounded-xl bg-white shadow-sm">
        <Loader2 className="size-8 animate-spin text-muted-foreground/40" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 border-2 border-dashed border-border/60 rounded-xl bg-muted/10">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-5 text-muted-foreground/40 shadow-inner">
          <Inbox className="size-8" />
        </div>
        <TypographySmall className="text-muted-foreground font-bold text-base tracking-tight">
          {t("prayerEvents.empty")}
        </TypographySmall>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border">
            <TableHead className="w-10 px-6">
              <Checkbox
                checked={allSelected}
                indeterminate={!allSelected && someSelected}
                onCheckedChange={onToggleAll}
                aria-label={t("prayerEvents.selectAll")}
              />
            </TableHead>
            {COLUMNS.slice(0, 2).map(col => (
              <TableHead
                key={col}
                className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4"
              >
                {t(`prayerEvents.${col}`)}
              </TableHead>
            ))}
            <TableHead className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4">
              <div className="flex items-center gap-1.5">
                {t("prayerEvents.colLunarDate")}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => onSortDirChange("asc")}
                    aria-label={t("prayerEvents.sortAsc")}
                    className={cn(
                      "leading-none cursor-pointer transition-colors",
                      sortDir === "asc"
                        ? "text-brand-gold"
                        : "text-muted-foreground/40 hover:text-muted-foreground"
                    )}
                  >
                    <ArrowUp className="size-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSortDirChange("desc")}
                    aria-label={t("prayerEvents.sortDesc")}
                    className={cn(
                      "leading-none cursor-pointer transition-colors",
                      sortDir === "desc"
                        ? "text-brand-gold"
                        : "text-muted-foreground/40 hover:text-muted-foreground"
                    )}
                  >
                    <ArrowDown className="size-3" />
                  </button>
                </div>
              </div>
            </TableHead>
            {COLUMNS.slice(2).map(col => (
              <TableHead
                key={col}
                className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4"
              >
                {t(`prayerEvents.${col}`)}
              </TableHead>
            ))}
            <TableHead className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest text-right px-6">
              {t("prayerEvents.colActions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(event => (
            <TableRow
              key={event.id}
              className={cn(
                "group border-b border-border/50 hover:bg-muted/20 transition-all duration-200",
                getUpcomingHighlightClass(event.eventDate),
                selectedIds.has(event.id) &&
                  "bg-brand-gold/[0.04] hover:bg-brand-gold/[0.06]",
              )}
            >
              <TableCell className="px-6 py-4">
                <Checkbox
                  checked={selectedIds.has(event.id)}
                  onCheckedChange={() => onToggleRow(event.id)}
                  aria-label={t("prayerEvents.selectRow", {
                    name: event.registrantName,
                  })}
                />
              </TableCell>
              <TableCell className="px-4 py-4">
                <PrayerEventTypeBadge type={event.type} />
              </TableCell>
              <TableCell className="text-sm font-bold text-foreground px-4 py-4">
                {event.registrantName}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground tabular-nums px-4 whitespace-nowrap">
                {formatLunarDateFull(getLunarDateFromIso(event.eventDate))}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground/80 whitespace-normal max-w-xs px-4">
                {event.note || "-"}
              </TableCell>
              <TableCell className="text-right px-6 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-brand-gold hover:bg-brand-gold/15 active:scale-95 transition-all"
                    onClick={() => onEdit(event)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15 active:scale-95 transition-all"
                    onClick={() => onDelete(event)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
