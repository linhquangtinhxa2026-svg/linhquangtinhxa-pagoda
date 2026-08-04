import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import type { CeremonyType } from "@/types/ceremonyType";

export const getCeremonyTypesListService = async (): Promise<CeremonyType[]> => {
  return pb.collection(COLLECTIONS.CEREMONY_TYPES).getFullList<CeremonyType>({
    sort: "created",
    requestKey: null,
  });
};

export const createCeremonyTypeService = async (
  data: Partial<CeremonyType>
): Promise<CeremonyType> => {
  return pb.collection(COLLECTIONS.CEREMONY_TYPES).create<CeremonyType>(data);
};

export const updateCeremonyTypeService = async (
  id: string,
  data: Partial<CeremonyType>
): Promise<CeremonyType> => {
  return pb.collection(COLLECTIONS.CEREMONY_TYPES).update<CeremonyType>(id, data);
};

export const deleteCeremonyTypeService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.CEREMONY_TYPES).delete(id);
};
