import { normalizeVietnamese } from "@/lib/vietnamese";

export function slugify(input: string): string {
  return normalizeVietnamese(input)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
