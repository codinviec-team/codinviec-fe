"use client";
import ProvinceService from "@/services/common/ProvinceService";
import { ProvinceType } from "@/types/common/ProvinceType";
import { useQuery } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

export type ProvinceOption = Omit<DefaultOptionType, "value"> & {
  value: number | null | undefined;
} & ProvinceType;

const useLocation = () => {
  const [provinceData, setProvinceData] = useState<ProvinceOption | undefined>(
    undefined
  );

  const { data: dataLocation, isLoading: isLoadinLocation } = useQuery<
    ProvinceType[],
    Error
  >({
    queryKey: ["location"],
    queryFn: () => ProvinceService.getAllProvince(),
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
