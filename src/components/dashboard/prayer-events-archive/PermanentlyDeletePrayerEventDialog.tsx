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
import type { PrayerEvent } from "@/types/prayerEvent";
import { usePermanentlyDeletePrayerEvent } from "./usePrayerEventsArchive";

interface PermanentlyDeletePrayerEventDialogProps {
  event: PrayerEvent | null;
  onOpenChange: (open: boolean) => void;
}

export function PermanentlyDeletePrayerEventDialog({
  event,
  onOpenChange,
}: PermanentlyDeletePrayerEventDialogProps) {
  const { t } = useTranslation();
  const { doPermanentlyDelete, isPermanentlyDeleting } = usePermanentlyDeletePrayerEvent({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={!!event} onOpenChange={(next) => !isPermanentlyDeleting && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isPermanentlyDeleting}>
        <DialogHeader>
          <DialogTitle>{t("prayerEventsArchive.deletePermanentlyTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("prayerEventsArchive.deletePermanentlyConfirm", {
            name: event?.registrantName ?? "",
          })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPermanentlyDeleting}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("prayerEvents.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isPermanentlyDeleting}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => event && doPermanentlyDelete(event.id)}
          >
            {isPermanentlyDeleting && <Loader2 className="size-4 animate-spin" />}
            {isPermanentlyDeleting
              ? t("prayerEventsArchive.deleting")
              : t("prayerEventsArchive.deletePermanently")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
