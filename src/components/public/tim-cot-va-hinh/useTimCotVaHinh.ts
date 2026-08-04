import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getMemorialRecordsListService } from "@/services/memorialRecords";

const PER_PAGE = 20;

export function useTimCotVaHinh(page: number, search: string) {
  return useQuery({
    queryKey: ["memorial-records-search", { page, search }],
    queryFn: () => getMemorialRecordsListService(page, PER_PAGE, { search, sort: "full_name" }),
    placeholderData: keepPreviousData,
  });
}
