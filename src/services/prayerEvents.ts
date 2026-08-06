import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import type { PrayerEvent } from "@/types/prayerEvent";

export const getPrayerEventsListService = async (): Promise<PrayerEvent[]> => {
  return pb.collection(COLLECTIONS.PRAYER_EVENTS).getFullList<PrayerEvent>({
    filter: "isArchived = false",
    sort: "created",
    requestKey: null,
  });
};

export const getArchivedPrayerEventsListService = async (): Promise<PrayerEvent[]> => {
  return pb.collection(COLLECTIONS.PRAYER_EVENTS).getFullList<PrayerEvent>({
    filter: "isArchived = true",
    sort: "-archivedAt",
    requestKey: null,
  });
};

export const createPrayerEventService = async (
  data: Partial<PrayerEvent>
): Promise<PrayerEvent> => {
  return pb.collection(COLLECTIONS.PRAYER_EVENTS).create<PrayerEvent>(data);
};

export const bulkCreatePrayerEventsService = async (
  records: Partial<PrayerEvent>[],
  onProgress?: (done: number, total: number) => void
): Promise<void> => {
  let done = 0;
  for (const record of records) {
    await pb.collection(COLLECTIONS.PRAYER_EVENTS).create(record);
    done += 1;
    onProgress?.(done, records.length);
  }
};

export const updatePrayerEventService = async (
  id: string,
  data: Partial<PrayerEvent>
): Promise<PrayerEvent> => {
  return pb.collection(COLLECTIONS.PRAYER_EVENTS).update<PrayerEvent>(id, data);
};

export const archivePrayerEventService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.PRAYER_EVENTS).update(id, {
    isArchived: true,
    archivedAt: new Date().toISOString(),
  });
};

export const bulkArchivePrayerEventsService = async (ids: string[]): Promise<void> => {
  for (const id of ids) {
    await pb.collection(COLLECTIONS.PRAYER_EVENTS).update(id, {
      isArchived: true,
      archivedAt: new Date().toISOString(),
    });
  }
};

export const restorePrayerEventService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.PRAYER_EVENTS).update(id, {
    isArchived: false,
    archivedAt: null,
  });
};

export const bulkRestorePrayerEventsService = async (ids: string[]): Promise<void> => {
  for (const id of ids) {
    await pb.collection(COLLECTIONS.PRAYER_EVENTS).update(id, {
      isArchived: false,
      archivedAt: null,
    });
  }
};

export const permanentlyDeletePrayerEventService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.PRAYER_EVENTS).delete(id);
};

export const bulkPermanentlyDeletePrayerEventsService = async (
  ids: string[]
): Promise<void> => {
  for (const id of ids) {
    await pb.collection(COLLECTIONS.PRAYER_EVENTS).delete(id);
  }
};
