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
import { useDeleteMemorialRecord } from "./useMemorialRecords";

interface DeleteMemorialRecordDialogProps {
  memorialRecord: MemorialRecord | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteMemorialRecordDialog({
  memorialRecord,
  onOpenChange,
}: DeleteMemorialRecordDialogProps) {
  const { t } = useTranslation();
  const { doDelete, isDeleting } = useDeleteMemorialRecord({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={!!memorialRecord} onOpenChange={(next) => !isDeleting && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isDeleting}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecords.deleteTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecords.deleteConfirm", { name: memorialRecord?.full_name ?? "" })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => memorialRecord && doDelete(memorialRecord.id)}
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            {isDeleting ? t("memorialRecords.deleting") : t("memorialRecords.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
