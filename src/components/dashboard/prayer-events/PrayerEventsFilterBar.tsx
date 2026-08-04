"use client";

import { useTranslation } from "react-i18next";
import { Calendar, List, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { SingleSelect } from "@/components/ui/single-select";
import { cn } from "@/lib/utils";
import { useCeremonyTypesList } from "@/hooks/dashboard/useCeremonyTypes";
import { UNKNOWN_CEREMONY_TYPE_VALUE } from "@/lib/ceremonyType";
import type { PrayerEventType } from "@/types/prayerEvent";

export type PrayerEventsViewMode = "list" | "calendar";
export type PrayerEventTypeFilter = "all" | PrayerEventType;

interface PrayerEventsFilterBarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  viewMode: PrayerEventsViewMode;
  onViewModeChange: (mode: PrayerEventsViewMode) => void;
  typeFilter: PrayerEventTypeFilter;
  onTypeFilterChange: (type: PrayerEventTypeFilter) => void;
}

export function PrayerEventsFilterBar({
  searchInput,
  onSearchInputChange,
  viewMode,
  onViewModeChange,
  typeFilter,
  onTypeFilterChange,
}: PrayerEventsFilterBarProps) {
  const { t } = useTranslation();
  const { data: ceremonyTypes = [] } = useCeremonyTypesList();

  const TYPE_OPTIONS = [
    { value: "all", label: t("prayerEvents.filterAll") },
    ...ceremonyTypes.map((ceremonyType) => ({
      value: ceremonyType.value,
      label: ceremonyType.label,
    })),
    { value: UNKNOWN_CEREMONY_TYPE_VALUE, label: t("prayerEvents.typeUnknown") },
  ];

  return (
    <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-border shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="relative w-full sm:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/50 transition-colors group-focus-within:text-brand-gold" />
          <Input
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            placeholder={t("prayerEvents.searchPlaceholder")}
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

        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/40 border border-border/60 shrink-0">
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer",
              viewMode === "list"
                ? "bg-white text-brand-gold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="size-4" />
            {t("prayerEvents.viewList")}
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("calendar")}
            className={cn(
              "flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer",
              viewMode === "calendar"
                ? "bg-white text-brand-gold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Calendar className="size-4" />
            {t("prayerEvents.viewCalendar")}
          </button>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 shrink-0">
            {t("prayerEvents.filterByType")}
          </span>
          <SingleSelect
            value={typeFilter}
            onValueChange={onTypeFilterChange}
            options={TYPE_OPTIONS}
            triggerClassName="w-[200px]"
          />
        </div>
      )}
    </div>
  );
}
