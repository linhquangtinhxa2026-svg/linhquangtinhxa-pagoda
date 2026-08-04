import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import { normalizeVietnamese } from "@/lib/vietnamese";
import type { MemorialRecord } from "@/types/memorialRecord";

interface MemorialRecordsListParams {
  search?: string;
  sort?: string;
}

const buildSearchIndex = (data: Partial<MemorialRecord>): string => {
  return normalizeVietnamese(
    [
      data.full_name,
      data.phone,
      data.storage_location,
      data.display_location,
      data.private_info,
    ]
      .filter(Boolean)
      .join(" ")
  );
};

const buildFilter = (search?: string) => {
  if (!search || !search.trim()) return "";
  return pb.filter("search_index ~ {:q}", { q: normalizeVietnamese(search) });
};

export const getMemorialRecordsListService = async (
  page: number,
  perPage: number,
  { search, sort = "-created" }: MemorialRecordsListParams = {}
) => {
  return pb.collection(COLLECTIONS.MEMORIAL_RECORDS).getList<MemorialRecord>(page, perPage, {
    filter: buildFilter(search),
    sort,
    requestKey: null,
  });
};

export const getAllMemorialRecordsService = async (): Promise<MemorialRecord[]> => {
  return pb.collection(COLLECTIONS.MEMORIAL_RECORDS).getFullList<MemorialRecord>({
    sort: "-created",
    requestKey: null,
  });
};

export const createMemorialRecordService = async (
  data: Partial<MemorialRecord>
): Promise<MemorialRecord> => {
  return pb
    .collection(COLLECTIONS.MEMORIAL_RECORDS)
    .create<MemorialRecord>({ ...data, search_index: buildSearchIndex(data) });
};

export const updateMemorialRecordService = async (
  id: string,
  data: Partial<MemorialRecord>
): Promise<MemorialRecord> => {
  return pb
    .collection(COLLECTIONS.MEMORIAL_RECORDS)
    .update<MemorialRecord>(id, { ...data, search_index: buildSearchIndex(data) });
};

export const deleteMemorialRecordService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.MEMORIAL_RECORDS).delete(id);
};

export const bulkDeleteMemorialRecordsService = async (ids: string[]): Promise<void> => {
  for (const id of ids) {
    await pb.collection(COLLECTIONS.MEMORIAL_RECORDS).delete(id);
  }
};

export const bulkCreateMemorialRecordsService = async (
  records: Partial<MemorialRecord>[],
  onProgress?: (done: number, total: number) => void
): Promise<void> => {
  let done = 0;
  for (const record of records) {
    await pb
      .collection(COLLECTIONS.MEMORIAL_RECORDS)
      .create({ ...record, search_index: buildSearchIndex(record) });
    done += 1;
    onProgress?.(done, records.length);
  }
};

export const deleteAllMemorialRecordsService = async (): Promise<void> => {
  const all = await getAllMemorialRecordsService();
  for (const record of all) {
    await pb.collection(COLLECTIONS.MEMORIAL_RECORDS).delete(record.id);
  }
};
