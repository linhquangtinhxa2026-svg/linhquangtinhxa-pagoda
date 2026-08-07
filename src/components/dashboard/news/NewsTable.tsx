"use client";

import Link from "next/link";
import Image from "next/image";
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
import { formatDate } from "@/lib/date";
import { ROUTES } from "@/constants/routes";
import type { News } from "@/types/news";

interface NewsTableProps {
  items: News[];
  isLoading?: boolean;
  onDelete: (news: News) => void;
}

const COLUMNS = ["colCover", "colTitle", "colCategory", "colStatus", "colCreated"] as const;

export function NewsTable({ items, isLoading, onDelete }: NewsTableProps) {
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
          {t("news.empty")}
        </TypographySmall>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
      <Table className="min-w-[860px]">
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border">
            {COLUMNS.map((col) => (
              <TableHead
                key={col}
                className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest py-4 px-4"
              >
                {t(`news.${col}`)}
              </TableHead>
            ))}
            <TableHead className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest text-right px-6">
              {t("news.colActions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((news) => {
            const category = news.expand?.category;
            return (
              <TableRow
                key={news.id}
                className="group border-b border-border/50 hover:bg-muted/20 transition-all duration-200"
              >
                <TableCell className="px-4 py-3">
                  <div className="relative size-14 rounded-lg overflow-hidden bg-muted/20 shrink-0">
                    <Image
                      src={news.coverImageUrl}
                      alt={news.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 max-w-sm">
                  <Link
                    href={`${ROUTES.QUAN_LY_TIN_TUC}/${news.id}`}
                    className="text-sm font-bold text-foreground hover:text-brand-gold transition-colors line-clamp-2"
                  >
                    {news.title}
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-4">
                  {category && (
                    <span
                      className="px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase rounded-md"
                      style={{ backgroundColor: category.backgroundColor, color: category.textColor }}
                    >
                      {category.label}
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <span
                    className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-md ${
                      news.isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {news.isPublished ? t("news.statusPublished") : t("news.statusDraft")}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground px-4 py-4 whitespace-nowrap">
                  {formatDate(news.created)}
                </TableCell>
                <TableCell className="text-right px-6 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8.5 rounded-lg text-muted-foreground hover:text-brand-gold hover:bg-brand-gold/15 active:scale-95 transition-all"
                      render={<Link href={`${ROUTES.QUAN_LY_TIN_TUC}/${news.id}`} />}
                      nativeButton={false}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15 active:scale-95 transition-all"
                      onClick={() => onDelete(news)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
