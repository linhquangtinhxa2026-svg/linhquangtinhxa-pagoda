import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useWipeAllMemorialRecords } from "./useMemorialRecords";

const CONFIRM_WORD = "XOA";

interface WipeAllMemorialRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WipeAllMemorialRecordsDialog({
  open,
  onOpenChange,
}: WipeAllMemorialRecordsDialogProps) {
  const { t } = useTranslation();
  const [confirmText, setConfirmText] = useState("");

  const { doWipe, isWiping } = useWipeAllMemorialRecords({
    onSuccess: () => {
      setConfirmText("");
      onOpenChange(false);
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (isWiping) return;
        if (!next) setConfirmText("");
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-sm" showCloseButton={!isWiping}>
        <DialogHeader>
          <DialogTitle>{t("memorialRecords.wipeTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          {t("memorialRecords.wipeWarning", { word: CONFIRM_WORD })}
        </p>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={CONFIRM_WORD}
          disabled={isWiping}
        />
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isWiping}
            className="border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            onClick={() => onOpenChange(false)}
          >
            {t("memorialRecords.cancel")}
          </Button>
          <Button
            type="button"
            disabled={confirmText !== CONFIRM_WORD || isWiping}
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => doWipe()}
          >
            {isWiping && <Loader2 className="size-4 animate-spin" />}
            {isWiping ? t("memorialRecords.wiping") : t("memorialRecords.wipeConfirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
