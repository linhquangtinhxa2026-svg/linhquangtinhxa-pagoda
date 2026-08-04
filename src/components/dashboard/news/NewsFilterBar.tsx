"use client";

import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { SingleSelect } from "@/components/ui/single-select";
import { useNewsCategoriesList } from "@/hooks/dashboard/useNewsCategories";

export type NewsStatusFilter = "all" | "published" | "draft";

interface NewsFilterBarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  statusFilter: NewsStatusFilter;
  onStatusFilterChange: (value: NewsStatusFilter) => void;
}

export function NewsFilterBar({
  searchInput,
  onSearchInputChange,
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
}: NewsFilterBarProps) {
  const { t } = useTranslation();
  const { data: categories = [] } = useNewsCategoriesList();

  const CATEGORY_OPTIONS = [
    { value: "all", label: t("news.filterAll") },
    ...categories.map((category) => ({ value: category.id, label: category.label })),
  ];

  const STATUS_OPTIONS = [
    { value: "all", label: t("news.filterAll") },
    { value: "published", label: t("news.statusPublished") },
    { value: "draft", label: t("news.statusDraft") },
  ];

  return (
    <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-border shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="relative w-full sm:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/50 transition-colors group-focus-within:text-brand-gold" />
          <Input
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            placeholder={t("news.searchPlaceholder")}
            className="pl-12 pr-11 h-12 rounded-xl border-border bg-muted/5 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold transition-all"
          />
          {searchInput && (
            <button
              onClick={() => onSearchInputChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-muted text-muted-foreground/60 transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 shrink-0">
            {t("news.filterByCategory")}
          </span>
          <SingleSelect
            value={categoryFilter}
            onValueChange={onCategoryFilterChange}
            options={CATEGORY_OPTIONS}
            triggerClassName="w-[180px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 shrink-0">
            {t("news.filterByStatus")}
          </span>
          <SingleSelect
            value={statusFilter}
            onValueChange={(value) => onStatusFilterChange(value as NewsStatusFilter)}
            options={STATUS_OPTIONS}
            triggerClassName="w-[160px]"
          />
        </div>
      </div>
    </div>
  );
}
