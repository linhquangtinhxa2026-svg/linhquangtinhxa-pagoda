"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { MediaUploadField } from "@/components/form/MediaUploadField";
import { RichTextField } from "@/components/form/RichTextField";
import { ROUTES } from "@/constants/routes";
import { newsSchema, type NewsFormData } from "@/lib/schemas/news";
import {
  useCreateNews,
  useNewsById,
  useUpdateNews,
  useUploadInlineMedia,
} from "./useNews";
import { NewsMetaFields } from "./NewsMetaFields";

interface NewsFormPageProps {
  newsId?: string;
}

const defaultValues: NewsFormData = {
  title: "",
  slug: "",
  description: "",
  content: "",
  category: "",
  isPublished: false,
  coverImage: "",
  gallery: [],
};

export function NewsFormPage({ newsId }: NewsFormPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const isEditMode = !!newsId;

  const { data: existingNews, isLoading: isLoadingNews } = useNewsById(
    newsId ?? "",
  );

  const goBack = () => router.push(ROUTES.QUAN_LY_TIN_TUC);
  const { doCreate, isSaving: isCreating } = useCreateNews({
    onSuccess: goBack,
  });
  const { doUpdate, isSaving: isUpdating } = useUpdateNews({
    onSuccess: goBack,
  });
  const isSaving = isCreating || isUpdating;
  const [pendingAction, setPendingAction] = useState<
    "draft" | "publish" | null
  >(null);
  const { uploadInlineMedia } = useUploadInlineMedia();

  const { control, handleSubmit, reset, setValue } = useForm<NewsFormData>({
    resolver: yupResolver(newsSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!existingNews) return;
    reset({
      title: existingNews.title,
      slug: existingNews.slug,
      description: existingNews.description,
      content: existingNews.content,
      category: existingNews.category,
      isPublished: existingNews.isPublished,
      coverImage: existingNews.coverImageUrl,
      gallery: existingNews.gallery.map(item => item.url),
    });
  }, [existingNews, reset]);

  const submitNews = (data: NewsFormData, isPublished: boolean) => {
    const payload = { ...data, isPublished };
    if (isEditMode && newsId) {
      doUpdate({
        id: newsId,
        data: payload,
        currentPublishedAt: existingNews?.publishedAt ?? null,
      });
    } else {
      doCreate(payload);
    }
  };

  const onSaveDraft = handleSubmit(data => {
    setPendingAction("draft");
    submitNews(data, false);
  });

  const onSaveAndPublish = handleSubmit(data => {
    setPendingAction("publish");
    submitNews(data, true);
  });

  if (isEditMode && isLoadingNews) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="size-8 animate-spin text-muted-foreground/40" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="space-y-3">
        <Link
          href={ROUTES.QUAN_LY_TIN_TUC}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand-gold transition-colors"
        >
          <ArrowLeft className="size-4" />
          {t("news.backToList")}
        </Link>
        <div className="space-y-1.5">
          <TypographyH2 className="text-3xl font-extrabold tracking-tight border-none pb-0 text-foreground">
            {isEditMode ? t("news.editTitle") : t("news.addTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("news.formSubtitle")}
          </TypographyMuted>
        </div>
      </div>

      <form onSubmit={onSaveAndPublish} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <MediaUploadField
            control={control}
            name="coverImage"
            label={t("news.coverImageLabel")}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <NewsMetaFields
            control={control}
            setValue={setValue}
            isEditMode={isEditMode}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <RichTextField
            control={control}
            name="content"
            label={t("news.contentLabel")}
            onUploadMedia={uploadInlineMedia}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <MediaUploadField
            control={control}
            name="gallery"
            label={t("news.galleryLabel")}
            multiple
          />
        </div>

        <div className="flex items-center md:justify-end gap-3 flex-wrap md:flex-nowrap justify-start">
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            className="h-11 px-5 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={goBack}
          >
            {t("news.cancel")}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            className="h-11 px-6 rounded-xl border-border bg-white text-foreground/80 font-semibold hover:bg-muted/50 transition-all active:scale-95 flex items-center gap-2"
            onClick={onSaveDraft}
          >
            {isSaving && pendingAction === "draft" && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {t("news.saveDraft")}
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="h-11 px-8 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/10 active:scale-95 transition-all flex items-center gap-2"
          >
            {isSaving && pendingAction === "publish" && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {t("news.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
