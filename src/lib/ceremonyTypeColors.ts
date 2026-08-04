import type { CeremonyTypeColorKey } from "@/types/ceremonyType";

interface CeremonyTypeColorOption {
  key: CeremonyTypeColorKey;
  badgeClass: string;
  dotClass: string;
}

export const CEREMONY_TYPE_COLOR_OPTIONS: CeremonyTypeColorOption[] = [
  { key: "emerald", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200", dotClass: "bg-emerald-500" },
  { key: "violet", badgeClass: "bg-violet-50 text-violet-600 border-violet-200", dotClass: "bg-violet-500" },
  { key: "sky", badgeClass: "bg-sky-50 text-sky-700 border-sky-200", dotClass: "bg-sky-500" },
  { key: "amber", badgeClass: "bg-amber-50 text-amber-700 border-amber-200", dotClass: "bg-amber-500" },
  { key: "rose", badgeClass: "bg-rose-50 text-rose-700 border-rose-200", dotClass: "bg-rose-500" },
];

export function getCeremonyTypeColorOption(colorKey: CeremonyTypeColorKey) {
  return (
    CEREMONY_TYPE_COLOR_OPTIONS.find((option) => option.key === colorKey) ??
    CEREMONY_TYPE_COLOR_OPTIONS[0]
  );
}
