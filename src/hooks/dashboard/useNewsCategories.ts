import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import type { NewsCategory } from "@/types/newsCategory";
import {
  createNewsCategoryService,
  deleteNewsCategoryService,
  getNewsCategoriesListService,
  updateNewsCategoryService,
} from "@/services/newsCategories";

interface MutationOptions {
  onSuccess?: () => void;
}

const NEWS_CATEGORIES_QUERY_KEY = ["news-categories"];

export function useNewsCategoriesList() {
  return useQuery({
    queryKey: NEWS_CATEGORIES_QUERY_KEY,
    queryFn: getNewsCategoriesListService,
  });
}

function useNewsCategoryErrorToast() {
  const { t } = useTranslation();
  return (error: unknown) =>
    toast.error(error instanceof Error ? error.message : t("newsCategories.actionError"));
}

export function useCreateNewsCategory({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useNewsCategoryErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<NewsCategory>) => createNewsCategoryService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_CATEGORIES_QUERY_KEY });
      onSuccess?.();
      toast.success(t("newsCategories.createSuccess"));
    },
    onError: showError,
  });

  const doCreate = useDebouncedCallback(mutate);
  return { doCreate, isSaving: isPending };
}

export function useUpdateNewsCategory({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useNewsCategoryErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewsCategory> }) =>
      updateNewsCategoryService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_CATEGORIES_QUERY_KEY });
      onSuccess?.();
      toast.success(t("newsCategories.updateSuccess"));
    },
    onError: showError,
  });

  const doUpdate = useDebouncedCallback(mutate);
  return { doUpdate, isSaving: isPending };
}

export function useDeleteNewsCategory({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useNewsCategoryErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNewsCategoryService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_CATEGORIES_QUERY_KEY });
      onSuccess?.();
      toast.success(t("newsCategories.deleteSuccess"));
    },
    onError: showError,
  });

  const doDelete = useDebouncedCallback(mutate);
  return { doDelete, isDeleting: isPending };
}
