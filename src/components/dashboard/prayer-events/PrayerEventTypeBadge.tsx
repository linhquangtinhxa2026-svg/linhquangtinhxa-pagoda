import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCeremonyTypesList } from "@/hooks/dashboard/useCeremonyTypes";
import { getCeremonyTypeColorOption } from "@/lib/ceremonyTypeColors";
import { UNKNOWN_CEREMONY_TYPE_VALUE } from "@/lib/ceremonyType";
import type { PrayerEventType } from "@/types/prayerEvent";

const NEUTRAL_BADGE_CLASS = "bg-gray-100 text-gray-500 border-gray-200";

interface PrayerEventTypeBadgeProps {
  type: PrayerEventType;
  className?: string;
}

export function PrayerEventTypeBadge({ type, className }: PrayerEventTypeBadgeProps) {
  const { t } = useTranslation();
  const { data: ceremonyTypes = [] } = useCeremonyTypesList();

  if (!type) {
    return (
      <Badge variant="outline" className={cn(NEUTRAL_BADGE_CLASS, "font-semibold", className)}>
        {t("prayerEvents.noType")}
      </Badge>
    );
  }

  if (type === UNKNOWN_CEREMONY_TYPE_VALUE) {
    return (
      <Badge variant="outline" className={cn(NEUTRAL_BADGE_CLASS, "font-semibold", className)}>
        {t("prayerEvents.typeUnknown")}
      </Badge>
    );
  }

  const ceremonyType = ceremonyTypes.find((item) => item.value === type);
  const colorOption = getCeremonyTypeColorOption(ceremonyType?.colorKey ?? "emerald");

  return (
    <Badge variant="outline" className={cn(colorOption.badgeClass, "font-semibold", className)}>
      {ceremonyType?.label ?? type}
    </Badge>
  );
}
