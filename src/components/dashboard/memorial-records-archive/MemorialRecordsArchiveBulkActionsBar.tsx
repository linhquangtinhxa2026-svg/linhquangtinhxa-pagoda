"use client";

import { useTranslation } from "react-i18next";
import { RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MemorialRecordsArchiveBulkActionsBarProps {
  selectedCount: number;
  onRestoreSelected: () => void;
  onDeleteSelectedPermanently: () => void;
}

export function MemorialRecordsArchiveBulkActionsBar({
  selectedCount,
  onRestoreSelected,
  onDeleteSelectedPermanently,
}: MemorialRecordsArchiveBulkActionsBarProps) {
  const { t } = useTranslation();

  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        className="bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
        onClick={onRestoreSelected}
      >
        <RotateCcw className="size-5" />
        {t("memorialRecordsArchive.restoreSelected", { count: selectedCount })}
      </Button>
      <Button
        type="button"
        className="bg-destructive hover:bg-destructive/90 text-white font-bold shadow-md shadow-destructive/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
        onClick={onDeleteSelectedPermanently}
      >
        <Trash2 className="size-5" />
        {t("memorialRecordsArchive.deleteSelectedPermanently", { count: selectedCount })}
      </Button>
    </div>
  );
}
