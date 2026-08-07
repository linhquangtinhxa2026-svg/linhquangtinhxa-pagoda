"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { normalizeVietnamese } from "@/lib/vietnamese";
import { toDateKey } from "@/lib/calendarGrid";
import { formatLunarDateFull, getLunarDateFromIso } from "@/lib/lunarCalendar";
import type { PrayerEvent } from "@/types/prayerEvent";
import { usePrayerEventsList } from "./usePrayerEvents";
import {
  PrayerEventsFilterBar,
  type PrayerEventsViewMode,
  type PrayerEventTypeFilter,
} from "./PrayerEventsFilterBar";
import { PrayerEventsTable } from "./PrayerEventsTable";
import { PrayerEventsPagination } from "./PrayerEventsPagination";
import { PrayerEventsCalendar } from "./PrayerEventsCalendar";
import { PrayerEventDayList } from "./PrayerEventDayList";
import { PrayerEventModal, type PrayerEventModalState } from "./PrayerEventModal";
import { ArchivePrayerEventDialog } from "./ArchivePrayerEventDialog";
import { ArchiveSelectedPrayerEventsDialog } from "./ArchiveSelectedPrayerEventsDialog";
import { PrayerEventsImportExport } from "./PrayerEventsImportExport";

const DEFAULT_PER_PAGE = 10;

export function PrayerEventsContainer() {
  const { t } = useTranslation();
  const { data: events = [], isLoading } = usePrayerEventsList();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<PrayerEventsViewMode>("list");
  const [typeFilter, setTypeFilter] = useState<PrayerEventTypeFilter>("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const [modalState, setModalState] = useState<PrayerEventModalState | null>(null);
  const [archivingEvent, setArchivingEvent] = useState<PrayerEvent | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isArchiveSelectedOpen, setIsArchiveSelectedOpen] = useState(false);

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
    return events.filter((event) =>
      normalizeVietnamese(
        [
          event.registrantName,
          event.note,
          event.eventDate,
          formatLunarDateFull(getLunarDateFromIso(event.eventDate)),
        ].join(" ")
      ).includes(query)
    );
  }, [events, search]);

  // Type filter only narrows the list view — the calendar always shows every type.
  const filteredEvents = useMemo(() => {
    if (typeFilter === "all") return searchedEvents;
    return searchedEvents.filter((event) => event.type === typeFilter);
  }, [searchedEvents, typeFilter]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, PrayerEvent[]>();
    for (const event of searchedEvents) {
      const existing = map.get(event.eventDate);
      if (existing) {
        existing.push(event);
      } else {
        map.set(event.eventDate, [event]);
      }
    }
    return map;
  }, [searchedEvents]);

  const sortedEvents = useMemo(() => {
    const sorted = [...filteredEvents].sort((a, b) => a.eventDate.localeCompare(b.eventDate));
    if (sortDir === "desc") sorted.reverse();
    return sorted;
  }, [filteredEvents, sortDir]);

  const totalItems = sortedEvents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const pagedEvents = sortedEvents.slice((page - 1) * perPage, page * perPage);

  const handleSortDirChange = (nextSortDir: "asc" | "desc") => {
    setSortDir(nextSortDir);
    setPage(1);
  };

  const handlePerPageChange = (nextPerPage: number) => {
    setPerPage(nextPerPage);
    setPage(1);
    setSelectedIds(new Set());
  };

  const handleViewModeChange = (nextMode: PrayerEventsViewMode) => {
    setViewMode(nextMode);
    if (nextMode === "calendar") {
      setSelectedDateKey(toDateKey(new Date()));
    }
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
    const allSelected =
      pagedEvents.length > 0 && pagedEvents.every((event) => selectedIds.has(event.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        pagedEvents.forEach((event) => next.delete(event.id));
      } else {
        pagedEvents.forEach((event) => next.add(event.id));
      }
      return next;
    });
  };

  const selectedDateEvents = selectedDateKey ? (eventsByDate.get(selectedDateKey) ?? []) : [];

  const openAddModal = (initialDate?: string) => {
    setModalState({ mode: "add", initialDate });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <TypographyH2 className="text-3xl font-extrabold tracking-tight border-none pb-0 text-foreground">
            {t("prayerEvents.pageTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("prayerEvents.pageSubtitle")}
          </TypographyMuted>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <Button
              type="button"
              className="bg-destructive hover:bg-destructive/90 text-white font-bold shadow-md shadow-destructive/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
              onClick={() => setIsArchiveSelectedOpen(true)}
            >
              <Trash2 className="size-5" />
              {t("prayerEvents.archiveSelected", { count: selectedIds.size })}
            </Button>
          )}
          <Button
            type="button"
            className="bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
            onClick={() => openAddModal()}
          >
            <Plus className="size-5" />
            {t("prayerEvents.addNew")}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-end bg-white p-5 rounded-2xl border border-border shadow-sm">
          <PrayerEventsImportExport />
        </div>

        <PrayerEventsFilterBar
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          typeFilter={typeFilter}
          onTypeFilterChange={handleTypeFilterChange}
        />

        {viewMode === "list" ? (
          <>
            <PrayerEventsTable
              items={pagedEvents}
              isLoading={isLoading}
              onEdit={(event) => setModalState({ mode: "edit", event })}
              onDelete={setArchivingEvent}
              selectedIds={selectedIds}
              onToggleRow={handleToggleRow}
              onToggleAll={handleToggleAll}
              sortDir={sortDir}
              onSortDirChange={handleSortDirChange}
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
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
            <PrayerEventsCalendar
              eventsByDate={eventsByDate}
              selectedDateKey={selectedDateKey}
              onSelectDate={setSelectedDateKey}
              onAdd={(dateKey) => openAddModal(dateKey)}
            />
            <PrayerEventDayList
              dateKey={selectedDateKey}
              events={selectedDateEvents}
              onAdd={() => openAddModal(selectedDateKey ?? undefined)}
              onEdit={(event) => setModalState({ mode: "edit", event })}
              onDelete={setArchivingEvent}
            />
          </div>
        )}
      </div>

      <PrayerEventModal state={modalState} onClose={() => setModalState(null)} />
      <ArchivePrayerEventDialog
        event={archivingEvent}
        onOpenChange={(open) => !open && setArchivingEvent(null)}
        onArchived={(id) =>
          setSelectedIds((prev) => {
            if (!prev.has(id)) return prev;
            const next = new Set(prev);
            next.delete(id);
            return next;
          })
        }
      />
      <ArchiveSelectedPrayerEventsDialog
        selectedIds={Array.from(selectedIds)}
        open={isArchiveSelectedOpen}
        onOpenChange={setIsArchiveSelectedOpen}
        onArchived={() => setSelectedIds(new Set())}
      />
    </div>
  );
}
