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
import { useBulkDeleteMemorialRecords } from "./useMemorialRecords";

interface DeleteSelectedMemorialRecordsDialogProps {
  selectedIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

export function DeleteSelectedMemorialRecordsDialog({
  selectedIds,
  open,
  onOpenChange,
  onDeleted,
}: DeleteSelectedMemorialRecordsDialogProps) {
  const { t } = useTranslation();
  const { doBulkDelete, isBulkDeleting } = useBulkDeleteMemorialRecords({
    onSuccess: () => {
      onOpenChange(false);
      onDeleted();
    },
  });

  return (
    <Dialog open={open} onOpenChange={(next) => !isBulkDeleting && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isBulkDeleting}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecords.deleteSelectedTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecords.deleteSelectedConfirm", { count: selectedIds.length })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isBulkDeleting}
            className="border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isBulkDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => doBulkDelete(selectedIds)}
          >
            {isBulkDeleting && <Loader2 className="size-4 animate-spin" />}
            {isBulkDeleting ? t("memorialRecords.deleting") : t("memorialRecords.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
