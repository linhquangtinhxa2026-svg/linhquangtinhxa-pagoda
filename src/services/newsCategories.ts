import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import type { NewsCategory } from "@/types/newsCategory";

export const getNewsCategoriesListService = async (): Promise<NewsCategory[]> => {
  return pb.collection(COLLECTIONS.NEWS_CATEGORIES).getFullList<NewsCategory>({
    sort: "label",
    requestKey: null,
  });
};
