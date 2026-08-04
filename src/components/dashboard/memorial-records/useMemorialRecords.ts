import { useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import type { MemorialRecord } from "@/types/memorialRecord";
import {
  bulkCreateMemorialRecordsService,
  bulkDeleteMemorialRecordsService,
  createMemorialRecordService,
  deleteAllMemorialRecordsService,
  deleteMemorialRecordService,
  getMemorialRecordsListService,
  updateMemorialRecordService,
} from "@/services/memorialRecords";

interface MutationOptions {
  onSuccess?: () => void;
}

export function useMemorialRecordsList(page: number, search: string, sort: string, perPage: number) {
  return useQuery({
    queryKey: ["memorial-records", { page, search, sort, perPage }],
    queryFn: () => getMemorialRecordsListService(page, perPage, { search, sort }),
    placeholderData: keepPreviousData,
  });
}

export function useMemorialRecordsStats() {
  return useQuery({
    queryKey: ["memorial-records-stats"],
    queryFn: async () => {
      const [total, withPhone] = await Promise.all([
        pb.collection(COLLECTIONS.MEMORIAL_RECORDS).getList(1, 1, { requestKey: null }),
        pb.collection(COLLECTIONS.MEMORIAL_RECORDS).getList(1, 1, {
          filter: "phone != ''",
          requestKey: null,
        }),
      ]);
      return { total: total.totalItems, withPhone: withPhone.totalItems };
    },
  });
}

const invalidateMemorialRecords = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: ["memorial-records"] });
  queryClient.invalidateQueries({ queryKey: ["memorial-records-stats"] });
};

export function useCreateMemorialRecord({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<MemorialRecord>) => createMemorialRecordService(data),
    onSuccess: () => {
      invalidateMemorialRecords(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecords.createSuccess"));
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : t("memorialRecords.actionError")),
  });

  const doCreate = useDebouncedCallback(mutate);
  return { doCreate, isSaving: isPending };
}

export function useUpdateMemorialRecord({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MemorialRecord> }) =>
      updateMemorialRecordService(id, data),
    onSuccess: () => {
      invalidateMemorialRecords(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecords.updateSuccess"));
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : t("memorialRecords.actionError")),
  });

  const doUpdate = useDebouncedCallback(mutate);
  return { doUpdate, isSaving: isPending };
}

export function useDeleteMemorialRecord({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteMemorialRecordService(id),
    onSuccess: () => {
      invalidateMemorialRecords(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecords.deleteSuccess"));
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : t("memorialRecords.actionError")),
  });

  const doDelete = useDebouncedCallback(mutate);
  return { doDelete, isDeleting: isPending };
}

export function useBulkDeleteMemorialRecords({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => bulkDeleteMemorialRecordsService(ids),
    onSuccess: () => {
      invalidateMemorialRecords(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecords.deleteSelectedSuccess"));
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : t("memorialRecords.actionError")),
  });

  const doBulkDelete = useDebouncedCallback(mutate, 1000);
  return { doBulkDelete, isBulkDeleting: isPending };
}

export function useBulkImportMemorialRecords({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (records: Partial<MemorialRecord>[]) => {
      setProgress({ done: 0, total: records.length });
      return bulkCreateMemorialRecordsService(records, (done, total) =>
        setProgress({ done, total })
      );
    },
    onSuccess: () => {
      invalidateMemorialRecords(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecords.importSuccess"));
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : t("memorialRecords.actionError")),
    onSettled: () => setProgress(null),
  });

  const doImport = useDebouncedCallback(mutate, 1000);
  return { doImport, isImporting: isPending, importProgress: progress };
}

export function useWipeAllMemorialRecords({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAllMemorialRecordsService(),
    onSuccess: () => {
      invalidateMemorialRecords(queryClient);
      onSuccess?.();
      toast.success(t("memorialRecords.wipeSuccess"));
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : t("memorialRecords.actionError")),
  });

  const doWipe = useDebouncedCallback(mutate, 1000);
  return { doWipe, isWiping: isPending };
}
