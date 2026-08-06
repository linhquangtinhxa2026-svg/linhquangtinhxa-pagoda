"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import type { MemorialRecord } from "@/types/memorialRecord";
import { MemorialRecordsPagination } from "@/components/dashboard/memorial-records/MemorialRecordsPagination";
import { useArchivedMemorialRecordsList } from "./useMemorialRecordsArchive";
import { MemorialRecordsArchiveTable } from "./MemorialRecordsArchiveTable";
import { MemorialRecordsArchiveBulkActionsBar } from "./MemorialRecordsArchiveBulkActionsBar";
import { RestoreMemorialRecordDialog } from "./RestoreMemorialRecordDialog";
import { PermanentlyDeleteMemorialRecordDialog } from "./PermanentlyDeleteMemorialRecordDialog";
import { RestoreSelectedMemorialRecordsDialog } from "./RestoreSelectedMemorialRecordsDialog";
import { DeleteSelectedMemorialRecordsPermanentlyDialog } from "./DeleteSelectedMemorialRecordsPermanentlyDialog";

const DEFAULT_PER_PAGE = 10;

export function MemorialRecordsArchiveContainer() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const [restoringMemorialRecord, setRestoringMemorialRecord] = useState<MemorialRecord | null>(
    null
  );
  const [deletingMemorialRecord, setDeletingMemorialRecord] = useState<MemorialRecord | null>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isRestoreSelectedOpen, setIsRestoreSelectedOpen] = useState(false);
  const [isDeleteSelectedOpen, setIsDeleteSelectedOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
      setSelectedIds(new Set());
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  const { data, isLoading, isFetching } = useArchivedMemorialRecordsList(
    page,
    search,
    "-archivedAt",
    perPage
  );

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
            {t("memorialRecordsArchive.pageTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("memorialRecordsArchive.pageSubtitle")}
          </TypographyMuted>
        </div>
        <MemorialRecordsArchiveBulkActionsBar
          selectedCount={selectedIds.size}
          onRestoreSelected={() => setIsRestoreSelectedOpen(true)}
          onDeleteSelectedPermanently={() => setIsDeleteSelectedOpen(true)}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="relative w-full sm:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/50 transition-colors group-focus-within:text-brand-gold" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("memorialRecordsArchive.searchPlaceholder")}
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
        </div>

        <MemorialRecordsArchiveTable
          items={data?.items ?? []}
          isLoading={isLoading || isFetching}
          onRestore={setRestoringMemorialRecord}
          onDeletePermanently={setDeletingMemorialRecord}
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

      <RestoreMemorialRecordDialog
        memorialRecord={restoringMemorialRecord}
        onOpenChange={(open) => !open && setRestoringMemorialRecord(null)}
      />
      <PermanentlyDeleteMemorialRecordDialog
        memorialRecord={deletingMemorialRecord}
        onOpenChange={(open) => !open && setDeletingMemorialRecord(null)}
      />
      <RestoreSelectedMemorialRecordsDialog
        selectedIds={Array.from(selectedIds)}
        open={isRestoreSelectedOpen}
        onOpenChange={setIsRestoreSelectedOpen}
      />
      <DeleteSelectedMemorialRecordsPermanentlyDialog
        selectedIds={Array.from(selectedIds)}
        open={isDeleteSelectedOpen}
        onOpenChange={setIsDeleteSelectedOpen}
      />
    </div>
  );
}
