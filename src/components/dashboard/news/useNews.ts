import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { NEWS_QUERY_KEY } from "@/constants/queryKeys";
import type { News, GalleryItem } from "@/types/news";
import type { NewsFormData } from "@/lib/schemas/news";
import { uploadMediaService, getMediaFileUrl } from "@/services/media";
import {
  createNewsService,
  deleteNewsService,
  getNewsByIdService,
  getNewsListService,
  updateNewsService,
} from "@/services/news";

const NEWS_MEDIA_FOLDER = "tin-tuc";

interface MutationOptions {
  onSuccess?: () => void;
}

export function useNewsList() {
  return useQuery({
    queryKey: NEWS_QUERY_KEY,
    queryFn: getNewsListService,
  });
}

export function useNewsById(id: string) {
  return useQuery({
    queryKey: [...NEWS_QUERY_KEY, id],
    queryFn: () => getNewsByIdService(id),
    enabled: !!id,
  });
}

function useNewsErrorToast() {
  const { t } = useTranslation();
  return (error: unknown) =>
    toast.error(error instanceof Error ? error.message : t("news.actionError"));
}

async function resolveMediaUrl(item: File | string): Promise<string> {
  if (typeof item === "string") return item;
  const media = await uploadMediaService(item, NEWS_MEDIA_FOLDER);
  return getMediaFileUrl(media);
}

function resolveMediaType(item: File | string): "image" | "video" {
  if (item instanceof File) return item.type.startsWith("video/") ? "video" : "image";
  return /\.(mp4|webm|mov)$/i.test(item) ? "video" : "image";
}

async function resolveGallery(gallery: (File | string)[]): Promise<GalleryItem[]> {
  return Promise.all(
    gallery.map(async (item) => ({
      url: await resolveMediaUrl(item),
      type: resolveMediaType(item),
    }))
  );
}

async function buildNewsPayload(
  data: NewsFormData,
  currentPublishedAt: string | null
): Promise<Partial<News>> {
  const [coverImageUrl, gallery] = await Promise.all([
    resolveMediaUrl(data.coverImage),
    resolveGallery(data.gallery ?? []),
  ]);

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: data.content,
    category: data.category,
    isPublished: data.isPublished,
    coverImageUrl,
    gallery,
    publishedAt: data.isPublished ? (currentPublishedAt ?? new Date().toISOString()) : null,
  };
}

export function useCreateNews({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useNewsErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: NewsFormData) => buildNewsPayload(data, null).then(createNewsService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_QUERY_KEY });
      onSuccess?.();
      toast.success(t("news.createSuccess"));
    },
    onError: showError,
  });

  const doCreate = useDebouncedCallback(mutate);
  return { doCreate, isSaving: isPending };
}

export function useUpdateNews({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useNewsErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      data,
      currentPublishedAt,
    }: {
      id: string;
      data: NewsFormData;
      currentPublishedAt: string | null;
    }) => buildNewsPayload(data, currentPublishedAt).then((payload) => updateNewsService(id, payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_QUERY_KEY });
      onSuccess?.();
      toast.success(t("news.updateSuccess"));
    },
    onError: showError,
  });

  const doUpdate = useDebouncedCallback(mutate);
  return { doUpdate, isSaving: isPending };
}

export function useUploadInlineMedia() {
  const { mutateAsync } = useMutation({
    mutationFn: async (file: File) => {
      const media = await uploadMediaService(file, NEWS_MEDIA_FOLDER);
      return { url: getMediaFileUrl(media), type: resolveMediaType(file) };
    },
  });

  return { uploadInlineMedia: mutateAsync };
}

export function useDeleteNews({ onSuccess }: MutationOptions = {}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const showError = useNewsErrorToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNewsService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_QUERY_KEY });
      onSuccess?.();
      toast.success(t("news.deleteSuccess"));
    },
    onError: showError,
  });

  const doDelete = useDebouncedCallback(mutate);
  return { doDelete, isDeleting: isPending };
}
