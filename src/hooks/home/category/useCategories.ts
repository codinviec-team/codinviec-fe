"use client";

import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/home/Category";
import { categoryService } from "@/services/home/category/categoryService";

export function useCategories() {
    return useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: () => categoryService.getAll(),
        staleTime: 1000 * 60 * 30, // Cache 30 phút
        gcTime: 1000 * 60 * 60, // Giữ cache 1 giờ
        refetchOnWindowFocus: false, // Không refetch khi focus window
        refetchOnMount: false, // Không refetch khi mount lại nếu đã có cache
    });
}

