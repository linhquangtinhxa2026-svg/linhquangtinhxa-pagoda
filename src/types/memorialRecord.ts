export interface MemorialRecord {
  id: string;
  full_name: string;
  age_at_death: number | null;
  phone: string;
  storage_location: string;
  display_location: string;
  private_info: string;
  search_index: string;
  isArchived: boolean;
  archivedAt: string | null;
  created: string;
  updated: string;
}
