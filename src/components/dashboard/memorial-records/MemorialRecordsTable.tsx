"use client";

import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash2, Inbox } from "lucide-react";

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
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import type { MemorialRecord } from "@/types/memorialRecord";
import { cn } from "@/lib/utils";

export type SortField = "full_name" | "age_at_death";

interface MemorialRecordsTableProps {
  items: MemorialRecord[];
  isLoading: boolean;
  onEdit: (memorialRecord: MemorialRecord) => void;
  onDelete: (memorialRecord: MemorialRecord) => void;
  sortField: SortField | null;
  sortDir: "asc" | "desc";
  onSort: (field: SortField) => void;
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
}

export function MemorialRecordsTable({
  items,
  isLoading,
  onEdit,
  onDelete,
  sortField,
  sortDir,
  onSort,
  selectedIds,
  onToggleRow,
  onToggleAll,
}: MemorialRecordsTableProps) {
  const { t } = useTranslation();

  const allSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id));
  const someSelected = items.some((item) => selectedIds.has(item.id));

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="size-3.5 text-muted-foreground/30" />;
    }
    return sortDir === "asc" ? (
      <ArrowUp className="size-3.5 text-brand-gold animate-in fade-in slide-in-from-bottom-1" />
    ) : (
      <ArrowDown className="size-3.5 text-brand-gold animate-in fade-in slide-in-from-top-1" />
    );
  };

  if (isLoading) {
    return (
      <div className="border border-border rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="bg-muted/30 h-10 border-b border-border" />
        <div className="divide-y divide-border/50">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 px-6">
              <Skeleton className="size-4 rounded-md shrink-0" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 flex-1" />
              <div className="flex gap-2 shrink-0">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
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
          {t("memorialRecords.empty")}
        </TypographySmall>
        <TypographyMuted className="text-sm mt-1 text-muted-foreground/70">
          {t("memorialRecords.tryAdjustingSearch")}
        </TypographyMuted>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border">
            <TableHead className="w-12 px-6">
              <Checkbox
                checked={allSelected}
                indeterminate={!allSelected && someSelected}
                onCheckedChange={onToggleAll}
                aria-label={t("memorialRecords.selectAll")}
              />
            </TableHead>
            {[
              { id: "full_name", label: "colFullName", sortable: true },
              { id: "age_at_death", label: "colAge", sortable: true },
              { id: "phone", label: "colPhone" },
              { id: "storage_location", label: "colStorageLocation" },
              { id: "display_location", label: "colDisplayLocation" },
              { id: "private_info", label: "colNotes" },
            ].map((col) => (
              <TableHead
                key={col.id}
                className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4"
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => onSort(col.id as SortField)}
                    className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-all duration-200"
                  >
                    {t(`memorialRecords.${col.label}`)}
                    {renderSortIcon(col.id as SortField)}
                  </button>
                ) : (
                  t(`memorialRecords.${col.label}`)
                )}
              </TableHead>
            ))}
            <TableHead className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest text-right px-6">
              {t("memorialRecords.colActions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((record) => (
            <TableRow
              key={record.id}
              className={cn(
                "group border-b border-border/50 hover:bg-muted/20 transition-all duration-200",
                selectedIds.has(record.id) && "bg-brand-gold/[0.04] hover:bg-brand-gold/[0.06]"
              )}
            >
              <TableCell className="px-6 py-4">
                <Checkbox
                  checked={selectedIds.has(record.id)}
                  onCheckedChange={() => onToggleRow(record.id)}
                  aria-label={t("memorialRecords.selectRow", { name: record.full_name })}
                />
              </TableCell>
              <TableCell className="text-sm font-bold text-foreground py-4 px-4">
                {record.full_name}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground tabular-nums px-4 font-medium">
                {record.age_at_death ?? "-"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground px-4">
                {record.phone || "-"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground whitespace-normal px-4">
                {record.storage_location || "-"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground whitespace-normal px-4">
                {record.display_location || "-"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground/80 whitespace-normal max-w-xs px-4">
                <span className="line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                  {record.private_info || "-"}
                </span>
              </TableCell>
              <TableCell className="text-right px-6 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-brand-gold hover:bg-brand-gold/15 active:scale-95 transition-all"
                    onClick={() => onEdit(record)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15 active:scale-95 transition-all"
                    onClick={() => onDelete(record)}
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
