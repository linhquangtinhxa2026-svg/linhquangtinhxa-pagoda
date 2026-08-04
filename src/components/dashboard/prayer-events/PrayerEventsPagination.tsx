"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypographyMuted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const SIBLING_COUNT = 1;

interface PrayerEventsPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const getPageNumbers = (current: number, total: number): (number | "ellipsis")[] => {
  const pages = new Set<number>([1, total]);
  for (let offset = -SIBLING_COUNT; offset <= SIBLING_COUNT; offset++) {
    const candidate = current + offset;
    if (candidate >= 1 && candidate <= total) pages.add(candidate);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("ellipsis");
    result.push(p);
  });
  return result;
};

export function PrayerEventsPagination({
  page,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
  onPerPageChange,
}: PrayerEventsPaginationProps) {
  const { t } = useTranslation();
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <TypographyMuted className="text-xs font-semibold uppercase tracking-wider !mt-0 whitespace-nowrap">
          <Trans
            i18nKey="prayerEvents.totalItems"
            values={{ count: totalItems }}
            components={{ bold: <span className="font-bold text-foreground" /> }}
          />
        </TypographyMuted>
        <div className="flex items-center gap-2">
          <TypographyMuted className="text-xs hidden sm:inline-block !mt-0">
            {t("common.perPage")}
          </TypographyMuted>
          <Select
            value={String(perPage)}
            onValueChange={(value) => onPerPageChange(Number(value))}
          >
            <SelectTrigger className="h-9 w-[110px] text-xs rounded-lg border-border/60 bg-muted/5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} / {t("common.page")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-9 rounded-lg border-border/60 bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label={t("prayerEvents.prev")}
        >
          <ChevronLeft className="size-4.5" />
        </Button>

        <div className="flex items-center gap-1 mx-1">
          {pageNumbers.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted-foreground/50 font-bold">
                •••
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={cn(
                  "size-9 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer active:scale-90",
                  p === page
                    ? "bg-brand-gold text-white shadow-md shadow-brand-gold/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {p}
              </button>
            )
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-9 rounded-lg border-border/60 bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label={t("prayerEvents.next")}
        >
          <ChevronRight className="size-4.5" />
        </Button>
      </div>
    </div>
  );
}
