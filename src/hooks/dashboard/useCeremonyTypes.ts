import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ClientResponseError } from "pocketbase";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import type { CeremonyType } from "@/types/ceremonyType";
import {
  createCeremonyTypeService,
  deleteCeremonyTypeService,
  getCeremonyTypesListService,
  updateCeremonyTypeService,
} from "@/services/ceremonyTypes";

interface MutationOptions {
  onSuccess?: () => void;
}

const CEREMONY_TYPES_QUERY_KEY = ["ceremony-types"];

export function useCeremonyTypesList() {
  return useQuery({
    queryKey: CEREMONY_TYPES_QUERY_KEY,
    queryFn: getCeremonyTypesListService,
  });
}

function isDuplicateValueError(error: unknown): boolean {
  return (
    error instanceof ClientResponseError && error.response?.data?.value !== undefined
  );
}

function useCeremonyTypeErrorToast() {
  const { t } = useTranslation();
  return (error: unknown) => {
    toast.error(
      isDuplicateValueError(error)
        ? t("ceremonyTypes.duplicateError")
        : error instanceof Error
          ? error.message
          : t("ceremonyTypes.actionError")
    );
  };
}

export function useCreateCeremonyType({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useCeremonyTypeErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<CeremonyType>) => createCeremonyTypeService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CEREMONY_TYPES_QUERY_KEY });
      onSuccess?.();
      toast.success(t("ceremonyTypes.createSuccess"));
    },
    onError: showError,
  });

  const doCreate = useDebouncedCallback(mutate);
  return { doCreate, isSaving: isPending };
}

export function useUpdateCeremonyType({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useCeremonyTypeErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CeremonyType> }) =>
      updateCeremonyTypeService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CEREMONY_TYPES_QUERY_KEY });
      onSuccess?.();
      toast.success(t("ceremonyTypes.updateSuccess"));
    },
    onError: showError,
  });

  const doUpdate = useDebouncedCallback(mutate);
  return { doUpdate, isSaving: isPending };
}

export function useDeleteCeremonyType({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useCeremonyTypeErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteCeremonyTypeService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CEREMONY_TYPES_QUERY_KEY });
      onSuccess?.();
      toast.success(t("ceremonyTypes.deleteSuccess"));
    },
    onError: showError,
  });

  const doDelete = useDebouncedCallback(mutate);
  return { doDelete, isDeleting: isPending };
}
