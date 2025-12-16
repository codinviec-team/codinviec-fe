"use client";
import CompanySizeService from "@/services/common/CompanySizeService";
import { CompanySizeType } from "@/types/common/CompanySize";
import { useQuery } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

export type CompanySizeOption = Omit<DefaultOptionType, "value"> & {
  value: number | null | undefined;
} & CompanySizeType;

const useCompanySize = () => {
  const [companySizeState, setCompanySizeState] = useState<CompanySizeOption>();

  const { data: dataCompanySize, isLoading: isLoadingCompanySize } = useQuery<
    CompanySizeType[],
    Error
  >({
    queryKey: ["companySize"],
    queryFn: () => CompanySizeService.getAllCompanySize(),
  });

  const handleCompanySizeChange = (
    companySize: CompanySizeOption | undefined
  ) => {
    setCompanySizeState(companySize);
  };

  return {
    dataCompanySize:
      dataCompanySize?.map((companysize) => {
        return {
          ...companysize,
          value: companysize?.id || null,
          label:
            `${companysize?.minEmployees || ""} - ${
              companysize?.maxEmployees || ""
            } nhân viên` || "",
        };
      }) || [],
    companySizeState,
    handleCompanySizeChange,
  };
};
export default useCompanySize;
