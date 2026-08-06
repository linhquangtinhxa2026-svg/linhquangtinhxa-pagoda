import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import {
  PRAYER_EVENTS_ARCHIVE_QUERY_KEY,
  PRAYER_EVENTS_QUERY_KEY,
} from "@/constants/queryKeys";
import type { PrayerEvent } from "@/types/prayerEvent";
import {
  archivePrayerEventService,
  bulkArchivePrayerEventsService,
  bulkCreatePrayerEventsService,
  createPrayerEventService,
  getPrayerEventsListService,
  updatePrayerEventService,
} from "@/services/prayerEvents";

interface MutationOptions {
  onSuccess?: () => void;
}

export function usePrayerEventsList() {
  return useQuery({
    queryKey: PRAYER_EVENTS_QUERY_KEY,
    queryFn: getPrayerEventsListService,
  });
}

function usePrayerEventErrorToast() {
  const { t } = useTranslation();
  return (error: unknown) =>
    toast.error(error instanceof Error ? error.message : t("prayerEvents.actionError"));
}

export function useCreatePrayerEvent({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<PrayerEvent>) => createPrayerEventService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEvents.createSuccess"));
    },
    onError: showError,
  });

  const doCreate = useDebouncedCallback(mutate);
  return { doCreate, isSaving: isPending };
}

export function useUpdatePrayerEvent({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PrayerEvent> }) =>
      updatePrayerEventService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEvents.updateSuccess"));
    },
    onError: showError,
  });

  const doUpdate = useDebouncedCallback(mutate);
  return { doUpdate, isSaving: isPending };
}

export function useArchivePrayerEvent({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => archivePrayerEventService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_ARCHIVE_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEvents.archiveSuccess"));
    },
    onError: showError,
  });

  const doArchive = useDebouncedCallback(mutate);
  return { doArchive, isArchiving: isPending };
}

export function useBulkArchivePrayerEvents({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => bulkArchivePrayerEventsService(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_ARCHIVE_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEvents.archiveSelectedSuccess"));
    },
    onError: showError,
  });

  const doBulkArchive = useDebouncedCallback(mutate, 1000);
  return { doBulkArchive, isBulkArchiving: isPending };
}

export function useBulkImportPrayerEvents({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventErrorToast();
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (records: Partial<PrayerEvent>[]) => {
      setProgress({ done: 0, total: records.length });
      return bulkCreatePrayerEventsService(records, (done, total) =>
        setProgress({ done, total })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEvents.importSuccess"));
    },
    onError: showError,
    onSettled: () => setProgress(null),
  });

  const doImport = useDebouncedCallback(mutate, 1000);
  return { doImport, isImporting: isPending, importProgress: progress };
}
