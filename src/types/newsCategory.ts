export type NewsCategoryColorKey = "burgundy" | "gold" | "dark";

export interface NewsCategory {
  id: string;
  label: string;
  value: string;
  colorKey: NewsCategoryColorKey;
}
