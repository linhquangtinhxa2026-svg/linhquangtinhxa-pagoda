export const PAGODA_INFO = {
  name: "Tịnh Xá Linh Quang",
  address: "40/60 Nguyễn Khoái, Phường Vĩnh Hội, TP. Hồ Chí Minh",
  phone: "0989.492.440",
  // Zalo chat only works with a mobile number registered on Zalo — placeholder, replace with the real number.
  zaloPhone: "0989492440",
  email: "linhquangtinhxa2026@gmail.com",
  mapUrl:
    "https://www.google.com/maps?cid=11981056744630790176&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en-GB&source=embed",
  mapEmbedUrl:
    "https://www.google.com/maps?q=40/60+Nguy%E1%BB%85n+Kho%C3%A1i,+Ph%C6%B0%E1%BB%9Dng+2,+Qu%E1%BA%ADn+4,+TP.+H%E1%BB%93+Ch%C3%AD+Minh&output=embed",
} as const;

export const ACTIVITY_ICON_KEYS = [
  "education",
  "medicine",
  "memorial",
  "practice",
] as const;

export type ActivityIconKey = (typeof ACTIVITY_ICON_KEYS)[number];
