import { useWatch, type Control, type UseFormSetValue } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { AdminInputField } from "@/components/form/AdminInputField";
import { AdminTextareaField } from "@/components/form/AdminTextareaField";
import { AdminSelectField } from "@/components/form/AdminSelectField";
import { useNewsCategoriesList } from "@/hooks/dashboard/useNewsCategories";
import { slugify } from "@/lib/slugify";
import type { NewsFormData } from "@/lib/schemas/news";

interface NewsMetaFieldsProps {
  control: Control<NewsFormData>;
  setValue: UseFormSetValue<NewsFormData>;
  isEditMode?: boolean;
}

export function NewsMetaFields({ control, setValue, isEditMode }: NewsMetaFieldsProps) {
  const { t } = useTranslation();
  const { data: categories = [] } = useNewsCategoriesList();
  const title = useWatch({ control, name: "title" });
  const slug = useWatch({ control, name: "slug" });
  // Auto-derives the slug from the title as long as the slug still matches the
  // last auto-generated value — once the user edits it directly, it diverges
  // and we stop overwriting it.
  const lastAutoSlug = useRef(isEditMode ? null : slugify(""));

  useEffect(() => {
    if (lastAutoSlug.current === null || slug !== lastAutoSlug.current) return;
    const nextSlug = slugify(title ?? "");
    lastAutoSlug.current = nextSlug;
    setValue("slug", nextSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <div className="space-y-4">
      <AdminInputField control={control} name="title" label={t("news.titleLabel")} placeholder={t("news.titlePlaceholder")} />
      <AdminInputField control={control} name="slug" label={t("news.slugLabel")} placeholder={t("news.slugPlaceholder")} />
      <AdminTextareaField
        control={control}
        name="description"
        label={t("news.descriptionLabel")}
        placeholder={t("news.descriptionPlaceholder")}
        rows={3}
      />
      <AdminSelectField
        control={control}
        name="category"
        label={t("news.categoryLabel")}
        options={categories.map((category) => ({ value: category.id, label: category.label }))}
      />
    </div>
  );
}
