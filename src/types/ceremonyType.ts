export type CeremonyTypeColorKey = "emerald" | "violet" | "sky" | "amber" | "rose";

export interface CeremonyType {
  id: string;
  value: string; // slug used by PrayerEvent.type
  label: string;
  colorKey: CeremonyTypeColorKey;
}
