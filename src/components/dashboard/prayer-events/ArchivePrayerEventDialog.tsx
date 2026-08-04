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
import { useArchivePrayerEvent } from "./usePrayerEvents";

interface ArchivePrayerEventDialogProps {
  event: PrayerEvent | null;
  onOpenChange: (open: boolean) => void;
  onArchived?: (id: string) => void;
}

export function ArchivePrayerEventDialog({
  event,
  onOpenChange,
  onArchived,
}: ArchivePrayerEventDialogProps) {
  const { t } = useTranslation();
  const { doArchive, isArchiving } = useArchivePrayerEvent({
    onSuccess: () => {
      if (event) onArchived?.(event.id);
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={!!event} onOpenChange={(next) => !isArchiving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isArchiving}>
        <DialogHeader>
          <DialogTitle>{t("prayerEvents.archiveTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("prayerEvents.archiveConfirm", { name: event?.registrantName ?? "" })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isArchiving}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("prayerEvents.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isArchiving}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => event && doArchive(event.id)}
          >
            {isArchiving && <Loader2 className="size-4 animate-spin" />}
            {isArchiving ? t("prayerEvents.archiving") : t("prayerEvents.archive")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
