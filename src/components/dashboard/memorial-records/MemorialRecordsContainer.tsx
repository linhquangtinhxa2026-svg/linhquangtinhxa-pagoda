"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MemorialRecord } from "@/types/memorialRecord";
import { MemorialRecordsStatsCards } from "./MemorialRecordsStatsCards";
import { MemorialRecordsImportExport } from "./MemorialRecordsImportExport";
import { MemorialRecordsTable, type SortField } from "./MemorialRecordsTable";
import { MemorialRecordsPagination } from "./MemorialRecordsPagination";
import { AddMemorialRecordModal } from "./AddMemorialRecordModal";
import { EditMemorialRecordModal } from "./EditMemorialRecordModal";
import { DeleteMemorialRecordDialog } from "./DeleteMemorialRecordDialog";
import { useMemorialRecordsList } from "./useMemorialRecords";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

const DEFAULT_PER_PAGE = 10;

export function MemorialRecordsContainer() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMemorialRecord, setEditingMemorialRecord] = useState<MemorialRecord | null>(null);
  const [deletingMemorialRecord, setDeletingMemorialRecord] = useState<MemorialRecord | null>(
    null
  );
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
      setSelectedIds(new Set());
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sort = sortField ? `${sortDir === "desc" ? "-" : ""}${sortField}` : "-created";

  const { data, isLoading, isFetching } = useMemorialRecordsList(page, search, sort, perPage);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setSelectedIds(new Set());
  };

  const handlePerPageChange = (nextPerPage: number) => {
    setPerPage(nextPerPage);
    setPage(1);
    setSelectedIds(new Set());
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    const items = data?.items ?? [];
    const allSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        items.forEach((item) => next.delete(item.id));
      } else {
        items.forEach((item) => next.add(item.id));
      }
      return next;
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <TypographyH2 className="text-3xl font-extrabold tracking-tight border-none pb-0 text-foreground">
            {t("memorialRecords.pageTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("memorialRecords.pageSubtitle")}
          </TypographyMuted>
        </div>
        <Button
          type="button"
          className="bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="size-5" />
          {t("memorialRecords.addNew")}
        </Button>
      </div>

      <MemorialRecordsStatsCards />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="relative w-full sm:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/50 transition-colors group-focus-within:text-brand-gold" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("memorialRecords.searchPlaceholder")}
              className="pl-12 pr-11 h-12 rounded-xl border-border bg-muted/5 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold transition-all"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-muted text-muted-foreground/60 transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <MemorialRecordsImportExport
            selectedIds={Array.from(selectedIds)}
            onClearSelection={() => setSelectedIds(new Set())}
          />
        </div>

        <MemorialRecordsTable
          items={data?.items ?? []}
          isLoading={isLoading || isFetching}
          onEdit={setEditingMemorialRecord}
          onDelete={setDeletingMemorialRecord}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          selectedIds={selectedIds}
          onToggleRow={handleToggleRow}
          onToggleAll={handleToggleAll}
        />

        {data && data.totalItems > 0 && (
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
            <MemorialRecordsPagination
              page={data.page}
              totalPages={data.totalPages}
              totalItems={data.totalItems}
              perPage={perPage}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        )}
      </div>

      <AddMemorialRecordModal open={isAddOpen} onOpenChange={setIsAddOpen} />
      <EditMemorialRecordModal
        memorialRecord={editingMemorialRecord}
        onOpenChange={(open) => !open && setEditingMemorialRecord(null)}
      />
      <DeleteMemorialRecordDialog
        memorialRecord={deletingMemorialRecord}
        onOpenChange={(open) => !open && setDeletingMemorialRecord(null)}
      />
    </div>
  );
}
