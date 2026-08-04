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
import { prayerEventSchema, type PrayerEventFormData } from "@/lib/schemas/prayerEvent";
import type { PrayerEvent } from "@/types/prayerEvent";
import { useCreatePrayerEvent, useUpdatePrayerEvent } from "./usePrayerEvents";
import { PrayerEventForm } from "./PrayerEventForm";

export type PrayerEventModalState =
  | { mode: "add"; initialDate?: string }
  | { mode: "edit"; event: PrayerEvent };

interface PrayerEventModalProps {
  state: PrayerEventModalState | null;
  onClose: () => void;
}

const baseDefaultValues: PrayerEventFormData = {
  type: "",
  registrantName: "",
  subjectName: "",
  phone: "",
  eventDate: "",
  note: "",
};

export function PrayerEventModal({ state, onClose }: PrayerEventModalProps) {
  const { t } = useTranslation();
  const { doCreate, isSaving: isCreating } = useCreatePrayerEvent({ onSuccess: onClose });
  const { doUpdate, isSaving: isUpdating } = useUpdatePrayerEvent({ onSuccess: onClose });
  const isSaving = isCreating || isUpdating;

  const { control, handleSubmit, reset } = useForm<PrayerEventFormData>({
    resolver: yupResolver(prayerEventSchema),
    defaultValues: baseDefaultValues,
  });

  useEffect(() => {
    if (!state) return;
    if (state.mode === "edit") {
      reset({
        type: state.event.type,
        registrantName: state.event.registrantName,
        subjectName: state.event.subjectName,
        phone: state.event.phone,
        eventDate: state.event.eventDate,
        note: state.event.note,
      });
    } else {
      reset({ ...baseDefaultValues, eventDate: state.initialDate ?? "" });
    }
  }, [state, reset]);

  const onSubmit = handleSubmit((data) => {
    if (!state) return;
    if (state.mode === "edit") {
      doUpdate({ id: state.event.id, data });
    } else {
      doCreate(data);
    }
  });

  return (
    <Dialog open={!!state} onOpenChange={(next) => !isSaving && !next && onClose()}>
      <DialogContent className="sm:max-w-lg" showCloseButton={!isSaving}>
        <DialogHeader>
          <DialogTitle>
            {state?.mode === "edit" ? t("prayerEvents.editTitle") : t("prayerEvents.addTitle")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <PrayerEventForm control={control} />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
              onClick={onClose}
            >
              {t("prayerEvents.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            >
              {t("prayerEvents.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
