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
import { useBulkArchiveMemorialRecords } from "./useMemorialRecords";

interface ArchiveSelectedMemorialRecordsDialogProps {
  selectedIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArchived: () => void;
}

export function ArchiveSelectedMemorialRecordsDialog({
  selectedIds,
  open,
  onOpenChange,
  onArchived,
}: ArchiveSelectedMemorialRecordsDialogProps) {
  const { t } = useTranslation();
  const { doBulkArchive, isBulkArchiving } = useBulkArchiveMemorialRecords({
    onSuccess: () => {
      onOpenChange(false);
      onArchived();
    },
  });

  return (
    <Dialog open={open} onOpenChange={(next) => !isBulkArchiving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isBulkArchiving}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecords.archiveSelectedTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecords.archiveSelectedConfirm", { count: selectedIds.length })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isBulkArchiving}
            className="border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isBulkArchiving}
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => doBulkArchive(selectedIds)}
          >
            {isBulkArchiving && <Loader2 className="size-4 animate-spin" />}
            {isBulkArchiving ? t("memorialRecords.archiving") : t("memorialRecords.archive")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
