import { Flame, Flower2, Heart, Sun, Moon, Star, BookOpen, Users, HandHeart, Bell, type LucideIcon } from "lucide-react";

import type { CeremonyTypeIconKey } from "@/types/ceremonyType";

interface CeremonyTypeIconOption {
  key: CeremonyTypeIconKey;
  icon: LucideIcon;
}

export const CEREMONY_TYPE_ICON_OPTIONS: CeremonyTypeIconOption[] = [
  { key: "flame", icon: Flame },
  { key: "flower", icon: Flower2 },
  { key: "heart", icon: Heart },
  { key: "sun", icon: Sun },
  { key: "moon", icon: Moon },
  { key: "star", icon: Star },
  { key: "book", icon: BookOpen },
  { key: "users", icon: Users },
  { key: "prayer", icon: HandHeart },
  { key: "bell", icon: Bell },
];

export function getCeremonyTypeIconOption(iconKey: CeremonyTypeIconKey) {
  return (
    CEREMONY_TYPE_ICON_OPTIONS.find((option) => option.key === iconKey) ??
    CEREMONY_TYPE_ICON_OPTIONS[0]
  );
}
