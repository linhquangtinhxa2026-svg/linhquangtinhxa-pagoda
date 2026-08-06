import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import {
  MEMORIAL_RECORDS_ARCHIVE_QUERY_KEY,
  MEMORIAL_RECORDS_QUERY_KEY,
} from "@/constants/queryKeys";
import {
  bulkDeleteMemorialRecordsService,
  bulkRestoreMemorialRecordsService,
  deleteMemorialRecordService,
  getArchivedMemorialRecordsListService,
  restoreMemorialRecordService,
} from "@/services/memorialRecords";

interface MutationOptions {
  onSuccess?: () => void;
}

export function useArchivedMemorialRecordsList(
  page: number,
  search: string,
  sort: string,
  perPage: number
) {
  return useQuery({
    queryKey: [...MEMORIAL_RECORDS_ARCHIVE_QUERY_KEY, { page, search, sort, perPage }],
    queryFn: () => getArchivedMemorialRecordsListService(page, perPage, { search, sort }),
    placeholderData: keepPreviousData,
  });
}

function useMemorialRecordsArchiveErrorToast() {
  const { t } = useTranslation();
  return (error: unknown) =>
    toast.error(error instanceof Error ? error.message : t("memorialRecords.actionError"));
}

const invalidateMemorialRecordsAndArchive = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: MEMORIAL_RECORDS_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: MEMORIAL_RECORDS_ARCHIVE_QUERY_KEY });
};

export function useRestoreMemorialRecord({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useMemorialRecordsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => restoreMemorialRecordService(id),
    onSuccess: () => {
      invalidateMemorialRecordsAndArchive(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecordsArchive.restoreSuccess"));
    },
    onError: showError,
  });

  const doRestore = useDebouncedCallback(mutate);
  return { doRestore, isRestoring: isPending };
}

export function useBulkRestoreMemorialRecords({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useMemorialRecordsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => bulkRestoreMemorialRecordsService(ids),
    onSuccess: () => {
      invalidateMemorialRecordsAndArchive(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecordsArchive.restoreSelectedSuccess"));
    },
    onError: showError,
  });

  const doBulkRestore = useDebouncedCallback(mutate, 1000);
  return { doBulkRestore, isBulkRestoring: isPending };
}

export function usePermanentlyDeleteMemorialRecord({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useMemorialRecordsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteMemorialRecordService(id),
    onSuccess: () => {
      invalidateMemorialRecordsAndArchive(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecordsArchive.deletePermanentlySuccess"));
    },
    onError: showError,
  });

  const doPermanentlyDelete = useDebouncedCallback(mutate);
  return { doPermanentlyDelete, isPermanentlyDeleting: isPending };
}

export function useBulkPermanentlyDeleteMemorialRecords({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useMemorialRecordsArchiveErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => bulkDeleteMemorialRecordsService(ids),
    onSuccess: () => {
      invalidateMemorialRecordsAndArchive(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecordsArchive.deleteSelectedPermanentlySuccess"));
    },
    onError: showError,
  });

  const doBulkPermanentlyDelete = useDebouncedCallback(mutate, 1000);
  return { doBulkPermanentlyDelete, isBulkPermanentlyDeleting: isPending };
}
