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
import { useBulkPermanentlyDeleteMemorialRecords } from "./useMemorialRecordsArchive";

interface DeleteSelectedMemorialRecordsPermanentlyDialogProps {
  selectedIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteSelectedMemorialRecordsPermanentlyDialog({
  selectedIds,
  open,
  onOpenChange,
}: DeleteSelectedMemorialRecordsPermanentlyDialogProps) {
  const { t } = useTranslation();
  const { doBulkPermanentlyDelete, isBulkPermanentlyDeleting } =
    useBulkPermanentlyDeleteMemorialRecords({
      onSuccess: () => onOpenChange(false),
    });

  return (
    <Dialog open={open} onOpenChange={(next) => !isBulkPermanentlyDeleting && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isBulkPermanentlyDeleting}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecordsArchive.deleteSelectedPermanentlyTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecordsArchive.deleteSelectedPermanentlyConfirm", {
            count: selectedIds.length,
          })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isBulkPermanentlyDeleting}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isBulkPermanentlyDeleting}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => doBulkPermanentlyDelete(selectedIds)}
          >
            {isBulkPermanentlyDeleting && <Loader2 className="size-4 animate-spin" />}
            {isBulkPermanentlyDeleting
              ? t("memorialRecordsArchive.deleting")
              : t("memorialRecordsArchive.deletePermanently")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
