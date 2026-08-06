import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { NewsCategory } from "@/types/newsCategory";
import { useDeleteNewsCategory } from "@/hooks/dashboard/useNewsCategories";

interface DeleteNewsCategoryDialogProps {
  category: NewsCategory | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteNewsCategoryDialog({
  category,
  onOpenChange,
}: DeleteNewsCategoryDialogProps) {
  const { t } = useTranslation();
  const { doDelete, isDeleting } = useDeleteNewsCategory({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={!!category} onOpenChange={(next) => !isDeleting && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isDeleting}>
        <DialogHeader>
          <DialogTitle>{t("newsCategories.deleteTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("newsCategories.deleteConfirm", { name: category?.label ?? "" })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("newsCategories.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => category && doDelete(category.id)}
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            {isDeleting ? t("newsCategories.deleting") : t("newsCategories.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
