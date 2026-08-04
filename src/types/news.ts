import type { NewsCategory } from "@/types/newsCategory";

export interface GalleryItem {
  url: string;
  type: "image" | "video";
}

export interface News {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImageUrl: string;
  gallery: GalleryItem[];
  category: string;
  isPublished: boolean;
  publishedAt: string | null;
  created: string;
  updated: string;
  expand?: {
    category?: NewsCategory;
  };
}
