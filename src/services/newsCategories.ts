import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import type { NewsCategory } from "@/types/newsCategory";

export const getNewsCategoriesListService = async (): Promise<NewsCategory[]> => {
  return pb.collection(COLLECTIONS.NEWS_CATEGORIES).getFullList<NewsCategory>({
    sort: "order",
    requestKey: null,
  });
};

export const createNewsCategoryService = async (
  data: Partial<NewsCategory>
): Promise<NewsCategory> => {
  return pb.collection(COLLECTIONS.NEWS_CATEGORIES).create<NewsCategory>(data);
};

export const updateNewsCategoryService = async (
  id: string,
  data: Partial<NewsCategory>
): Promise<NewsCategory> => {
  return pb.collection(COLLECTIONS.NEWS_CATEGORIES).update<NewsCategory>(id, data);
};

export const deleteNewsCategoryService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.NEWS_CATEGORIES).delete(id);
};
