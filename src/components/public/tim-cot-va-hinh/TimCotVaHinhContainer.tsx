"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTimCotVaHinh } from "./useTimCotVaHinh";
import { TimCotVaHinhSearchBar } from "./TimCotVaHinhSearchBar";
import { TimCotVaHinhResultsTable } from "./TimCotVaHinhResultsTable";
import { TimCotVaHinhPagination } from "./TimCotVaHinhPagination";

export function TimCotVaHinhContainer() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  const { data, isFetching } = useTimCotVaHinh(page, search);
  const isInitialLoading = isFetching && !data;
  const hasResults = !!data && data.items.length > 0;
  const hasNoResults = !isFetching && !!data && data.items.length === 0;

  return (
    <section className="bg-[#fdf8f0] py-16 sm:py-24 lg:py-32 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 sm:mb-20">
          <TimCotVaHinhSearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder={t("timCotVaHinh.searchPlaceholder")}
            label={t("timCotVaHinh.eyebrow")}
          />
        </div>

        {isInitialLoading && (
          <div className="flex flex-col items-center gap-4 py-24 animate-in fade-in duration-500">
            <div className="relative size-10">
              <span className="absolute inset-0 border-2 border-[#c4973a]/10 rounded-full" />
              <span className="absolute inset-0 border-2 border-[#c4973a] border-t-transparent rounded-full animate-spin" />
            </div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#c4973a]/60"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t("timCotVaHinh.loading")}
            </p>
          </div>
        )}

        {hasNoResults && (
          <div className="max-w-xl mx-auto flex flex-col items-center gap-6 border border-slate-200 bg-white p-12 sm:p-16 text-center animate-in fade-in zoom-in-95 duration-500 shadow-sm">
            <div className="size-16 text-[#c4973a]/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <div className="space-y-3">
              <p
                className="text-2xl sm:text-3xl font-semibold text-[#1c0a0a]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t("timCotVaHinh.noResults")}
              </p>
              <p className="text-sm text-[#5a463d] leading-relaxed font-medium">
                {t("timCotVaHinh.searchSuggestion")}
              </p>
            </div>
            <button
              onClick={() => setSearchInput("")}
              className="mt-4 cursor-pointer text-[10px] tracking-[0.4em] uppercase font-bold text-[#c4973a] hover:text-[#d4aa55] border border-[#c4973a]/30 px-6 py-2.5 transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t("timCotVaHinh.clearSearch")}
            </button>
          </div>
        )}

        {hasResults && data && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 flex items-center justify-between">
              <h2
                className="text-[11px] tracking-[0.4em] uppercase font-bold text-[#c4973a]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {t("timCotVaHinh.resultsCount", { count: data.totalItems })}
              </h2>
              <div className="h-px flex-1 ml-8 bg-[#c4973a]/10" />
            </div>

            <TimCotVaHinhResultsTable items={data.items} />

            {data.totalPages > 1 && (
              <TimCotVaHinhPagination
                page={data.page}
                totalPages={data.totalPages}
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
