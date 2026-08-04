export type MediaType = "image" | "video";

export interface Media {
  id: string;
  file: string;
  type: MediaType;
  extension: string;
  folder: string;
  altText: string;
  created: string;
  updated: string;
}
