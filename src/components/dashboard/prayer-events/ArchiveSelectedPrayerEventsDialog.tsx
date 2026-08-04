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
import { useBulkArchivePrayerEvents } from "./usePrayerEvents";

interface ArchiveSelectedPrayerEventsDialogProps {
  selectedIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArchived?: () => void;
}

export function ArchiveSelectedPrayerEventsDialog({
  selectedIds,
  open,
  onOpenChange,
  onArchived,
}: ArchiveSelectedPrayerEventsDialogProps) {
  const { t } = useTranslation();
  const { doBulkArchive, isBulkArchiving } = useBulkArchivePrayerEvents({
    onSuccess: () => {
      onArchived?.();
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={(next) => !isBulkArchiving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isBulkArchiving}>
        <DialogHeader>
          <DialogTitle>{t("prayerEvents.archiveSelectedTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("prayerEvents.archiveSelectedConfirm", { count: selectedIds.length })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isBulkArchiving}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("prayerEvents.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isBulkArchiving}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => doBulkArchive(selectedIds)}
          >
            {isBulkArchiving && <Loader2 className="size-4 animate-spin" />}
            {isBulkArchiving ? t("prayerEvents.archiving") : t("prayerEvents.archive")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
