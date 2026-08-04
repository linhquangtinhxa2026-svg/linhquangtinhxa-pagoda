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
import { useRestorePrayerEvent } from "./usePrayerEventsArchive";

interface RestorePrayerEventDialogProps {
  event: PrayerEvent | null;
  onOpenChange: (open: boolean) => void;
}

export function RestorePrayerEventDialog({ event, onOpenChange }: RestorePrayerEventDialogProps) {
  const { t } = useTranslation();
  const { doRestore, isRestoring } = useRestorePrayerEvent({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={!!event} onOpenChange={(next) => !isRestoring && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isRestoring}>
        <DialogHeader>
          <DialogTitle>{t("prayerEventsArchive.restoreTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("prayerEventsArchive.restoreConfirm", { name: event?.registrantName ?? "" })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isRestoring}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("prayerEvents.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isRestoring}
            className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            onClick={() => event && doRestore(event.id)}
          >
            {isRestoring && <Loader2 className="size-4 animate-spin" />}
            {isRestoring ? t("prayerEventsArchive.restoring") : t("prayerEventsArchive.restore")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
