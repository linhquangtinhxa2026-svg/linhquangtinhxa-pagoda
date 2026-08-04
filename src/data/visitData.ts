export const DIRECTION_KEYS = ["car", "transit", "rideshare"] as const;

export type DirectionKey = (typeof DIRECTION_KEYS)[number];

export const VISIT_ACTIVITY_KEYS = ["sightseeing", "pray", "wish", "festival"] as const;

export type VisitActivityKey = (typeof VISIT_ACTIVITY_KEYS)[number];

export const VISIT_ACTIVITY_IMAGES: Record<VisitActivityKey, string> = {
  sightseeing: "/images/lien-he/pagoda-gate.jpg",
  pray: "/images/visit/visit-01.webp",
  wish: "/images/histories/history-05.webp",
  festival: "/images/histories/history-04.webp",
};

export const ETIQUETTE_ITEMS = [
  { key: "dress", isDo: true },
  { key: "quiet", isDo: true },
  { key: "ceremony", isDo: true },
  { key: "noTouch", isDo: false },
  { key: "noLitter", isDo: false },
  { key: "noFood", isDo: false },
] as const;

export const DAILY_SCHEDULE_ITEMS = [
  { time: "03g30", key: "wake" },
  { time: "04g00", key: "morningPractice" },
  { time: "05g00", key: "breakfast" },
  { time: "05g30", key: "chores" },
  { time: "08g00", key: "lotusSutra" },
  { time: "10g00", key: "noonOffering" },
  { time: "11g00", key: "chanting" },
  { time: "12g00", key: "rest" },
  { time: "14g00", key: "study" },
  { time: "16g00", key: "eveningPractice" },
  { time: "18g20", key: "repentance" },
] as const;

export const RECURRING_ACTIVITY_KEYS = ["refuge", "repentanceChanting", "clinic"] as const;

export type RecurringActivityKey = (typeof RECURRING_ACTIVITY_KEYS)[number];

export const VISIT_GALLERY_IMAGES = [
  { key: "sanctuary", src: "/images/visit/visit-01.webp" },
  { key: "gate", src: "/images/lien-he/pagoda-gate.jpg" },
  { key: "facade", src: "/images/lien-he/pagoda-overview.webp" },
  { key: "festival", src: "/images/histories/history-04.webp" },
  { key: "grounds", src: "/images/new-histories/image-01.jpg" },
] as const;
