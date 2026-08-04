"use client";

import { useTranslation } from "react-i18next";
import { ArchiveX, Inbox, Loader2, RotateCcw } from "lucide-react";

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
import { formatLunarDateFull, getLunarDateFromIso } from "@/lib/lunarCalendar";
import type { PrayerEvent } from "@/types/prayerEvent";
import { PrayerEventTypeBadge } from "@/components/dashboard/prayer-events/PrayerEventTypeBadge";

interface PrayerEventsArchiveTableProps {
  items: PrayerEvent[];
  isLoading?: boolean;
  onRestore: (event: PrayerEvent) => void;
  onDeletePermanently: (event: PrayerEvent) => void;
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
}

const COLUMNS = [
  "colType",
  "colRegistrant",
  "colSubject",
  "colPhone",
  "colLunarDate",
  "colArchivedAt",
  "colNotes",
] as const;

function formatArchivedAt(iso: string | null): string {
  if (!iso) return "-";
  const date = new Date(iso);
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${d}/${m}/${y} ${hh}:${mm}`;
}

export function PrayerEventsArchiveTable({
  items,
  isLoading,
  onRestore,
  onDeletePermanently,
  selectedIds,
  onToggleRow,
  onToggleAll,
}: PrayerEventsArchiveTableProps) {
  const { t } = useTranslation();

  const allSelected = items.length > 0 && items.every(item => selectedIds.has(item.id));
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
          {t("prayerEventsArchive.empty")}
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
            {COLUMNS.map(col => (
              <TableHead
                key={col}
                className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4"
              >
                {t(`prayerEventsArchive.${col}`)}
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
                selectedIds.has(event.id) && "bg-brand-gold/[0.04] hover:bg-brand-gold/[0.06]"
              )}
            >
              <TableCell className="px-6 py-4">
                <Checkbox
                  checked={selectedIds.has(event.id)}
                  onCheckedChange={() => onToggleRow(event.id)}
                  aria-label={t("prayerEvents.selectRow", { name: event.registrantName })}
                />
              </TableCell>
              <TableCell className="px-4 py-4">
                <PrayerEventTypeBadge type={event.type} />
              </TableCell>
              <TableCell className="text-sm font-bold text-foreground px-4 py-4">
                {event.registrantName}
              </TableCell>
              <TableCell className="text-sm font-bold text-foreground px-4">
                {event.subjectName}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground px-4">{event.phone}</TableCell>
              <TableCell className="text-sm text-muted-foreground tabular-nums px-4 whitespace-nowrap">
                {formatLunarDateFull(getLunarDateFromIso(event.eventDate))}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground tabular-nums px-4 whitespace-nowrap">
                {formatArchivedAt(event.archivedAt)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground/80 whitespace-normal max-w-xs px-4">
                <span className="line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                  {event.note || "-"}
                </span>
              </TableCell>
              <TableCell className="text-right px-6 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-brand-gold hover:bg-brand-gold/15 active:scale-95 transition-all"
                    onClick={() => onRestore(event)}
                  >
                    <RotateCcw className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15 active:scale-95 transition-all"
                    onClick={() => onDeletePermanently(event)}
                  >
                    <ArchiveX className="size-4" />
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
