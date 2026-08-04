"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { normalizeVietnamese } from "@/lib/vietnamese";
import { ROUTES } from "@/constants/routes";
import type { News } from "@/types/news";
import { useNewsList } from "./useNews";
import { NewsFilterBar, type NewsStatusFilter } from "./NewsFilterBar";
import { NewsTable } from "./NewsTable";
import { NewsPagination } from "./NewsPagination";
import { DeleteNewsDialog } from "./DeleteNewsDialog";

const DEFAULT_PER_PAGE = 10;

export function NewsContainer() {
  const { t } = useTranslation();
  const { data: news = [], isLoading } = useNewsList();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<NewsStatusFilter>("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [deletingNews, setDeletingNews] = useState<News | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  const filteredNews = useMemo(() => {
    let result = news;

    if (search.trim()) {
      const query = normalizeVietnamese(search);
      result = result.filter((item) => normalizeVietnamese(item.title).includes(query));
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      const wantsPublished = statusFilter === "published";
      result = result.filter((item) => item.isPublished === wantsPublished);
    }

    return result;
  }, [news, search, categoryFilter, statusFilter]);

  const totalItems = filteredNews.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const pagedNews = filteredNews.slice((page - 1) * perPage, page * perPage);

  const handlePerPageChange = (nextPerPage: number) => {
    setPerPage(nextPerPage);
    setPage(1);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <TypographyH2 className="text-3xl font-extrabold tracking-tight border-none pb-0 text-foreground">
            {t("news.pageTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("news.pageSubtitle")}
          </TypographyMuted>
        </div>
        <Button
          className="bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
          render={<Link href={`${ROUTES.QUAN_LY_TIN_TUC}/moi`} />}
          nativeButton={false}
        >
          <Plus className="size-5" />
          {t("news.addNew")}
        </Button>
      </div>

      <div className="space-y-6">
        <NewsFilterBar
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={(value) => {
            setCategoryFilter(value);
            setPage(1);
          }}
          statusFilter={statusFilter}
          onStatusFilterChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
        />

        <NewsTable items={pagedNews} isLoading={isLoading} onDelete={setDeletingNews} />

        {totalItems > 0 && (
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
            <NewsPagination
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              perPage={perPage}
              onPageChange={setPage}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        )}
      </div>

      <DeleteNewsDialog news={deletingNews} onOpenChange={(open) => !open && setDeletingNews(null)} />
    </div>
  );
}
