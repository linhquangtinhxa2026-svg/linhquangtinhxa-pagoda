export type CeremonyTypeColorKey = "emerald" | "violet" | "sky" | "amber" | "rose";

export type CeremonyTypeIconKey =
  | "flame"
  | "flower"
  | "heart"
  | "sun"
  | "moon"
  | "star"
  | "book"
  | "users"
  | "prayer"
  | "bell";

export interface CeremonyType {
  id: string;
  value: string; // slug used by PrayerEvent.type
  label: string;
  colorKey: CeremonyTypeColorKey;
  iconKey: CeremonyTypeIconKey;
  important: boolean;
}
