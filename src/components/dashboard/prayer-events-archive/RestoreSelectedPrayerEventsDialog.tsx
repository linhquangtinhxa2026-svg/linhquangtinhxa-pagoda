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
import { useBulkRestorePrayerEvents } from "./usePrayerEventsArchive";

interface RestoreSelectedPrayerEventsDialogProps {
  selectedIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RestoreSelectedPrayerEventsDialog({
  selectedIds,
  open,
  onOpenChange,
}: RestoreSelectedPrayerEventsDialogProps) {
  const { t } = useTranslation();
  const { doBulkRestore, isBulkRestoring } = useBulkRestorePrayerEvents({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={(next) => !isBulkRestoring && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isBulkRestoring}>
        <DialogHeader>
          <DialogTitle>{t("prayerEventsArchive.restoreSelectedTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("prayerEventsArchive.restoreSelectedConfirm", { count: selectedIds.length })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isBulkRestoring}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("prayerEvents.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isBulkRestoring}
            className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            onClick={() => doBulkRestore(selectedIds)}
          >
            {isBulkRestoring && <Loader2 className="size-4 animate-spin" />}
            {isBulkRestoring ? t("prayerEventsArchive.restoring") : t("prayerEventsArchive.restore")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
