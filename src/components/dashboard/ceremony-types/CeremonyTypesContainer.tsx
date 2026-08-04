"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import type { CeremonyType } from "@/types/ceremonyType";
import { useCeremonyTypesList } from "@/hooks/dashboard/useCeremonyTypes";
import { CeremonyTypesTable } from "./CeremonyTypesTable";
import { CeremonyTypeModal, type CeremonyTypeModalState } from "./CeremonyTypeModal";
import { DeleteCeremonyTypeDialog } from "./DeleteCeremonyTypeDialog";

export function CeremonyTypesContainer() {
  const { t } = useTranslation();
  const { data: types, isLoading } = useCeremonyTypesList();
  const [modalState, setModalState] = useState<CeremonyTypeModalState | null>(null);
  const [deletingType, setDeletingType] = useState<CeremonyType | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <TypographyH2 className="text-3xl font-extrabold tracking-tight border-none pb-0 text-foreground">
            {t("ceremonyTypes.pageTitle")}
          </TypographyH2>
          <TypographyMuted className="text-base font-medium">
            {t("ceremonyTypes.pageSubtitle")}
          </TypographyMuted>
        </div>
        <Button
          type="button"
          className="bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/20 h-12 px-6 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2"
          onClick={() => setModalState({ mode: "add" })}
        >
          <Plus className="size-5" />
          {t("ceremonyTypes.addNew")}
        </Button>
      </div>

      <CeremonyTypesTable
        items={types ?? []}
        isLoading={isLoading}
        onEdit={(type) => setModalState({ mode: "edit", type })}
        onDelete={setDeletingType}
      />

      <CeremonyTypeModal state={modalState} onClose={() => setModalState(null)} />
      <DeleteCeremonyTypeDialog
        type={deletingType}
        onOpenChange={(open) => !open && setDeletingType(null)}
      />
    </div>
  );
}
