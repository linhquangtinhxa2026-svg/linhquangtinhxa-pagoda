import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ceremonyTypeSchema, type CeremonyTypeFormData } from "@/lib/schemas/ceremonyType";
import { slugifyCeremonyTypeLabel } from "@/lib/ceremonyType";
import type { CeremonyType } from "@/types/ceremonyType";
import {
  useCeremonyTypesList,
  useCreateCeremonyType,
  useUpdateCeremonyType,
} from "@/hooks/dashboard/useCeremonyTypes";
import { CeremonyTypeForm } from "./CeremonyTypeForm";

export type CeremonyTypeModalState =
  | { mode: "add" }
  | { mode: "edit"; type: CeremonyType };

interface CeremonyTypeModalProps {
  state: CeremonyTypeModalState | null;
  onClose: () => void;
}

const baseDefaultValues: CeremonyTypeFormData = {
  label: "",
  colorKey: "emerald",
  iconKey: "flame",
  iconColor: "#c4973a",
  important: false,
};

function makeUniqueValue(label: string, existing: CeremonyType[], excludeId?: string): string {
  const base = slugifyCeremonyTypeLabel(label);
  let candidate = base;
  let suffix = 2;
  while (existing.some((item) => item.value === candidate && item.id !== excludeId)) {
    candidate = `${base}_${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export function CeremonyTypeModal({ state, onClose }: CeremonyTypeModalProps) {
  const { t } = useTranslation();
  const { data: types = [] } = useCeremonyTypesList();
  const { doCreate, isSaving: isCreating } = useCreateCeremonyType({ onSuccess: onClose });
  const { doUpdate, isSaving: isUpdating } = useUpdateCeremonyType({ onSuccess: onClose });
  const isSaving = isCreating || isUpdating;

  const { control, handleSubmit, reset } = useForm<CeremonyTypeFormData>({
    resolver: yupResolver(ceremonyTypeSchema),
    defaultValues: baseDefaultValues,
  });

  useEffect(() => {
    if (!state) return;
    if (state.mode === "edit") {
      reset({
        label: state.type.label,
        colorKey: state.type.colorKey,
        iconKey: state.type.iconKey,
        iconColor: state.type.iconColor,
        important: state.type.important,
      });
    } else {
      reset(baseDefaultValues);
    }
  }, [state, reset]);

  const onSubmit = handleSubmit((data) => {
    if (!state) return;
    if (state.mode === "edit") {
      // value is immutable after creation — renaming the label must not
      // orphan prayer_events already referencing the original slug
      doUpdate({
        id: state.type.id,
        data: {
          label: data.label,
          colorKey: data.colorKey,
          iconKey: data.iconKey,
          iconColor: data.iconColor,
          important: data.important,
        },
      });
    } else {
      const value = makeUniqueValue(data.label, types);
      doCreate({
        label: data.label,
        colorKey: data.colorKey,
        iconKey: data.iconKey,
        iconColor: data.iconColor,
        important: data.important,
        value,
      });
    }
  });

  return (
    <Dialog open={!!state} onOpenChange={(next) => !isSaving && !next && onClose()}>
      <DialogContent className="sm:max-w-md" showCloseButton={!isSaving}>
        <DialogHeader>
          <DialogTitle>
            {state?.mode === "edit" ? t("ceremonyTypes.editTitle") : t("ceremonyTypes.addTitle")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <CeremonyTypeForm control={control} />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
              onClick={onClose}
            >
              {t("ceremonyTypes.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            >
              {t("ceremonyTypes.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
