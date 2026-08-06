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
import { useArchiveMemorialRecord } from "./useMemorialRecords";

interface ArchiveMemorialRecordDialogProps {
  memorialRecord: MemorialRecord | null;
  onOpenChange: (open: boolean) => void;
}

export function ArchiveMemorialRecordDialog({
  memorialRecord,
  onOpenChange,
}: ArchiveMemorialRecordDialogProps) {
  const { t } = useTranslation();
  const { doArchive, isArchiving } = useArchiveMemorialRecord({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={!!memorialRecord} onOpenChange={(next) => !isArchiving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isArchiving}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecords.archiveTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecords.archiveConfirm", { name: memorialRecord?.full_name ?? "" })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isArchiving}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isArchiving}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => memorialRecord && doArchive(memorialRecord.id)}
          >
            {isArchiving && <Loader2 className="size-4 animate-spin" />}
            {isArchiving ? t("memorialRecords.archiving") : t("memorialRecords.archive")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
