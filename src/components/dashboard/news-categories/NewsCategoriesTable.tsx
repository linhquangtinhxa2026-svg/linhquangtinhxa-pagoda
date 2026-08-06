"use client";

import { useTranslation } from "react-i18next";
import { Inbox, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TypographySmall } from "@/components/ui/typography";
import type { NewsCategory } from "@/types/newsCategory";

interface NewsCategoriesTableProps {
  items: NewsCategory[];
  isLoading?: boolean;
  onEdit: (category: NewsCategory) => void;
  onDelete: (category: NewsCategory) => void;
}

export function NewsCategoriesTable({
  items,
  isLoading,
  onEdit,
  onDelete,
}: NewsCategoriesTableProps) {
  const { t } = useTranslation();

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
          {t("newsCategories.empty")}
        </TypographySmall>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border">
            <TableHead className="w-40 text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-6">
              {t("newsCategories.colColor")}
            </TableHead>
            <TableHead className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4">
              {t("newsCategories.colName")}
            </TableHead>
            <TableHead className="w-24 text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4">
              {t("newsCategories.colOrder")}
            </TableHead>
            <TableHead className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest text-right px-6">
              {t("newsCategories.colActions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              className="group border-b border-border/50 hover:bg-muted/20 transition-all duration-200"
            >
              <TableCell className="px-6 py-4">
                <span
                  className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase rounded-md"
                  style={{ backgroundColor: item.backgroundColor, color: item.textColor }}
                >
                  {item.label}
                </span>
              </TableCell>
              <TableCell className="text-sm font-bold text-foreground px-4 py-4">
                {item.label}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground tabular-nums px-4 py-4">
                {item.order}
              </TableCell>
              <TableCell className="text-right px-6 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-brand-gold hover:bg-brand-gold/15 active:scale-95 transition-all"
                    onClick={() => onEdit(item)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15 active:scale-95 transition-all"
                    onClick={() => onDelete(item)}
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
