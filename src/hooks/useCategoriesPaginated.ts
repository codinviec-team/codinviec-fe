"use client";

import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/Category";
import { categoryService } from "@/services/categoryService";
import { BasePageResponse } from "@/types/BasePageResponse";
import { PageRequest } from "@/types/PageRequest";

//cho Admin sau này cần Phân Trang, Sort, Search
export function useCategoriesPaginated(pageRequest: PageRequest = {}) {
  return useQuery<BasePageResponse<Category>, Error>({
    queryKey: [
      "categories",
      "paginated",
      pageRequest.pageNumber,
      pageRequest.pageSize,
      pageRequest.sortBy,
      pageRequest.keyword,
    ],
    queryFn: () => categoryService.getAllPaginated(pageRequest),
    staleTime: 1000 * 60 * 5, // Cache 5 phút cho admin
    gcTime: 1000 * 60 * 30, // Giữ cache 30 phút
  });
}
