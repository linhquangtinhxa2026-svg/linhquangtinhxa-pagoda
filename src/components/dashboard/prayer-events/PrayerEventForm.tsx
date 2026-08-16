import { useWatch, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AdminInputField } from "@/components/form/AdminInputField";
import { AdminTextareaField } from "@/components/form/AdminTextareaField";
import { AdminSelectField } from "@/components/form/AdminSelectField";
import { AdminDatePickerField } from "@/components/form/AdminDatePickerField";
import { convertSolar2Lunar, formatLunarDate, formatLunarDateFull, getLunarDateFromIso } from "@/lib/lunarCalendar";
import { useCeremonyTypesList } from "@/hooks/dashboard/useCeremonyTypes";
import { capitalizeWords } from "@/lib/utils";
import type { PrayerEventFormData } from "@/lib/schemas/prayerEvent";

interface PrayerEventFormProps {
  control: Control<PrayerEventFormData>;
}

export function PrayerEventForm({ control }: PrayerEventFormProps) {
  const { t } = useTranslation();
  const { data: ceremonyTypes = [] } = useCeremonyTypesList();
  const eventDate = useWatch({ control, name: "eventDate" });
  const lunarLabel = eventDate ? formatLunarDateFull(getLunarDateFromIso(eventDate)) : null;

  return (
    <div className="space-y-4">
      <AdminSelectField
        control={control}
        name="type"
        label={t("prayerEvents.typeLabel")}
        options={[
          { value: "", label: t("prayerEvents.noType") },
          ...ceremonyTypes.map((ceremonyType) => ({
            value: ceremonyType.value,
            label: ceremonyType.label,
          })),
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminInputField
          control={control}
          name="registrantName"
          label={t("prayerEvents.registrantLabel")}
          placeholder={t("prayerEvents.registrantPlaceholder")}
          onChangeTransform={capitalizeWords}
        />
        <div className="space-y-2">
          <AdminDatePickerField
            control={control}
            name="eventDate"
            label={t("prayerEvents.dateLabel")}
            renderDaySubLabel={(day) =>
              formatLunarDate(convertSolar2Lunar(day.day, day.month, day.year))
            }
          />
          {lunarLabel && (
            <p className="text-xs font-semibold text-brand-gold pl-1">
              {t("prayerEvents.lunarDateLabel")}: {lunarLabel}
            </p>
          )}
        </div>
      </div>
      <AdminTextareaField
        control={control}
        name="note"
        label={t("prayerEvents.notesLabel")}
        placeholder={t("prayerEvents.notesPlaceholder")}
        onChangeTransform={capitalizeWords}
      />
    </div>
  );
}
