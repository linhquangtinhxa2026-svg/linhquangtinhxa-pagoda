export const MASTER_KEYS = ["founder", "pastAbbot", "abbot"] as const;

export type MasterKey = (typeof MASTER_KEYS)[number];

export const MASTERS: Record<
  MasterKey,
  { slug: string; name: string; image: string; years: string }
> = {
  founder: {
    slug: "thich-pho-ung",
    name: "Cố Đại Lão Hòa Thượng Thượng Phổ Hạ Ứng",
    image: "/images/new-histories/image-03.png",
    years: "1953 – 1983",
  },
  pastAbbot: {
    slug: "thich-tu-giang",
    name: "Cố Hòa Thượng Thượng Từ Hạ Giang",
    image: "/images/new-histories/image-02.jpg",
    years: "1983 – 2021",
  },
  abbot: {
    slug: "thich-minh-hue",
    name: "Thượng Toạ Thích Minh Huệ",
    image: "/images/new-histories/image-09.png",
    years: "2021 – Hiện Nay",
  },
};

export const MASTER_JOURNEY_LENGTH: Record<MasterKey, number> = {
  founder: 4,
  pastAbbot: 5,
  abbot: 4,
};

export function getMasterKeyBySlug(slug: string): MasterKey | undefined {
  return MASTER_KEYS.find(key => MASTERS[key].slug === slug);
}
