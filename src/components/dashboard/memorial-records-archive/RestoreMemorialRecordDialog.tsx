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
import type { MemorialRecord } from "@/types/memorialRecord";
import { useRestoreMemorialRecord } from "./useMemorialRecordsArchive";

interface RestoreMemorialRecordDialogProps {
  memorialRecord: MemorialRecord | null;
  onOpenChange: (open: boolean) => void;
}

export function RestoreMemorialRecordDialog({
  memorialRecord,
  onOpenChange,
}: RestoreMemorialRecordDialogProps) {
  const { t } = useTranslation();
  const { doRestore, isRestoring } = useRestoreMemorialRecord({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={!!memorialRecord} onOpenChange={(next) => !isRestoring && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isRestoring}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecordsArchive.restoreTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecordsArchive.restoreConfirm", { name: memorialRecord?.full_name ?? "" })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isRestoring}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isRestoring}
            className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            onClick={() => memorialRecord && doRestore(memorialRecord.id)}
          >
            {isRestoring && <Loader2 className="size-4 animate-spin" />}
            {isRestoring
              ? t("memorialRecordsArchive.restoring")
              : t("memorialRecordsArchive.restore")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
