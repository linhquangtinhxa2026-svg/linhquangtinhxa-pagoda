import { pb } from "@/lib/pocketbase";
import { COLLECTIONS } from "@/constants/api";
import type { Media, MediaType } from "@/types/media";

function getMediaType(file: File): MediaType {
  return file.type.startsWith("video/") ? "video" : "image";
}

function getExtension(file: File): string {
  const dotIndex = file.name.lastIndexOf(".");
  return dotIndex === -1 ? "" : file.name.slice(dotIndex + 1).toLowerCase();
}

export const uploadMediaService = async (file: File, folder: string): Promise<Media> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", getMediaType(file));
  formData.append("extension", getExtension(file));
  formData.append("folder", folder);

  return pb.collection(COLLECTIONS.MEDIA).create<Media>(formData);
};

export const getMediaFileUrl = (media: Media): string => {
  return pb.files.getURL(media, media.file);
};
