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
import { useBulkRestoreMemorialRecords } from "./useMemorialRecordsArchive";

interface RestoreSelectedMemorialRecordsDialogProps {
  selectedIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RestoreSelectedMemorialRecordsDialog({
  selectedIds,
  open,
  onOpenChange,
}: RestoreSelectedMemorialRecordsDialogProps) {
  const { t } = useTranslation();
  const { doBulkRestore, isBulkRestoring } = useBulkRestoreMemorialRecords({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={(next) => !isBulkRestoring && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isBulkRestoring}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecordsArchive.restoreSelectedTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecordsArchive.restoreSelectedConfirm", { count: selectedIds.length })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isBulkRestoring}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isBulkRestoring}
            className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            onClick={() => doBulkRestore(selectedIds)}
          >
            {isBulkRestoring && <Loader2 className="size-4 animate-spin" />}
            {isBulkRestoring
              ? t("memorialRecordsArchive.restoring")
              : t("memorialRecordsArchive.restore")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
