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
import type { CeremonyType } from "@/types/ceremonyType";
import { useDeleteCeremonyType } from "@/hooks/dashboard/useCeremonyTypes";

interface DeleteCeremonyTypeDialogProps {
  type: CeremonyType | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCeremonyTypeDialog({ type, onOpenChange }: DeleteCeremonyTypeDialogProps) {
  const { t } = useTranslation();
  const { doDelete, isDeleting } = useDeleteCeremonyType({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={!!type} onOpenChange={(next) => !isDeleting && onOpenChange(next)}>
      <DialogContent className="sm:max-w-sm" showCloseButton={!isDeleting}>
        <DialogHeader>
          <DialogTitle>{t("ceremonyTypes.deleteTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("ceremonyTypes.deleteConfirm", { name: type?.label ?? "" })}
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
            onClick={() => onOpenChange(false)}
          >
            {t("ceremonyTypes.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            className="h-10 px-6 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-md shadow-destructive/10 active:scale-95 transition-all"
            onClick={() => type && doDelete(type.id)}
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            {isDeleting ? t("ceremonyTypes.deleting") : t("ceremonyTypes.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
