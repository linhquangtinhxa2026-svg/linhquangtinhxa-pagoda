import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PrayerEventsImportProgressDialogProps {
  progress: { done: number; total: number } | null;
}

export function PrayerEventsImportProgressDialog({
  progress,
}: PrayerEventsImportProgressDialogProps) {
  const { t } = useTranslation();

  const percent =
    progress && progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <Dialog open={!!progress} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("prayerEvents.importingTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("prayerEvents.importingProgress", {
            done: progress?.done ?? 0,
            total: progress?.total ?? 0,
          })}
        </p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full bg-[#8B6A2E] transition-[width] duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">{t("prayerEvents.importingHint")}</p>
      </DialogContent>
    </Dialog>
  );
}
