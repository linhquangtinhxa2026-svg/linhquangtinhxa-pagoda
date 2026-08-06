"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import type { NewsCategory } from "@/types/newsCategory";
import { useNewsCategoriesList } from "@/hooks/dashboard/useNewsCategories";
import { NewsCategoriesTable } from "./NewsCategoriesTable";
import { NewsCategoryModal, type NewsCategoryModalState } from "./NewsCategoryModal";
import { DeleteNewsCategoryDialog } from "./DeleteNewsCategoryDialog";

export function NewsCategoriesContainer() {
  const { t } = useTranslation();
  const { data: categories, isLoading } = useNewsCategoriesList();
  const [modalState, setModalState] = useState<NewsCategoryModalState | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<NewsCategory | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <TypographyH2 className="text-3xl font-extrabold tracking-tight border-none pb-0 text-foreground">
            {t("newsCategories.pageTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("newsCategories.pageSubtitle")}
          </TypographyMuted>
        </div>
        <Button
          type="button"
          className="bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
          onClick={() => setModalState({ mode: "add" })}
        >
          <Plus className="size-5" />
          {t("newsCategories.addNew")}
        </Button>
      </div>

      <NewsCategoriesTable
        items={categories ?? []}
        isLoading={isLoading}
        onEdit={(category) => setModalState({ mode: "edit", category })}
        onDelete={setDeletingCategory}
      />

      <NewsCategoryModal state={modalState} onClose={() => setModalState(null)} />
      <DeleteNewsCategoryDialog
        category={deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
      />
    </div>
  );
}
