"use client";
import ProvinceService from "@/services/ProvinceService";
import { ProvinceType } from "@/types/ProvinceType";
import { useQuery } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

export type ProvinceOption = Omit<DefaultOptionType, "value"> & {
  value: number | null | undefined;
} & ProvinceType;

const useLocation = () => {
  const [provinceData, setProvinceData] = useState<ProvinceOption | undefined>(
    undefined,
  );

  const { data: dataLocation, isLoading: isLoadinLocation } = useQuery<
    ProvinceType[],
    Error
  >({
    queryKey: ["location"],
    queryFn: () => ProvinceService.getAllProvince(),
    staleTime: 1000 * 60 * 30, // Cache 30 phút
    gcTime: 1000 * 60 * 60, // Giữ cache 1 giờ
    refetchOnWindowFocus: false, // Không refetch khi focus window
    refetchOnMount: false, // Không refetch khi mount lại nếu đã có cache
  });

  const handleProvinceChange = (province: ProvinceOption | undefined) => {
    setProvinceData(province);
  };

  return {
    dataLocation:
      dataLocation?.map((location) => {
        return {
          ...location,
          value: Number(location?.id) || 0,
          label: location?.name || "",
        };
      }) || [],
    provinceData,
    isLoadinLocation,
    handleProvinceChange,
  };
};
export default useLocation;
