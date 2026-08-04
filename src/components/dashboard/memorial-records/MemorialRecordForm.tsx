import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AdminInputField } from "@/components/form/AdminInputField";
import { AdminTextareaField } from "@/components/form/AdminTextareaField";
import type { MemorialRecordFormData } from "@/lib/schemas/memorialRecord";

interface MemorialRecordFormProps {
  control: Control<MemorialRecordFormData>;
}

export function MemorialRecordForm({ control }: MemorialRecordFormProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <AdminInputField
        control={control}
        name="full_name"
        label={t("memorialRecords.fullNameLabel")}
        placeholder={t("memorialRecords.fullNamePlaceholder")}
      />
      <div className="grid grid-cols-2 gap-4">
        <AdminInputField
          control={control}
          name="age_at_death"
          type="number"
          label={t("memorialRecords.ageLabel")}
          placeholder={t("memorialRecords.agePlaceholder")}
        />
        <AdminInputField
          control={control}
          name="phone"
          label={t("memorialRecords.phoneLabel")}
          placeholder={t("memorialRecords.phonePlaceholder")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AdminInputField
          control={control}
          name="storage_location"
          label={t("memorialRecords.storageLocationLabel")}
          placeholder={t("memorialRecords.storageLocationPlaceholder")}
        />
        <AdminInputField
          control={control}
          name="display_location"
          label={t("memorialRecords.displayLocationLabel")}
          placeholder={t("memorialRecords.displayLocationPlaceholder")}
        />
      </div>
      <AdminTextareaField
        control={control}
        name="private_info"
        label={t("memorialRecords.notesLabel")}
        placeholder={t("memorialRecords.notesPlaceholder")}
      />
    </div>
  );
}
