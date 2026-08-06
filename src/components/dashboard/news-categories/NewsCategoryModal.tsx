import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { newsCategorySchema, type NewsCategoryFormData } from "@/lib/schemas/newsCategory";
import type { NewsCategory } from "@/types/newsCategory";
import {
  useCreateNewsCategory,
  useUpdateNewsCategory,
} from "@/hooks/dashboard/useNewsCategories";
import { NewsCategoryForm } from "./NewsCategoryForm";

export type NewsCategoryModalState =
  | { mode: "add" }
  | { mode: "edit"; category: NewsCategory };

interface NewsCategoryModalProps {
  state: NewsCategoryModalState | null;
  onClose: () => void;
}

const baseDefaultValues: NewsCategoryFormData = {
  label: "",
  backgroundColor: "#8b3a2e",
  textColor: "#ffffff",
  order: 1,
};

export function NewsCategoryModal({ state, onClose }: NewsCategoryModalProps) {
  const { t } = useTranslation();
  const { doCreate, isSaving: isCreating } = useCreateNewsCategory({ onSuccess: onClose });
  const { doUpdate, isSaving: isUpdating } = useUpdateNewsCategory({ onSuccess: onClose });
  const isSaving = isCreating || isUpdating;

  const { control, handleSubmit, reset } = useForm<NewsCategoryFormData>({
    resolver: yupResolver(newsCategorySchema),
    defaultValues: baseDefaultValues,
  });

  useEffect(() => {
    if (!state) return;
    if (state.mode === "edit") {
      reset({
        label: state.category.label,
        backgroundColor: state.category.backgroundColor,
        textColor: state.category.textColor,
        order: state.category.order,
      });
    } else {
      reset(baseDefaultValues);
    }
  }, [state, reset]);

  const onSubmit = handleSubmit((data) => {
    if (!state) return;
    if (state.mode === "edit") {
      doUpdate({ id: state.category.id, data });
    } else {
      doCreate(data);
    }
  });

  return (
    <Dialog open={!!state} onOpenChange={(next) => !isSaving && !next && onClose()}>
      <DialogContent className="sm:max-w-md" showCloseButton={!isSaving}>
        <DialogHeader>
          <DialogTitle>
            {state?.mode === "edit" ? t("newsCategories.editTitle") : t("newsCategories.addTitle")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <NewsCategoryForm control={control} />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
              onClick={onClose}
            >
              {t("newsCategories.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            >
              {t("newsCategories.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
