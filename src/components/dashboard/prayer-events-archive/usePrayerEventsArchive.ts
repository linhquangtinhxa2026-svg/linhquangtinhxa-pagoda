import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import {
  PRAYER_EVENTS_ARCHIVE_QUERY_KEY,
  PRAYER_EVENTS_QUERY_KEY,
} from "@/constants/queryKeys";
import {
  bulkPermanentlyDeletePrayerEventsService,
  bulkRestorePrayerEventsService,
  getArchivedPrayerEventsListService,
  permanentlyDeletePrayerEventService,
  restorePrayerEventService,
} from "@/services/prayerEvents";

interface MutationOptions {
  onSuccess?: () => void;
}

export function useArchivedPrayerEventsList() {
  return useQuery({
    queryKey: PRAYER_EVENTS_ARCHIVE_QUERY_KEY,
    queryFn: getArchivedPrayerEventsListService,
  });
}

function usePrayerEventsArchiveErrorToast() {
  const { t } = useTranslation();
  return (error: unknown) =>
    toast.error(error instanceof Error ? error.message : t("prayerEvents.actionError"));
}

export function useRestorePrayerEvent({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => restorePrayerEventService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_ARCHIVE_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEventsArchive.restoreSuccess"));
    },
    onError: showError,
  });

  const doRestore = useDebouncedCallback(mutate);
  return { doRestore, isRestoring: isPending };
}

export function useBulkRestorePrayerEvents({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => bulkRestorePrayerEventsService(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_ARCHIVE_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEventsArchive.restoreSelectedSuccess"));
    },
    onError: showError,
  });

  const doBulkRestore = useDebouncedCallback(mutate, 1000);
  return { doBulkRestore, isBulkRestoring: isPending };
}

export function usePermanentlyDeletePrayerEvent({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => permanentlyDeletePrayerEventService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_ARCHIVE_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEventsArchive.deletePermanentlySuccess"));
    },
    onError: showError,
  });

  const doPermanentlyDelete = useDebouncedCallback(mutate);
  return { doPermanentlyDelete, isPermanentlyDeleting: isPending };
}

export function useBulkPermanentlyDeletePrayerEvents({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = usePrayerEventsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => bulkPermanentlyDeletePrayerEventsService(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PRAYER_EVENTS_ARCHIVE_QUERY_KEY });
      onSuccess?.();
      toast.success(t("prayerEventsArchive.deleteSelectedPermanentlySuccess"));
    },
    onError: showError,
  });

  const doBulkPermanentlyDelete = useDebouncedCallback(mutate, 1000);
  return { doBulkPermanentlyDelete, isBulkPermanentlyDeleting: isPending };
}
