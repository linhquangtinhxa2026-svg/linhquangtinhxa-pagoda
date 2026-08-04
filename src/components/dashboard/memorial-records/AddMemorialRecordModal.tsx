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
import { memorialRecordSchema, type MemorialRecordFormData } from "@/lib/schemas/memorialRecord";
import { MemorialRecordForm } from "./MemorialRecordForm";
import { useCreateMemorialRecord } from "./useMemorialRecords";

interface AddMemorialRecordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultValues: MemorialRecordFormData = {
  full_name: "",
  age_at_death: null,
  phone: "",
  storage_location: "",
  display_location: "",
  private_info: "",
};

export function AddMemorialRecordModal({ open, onOpenChange }: AddMemorialRecordModalProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<MemorialRecordFormData>({
    resolver: yupResolver(memorialRecordSchema),
    defaultValues,
  });

  const { doCreate, isSaving } = useCreateMemorialRecord({
    onSuccess: () => {
      reset(defaultValues);
      onOpenChange(false);
    },
  });

  const onSubmit = handleSubmit((data) => doCreate(data));

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) reset(defaultValues);
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("memorialRecords.addTitle")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <MemorialRecordForm control={control} />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:bg-muted/50 transition-all active:scale-95"
              onClick={() => onOpenChange(false)}
            >
              {t("memorialRecords.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-10 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-white font-bold shadow-md shadow-brand-gold/10 active:scale-95 transition-all"
            >
              {t("memorialRecords.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
