import { normalizeVietnamese } from "@/lib/vietnamese";

export function slugifyCeremonyTypeLabel(label: string): string {
  return normalizeVietnamese(label).trim().replace(/\s+/g, "_");
}

// Reserved value a prayer_event.type is set to when the ceremony type it
// referenced was deleted — must match the literal in pb_hooks/ceremony_types.pb.js
export const UNKNOWN_CEREMONY_TYPE_VALUE = "unknown";
