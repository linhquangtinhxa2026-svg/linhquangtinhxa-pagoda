import { useQuery } from "@tanstack/react-query";

import { getNewsCategoriesListService } from "@/services/newsCategories";

const NEWS_CATEGORIES_QUERY_KEY = ["news-categories"];

export function useNewsCategoriesList() {
  return useQuery({
    queryKey: NEWS_CATEGORIES_QUERY_KEY,
    queryFn: getNewsCategoriesListService,
  });
}
