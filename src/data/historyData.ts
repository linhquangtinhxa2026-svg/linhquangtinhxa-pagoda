import type { MasterKey } from "@/data/mastersData";

export const HISTORY_ERA_KEYS = [
  "earlyDays",
  "construction",
  "founderEra",
  "succession",
  "thirdAbbot",
] as const;

export type HistoryEraKey = (typeof HISTORY_ERA_KEYS)[number];

export const HISTORY_ERAS: Record<
  HistoryEraKey,
  {
    yearRange: string;
    image: string;
    masterKey?: MasterKey;
    descCount: number;
    imageAspectClass?: string;
  }
> = {
  earlyDays: {
    yearRange: "1952 – 1953",
    image: "/images/new-histories/image-03.png",
    masterKey: "founder",
    descCount: 6,
  },
  construction: {
    yearRange: "1963 – 1966",
    image: "/images/new-histories/image-06.png",
    descCount: 4,
  },
  founderEra: {
    yearRange: "1966 – 1983",
    image: "/images/lien-he/pagoda-gate.jpg",
    descCount: 2,
  },
  succession: {
    yearRange: "1983 – 2021",
    image: "/images/new-histories/image-02.jpg",
    masterKey: "pastAbbot",
    descCount: 5,
  },
  thirdAbbot: {
    yearRange: "2021 - 2026",
    image: "/images/new-histories/image-05.png",
    masterKey: "abbot",
    descCount: 4,
    imageAspectClass: "aspect-[16/9]",
  },
};

export const HISTORY_LINEAGE_IMAGE = "/images/histories/history-05.webp";

export const HISTORY_GALLERY_IMAGES = [
  { key: "media02", src: "/images/media/image_02.png" },
  { key: "media04", src: "/images/media/image_04.png" },
  { key: "media05", src: "/images/media/image_05.png" },
  { key: "media07", src: "/images/media/image_07.png" },
  { key: "media09", src: "/images/media/image_09.png" },
  { key: "media10", src: "/images/media/image_10.png" },
] as const;
