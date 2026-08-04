import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import type { News } from "@/types/news";

export const getNewsListService = async (): Promise<News[]> => {
  return pb.collection(COLLECTIONS.NEWS).getFullList<News>({
    sort: "-created",
    expand: "category",
    requestKey: null,
  });
};

export const getPublishedNewsListService = async (): Promise<News[]> => {
  return pb.collection(COLLECTIONS.NEWS).getFullList<News>({
    filter: "isPublished = true",
    sort: "-publishedAt",
    expand: "category",
    requestKey: null,
  });
};

export const getNewsByIdService = async (id: string): Promise<News> => {
  return pb.collection(COLLECTIONS.NEWS).getOne<News>(id, {
    expand: "category",
    requestKey: null,
  });
};

export const getNewsBySlugService = async (slug: string): Promise<News | null> => {
  try {
    return await pb.collection(COLLECTIONS.NEWS).getFirstListItem<News>(
      `slug = "${slug}" && isPublished = true`,
      { expand: "category", requestKey: null }
    );
  } catch {
    return null;
  }
};

export const createNewsService = async (data: Partial<News>): Promise<News> => {
  return pb.collection(COLLECTIONS.NEWS).create<News>(data);
};

export const updateNewsService = async (id: string, data: Partial<News>): Promise<News> => {
  return pb.collection(COLLECTIONS.NEWS).update<News>(id, data);
};

export const deleteNewsService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.NEWS).delete(id);
};
