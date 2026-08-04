// References CeremonyType.value from the "ceremony_types" collection, or UNKNOWN_CEREMONY_TYPE_VALUE (src/lib/ceremonyType.ts)
export type PrayerEventType = string;

export interface PrayerEvent {
  id: string;
  type: PrayerEventType;
  registrantName: string;
  subjectName: string;
  phone: string;
  eventDate: string; // ISO date (solar), e.g. "2026-08-03"
  note: string;
  isArchived: boolean;
  archivedAt: string | null;
}
