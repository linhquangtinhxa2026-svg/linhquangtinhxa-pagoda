"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { normalizeVietnamese } from "@/lib/vietnamese";
import { PrayerEventsPagination } from "@/components/dashboard/prayer-events/PrayerEventsPagination";
import type { PrayerEvent } from "@/types/prayerEvent";
import { useArchivedPrayerEventsList } from "./usePrayerEventsArchive";
import {
  PrayerEventsArchiveFilterBar,
  type PrayerEventTypeFilter,
} from "./PrayerEventsArchiveFilterBar";
import { PrayerEventsArchiveTable } from "./PrayerEventsArchiveTable";
import { PrayerEventsArchiveBulkActionsBar } from "./PrayerEventsArchiveBulkActionsBar";
import { RestorePrayerEventDialog } from "./RestorePrayerEventDialog";
import { PermanentlyDeletePrayerEventDialog } from "./PermanentlyDeletePrayerEventDialog";
import { RestoreSelectedPrayerEventsDialog } from "./RestoreSelectedPrayerEventsDialog";
import { DeleteSelectedPrayerEventsPermanentlyDialog } from "./DeleteSelectedPrayerEventsPermanentlyDialog";

const DEFAULT_PER_PAGE = 10;

export function PrayerEventsArchiveContainer() {
  const { t } = useTranslation();
  const { data: events = [], isLoading } = useArchivedPrayerEventsList();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<PrayerEventTypeFilter>("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const [restoringEvent, setRestoringEvent] = useState<PrayerEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<PrayerEvent | null>(null);
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

  const searchedEvents = useMemo(() => {
    if (!search.trim()) return events;
    const query = normalizeVietnamese(search);
    return events.filter(event =>
      normalizeVietnamese(
        [event.registrantName, event.subjectName, event.phone, event.note].join(" ")
      ).includes(query)
    );
  }, [events, search]);

  const filteredEvents = useMemo(() => {
    if (typeFilter === "all") return searchedEvents;
    return searchedEvents.filter(event => event.type === typeFilter);
  }, [searchedEvents, typeFilter]);

  const totalItems = filteredEvents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const pagedEvents = filteredEvents.slice((page - 1) * perPage, page * perPage);

  const handlePerPageChange = (nextPerPage: number) => {
    setPerPage(nextPerPage);
    setPage(1);
    setSelectedIds(new Set());
  };

  const handleTypeFilterChange = (nextType: PrayerEventTypeFilter) => {
    setTypeFilter(nextType);
    setPage(1);
    setSelectedIds(new Set());
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setSelectedIds(new Set());
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds(prev => {
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
    const allSelected =
      pagedEvents.length > 0 && pagedEvents.every(event => selectedIds.has(event.id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allSelected) {
        pagedEvents.forEach(event => next.delete(event.id));
      } else {
        pagedEvents.forEach(event => next.add(event.id));
      }
      return next;
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <TypographyH2 className="text-3xl font-extrabold tracking-tight border-none pb-0 text-foreground">
            {t("prayerEventsArchive.pageTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("prayerEventsArchive.pageSubtitle")}
          </TypographyMuted>
        </div>
        <PrayerEventsArchiveBulkActionsBar
          selectedCount={selectedIds.size}
          onRestoreSelected={() => setIsRestoreSelectedOpen(true)}
          onDeleteSelectedPermanently={() => setIsDeleteSelectedOpen(true)}
        />
      </div>

      <div className="space-y-6">
        <PrayerEventsArchiveFilterBar
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          typeFilter={typeFilter}
          onTypeFilterChange={handleTypeFilterChange}
        />

        <PrayerEventsArchiveTable
          items={pagedEvents}
          isLoading={isLoading}
          onRestore={setRestoringEvent}
          onDeletePermanently={setDeletingEvent}
          selectedIds={selectedIds}
          onToggleRow={handleToggleRow}
          onToggleAll={handleToggleAll}
        />
        {totalItems > 0 && (
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
            <PrayerEventsPagination
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              perPage={perPage}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        )}
      </div>

      <RestorePrayerEventDialog
        event={restoringEvent}
        onOpenChange={open => !open && setRestoringEvent(null)}
      />
      <PermanentlyDeletePrayerEventDialog
        event={deletingEvent}
        onOpenChange={open => !open && setDeletingEvent(null)}
      />
      <RestoreSelectedPrayerEventsDialog
        selectedIds={Array.from(selectedIds)}
        open={isRestoreSelectedOpen}
        onOpenChange={setIsRestoreSelectedOpen}
      />
      <DeleteSelectedPrayerEventsPermanentlyDialog
        selectedIds={Array.from(selectedIds)}
        open={isDeleteSelectedOpen}
        onOpenChange={setIsDeleteSelectedOpen}
      />
    </div>
  );
}
