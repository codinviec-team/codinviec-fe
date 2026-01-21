"use client";

import Container from "@/components/ui/Container";
import PaginationComponent from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import { UIButton } from "@/components/ui/UIButton";
import useCompanySize, {
  CompanySizeOption,
} from "@/hooks/Common/CompanySize/useCompanySize";
import useLocation, {
  ProvinceOption,
} from "@/hooks/Common/location/useLocation";
import CompanyServices from "@/services/home/companies/CompanyServices";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { CompanyType } from "@/types/home/company/CompanyType";
import { removeVietnameseTones } from "@/utils/removeVietnameseTones ";
import {
  BuildOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/constants/paths";

const pageSizeBlogDefault = 9;

const CompaniesListingClient = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { dataLocation, provinceData, handleProvinceChange } = useLocation();
  const { dataCompanySize, companySizeState, handleCompanySizeChange } =
    useCompanySize();

  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // lấy giá trị từ URL params khi component mount
  useEffect(() => {
    const keywordParams = searchParams.get("keyword") || "";
    const pageParams = parseInt(searchParams.get("page") || "1") || 0;
    setSearchKeyword(keywordParams);
    setCurrentPage(pageParams);
  }, [searchParams]);

  // Tìm kiếm mặc định cho employee size từ URL
  useEffect(() => {
    if (
      dataCompanySize?.length > 0 &&
      searchParams.get("maxEmployees") &&
      searchParams.get("minEmployees")
    ) {
      const minEmployeesParam = parseInt(
        searchParams.get("minEmployees") || "0"
      );
      const maxEmployeesParam = parseInt(
        searchParams.get("maxEmployees") || "0"
      );
      const selectedCompanySize =
        dataCompanySize.find(
          (size) =>
            size.minEmployees === minEmployeesParam &&
            size.maxEmployees === maxEmployeesParam
        ) || undefined;
      handleCompanySizeChange(selectedCompanySize);
    }
  }, [dataCompanySize?.length]);

  // Tìm kiếm mặc định cho location từ URL
  useEffect(() => {
    if (dataLocation?.length > 0 && searchParams.get("location")) {
      const locationParam = searchParams.get("location") || "";
      const selectedLocation =
        dataLocation.find((loc) => loc.name === locationParam) || undefined;
      handleProvinceChange(selectedLocation);
    }
  }, [dataLocation?.length]);

  // đảm bảo có param page và keyword trong URL
  useEffect(() => {
    if (!searchParams.get("page")) {
      params.set("page", "1");
    }
    if (!searchParams.get("keyword")) {
      params.set("keyword", "");
    }
    router.replace(`${PATHS.COMPANIES}?${params.toString()}`);
  }, []);

  const { data: dataCompany, isLoading: isLoadingCompany } = useQuery<
    BasePageResponse<CompanyType>,
    Error
  >({
    queryKey: [
      "company",
      currentPage,
      provinceData,
      companySizeState,
      searchKeyword,
    ],
    queryFn: () => {
      return CompanyServices.getAllCompanyHavePage({
        keyword: searchKeyword,
        minEmployees: companySizeState?.minEmployees || 0,
        maxEmployees: companySizeState?.maxEmployees || 0,
        location: provinceData?.name || "",
        pageSize: pageSizeBlogDefault || 0,
        pageNumber: currentPage || 1,
      });
    },
  });

  const totalCompany = dataCompany?.content?.length || 0;

  const handleFinishSearch = (values: {
    keyword?: string;
    location?: string;
  }) => {
    setSearchKeyword(values.keyword || "");
    setCurrentPage(1);
    params.set("keyword", values.keyword || "");
    params.set("page", "1");
    router.replace(`${PATHS.COMPANIES}?${params.toString()}`);
  };

  const handleChangeLocatation = (
    value: number,
    option?: ProvinceOption | ProvinceOption[]
  ) => {
    if (!option || Array.isArray(option)) {
      handleProvinceChange(undefined);
      return;
    }
    handleProvinceChange?.(option);
    params.set("page", "1");
    params.set("location", option.name || "");
    router.replace(`${PATHS.COMPANIES}?${params.toString()}`);
    console.log("option", option);
  };

  const handleChangeCompanySize = (
    value: number,
    option?: CompanySizeOption | CompanySizeOption[]
  ) => {
    if (!option || Array.isArray(option)) {
      handleCompanySizeChange(undefined);
      return;
    }
    setCurrentPage(1);
    handleCompanySizeChange?.(option);
    params.set("page", "1");
    params.set("minEmployees", option.minEmployees?.toString() || "0");
    params.set("maxEmployees", option.maxEmployees?.toString() || "0");
    router.replace(`${PATHS.COMPANIES}?${params.toString()}`);
  };

  const handleResetFilter = () => {
    handleProvinceChange?.(undefined);
    handleCompanySizeChange?.(undefined);
    setSearchKeyword("");
    setCurrentPage(1);

    const resetParams = new URLSearchParams();
    resetParams.set("page", "1");
    resetParams.set("keyword", "");
    router.replace(`${PATHS.COMPANIES}?${resetParams.toString()}`);
    // form.resetFields();
  };

  // change page
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    params.set("page", page.toString());
    router.replace(`${PATHS.COMPANIES}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {/* Search Section at Top */}
      <div className="bg-brand-gradient py-12">
        <Container className="!py-0">
          {/* search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SearchBar
              form={form}
              showLocation={false}
              onFinish={handleFinishSearch}
              placeholder="Tìm kiếm công ty..."
              locationPlaceholder="Tất cả thành phố"
            />
          </motion.div>
        </Container>
      </div>

      <Container className="!py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <BuildOutlined className="text-3xl text-primary-500" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Công ty <span className="text-primary-600">IT hàng đầu</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Tìm thấy <strong>{totalCompany}</strong> công ty phù hợp
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className=" rounded-2xl py-2 my-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex flex-wrap gap-4">
              <Select
                placeholder="Quy mô"
                showSearch
                onChange={handleChangeCompanySize}
                filterOption={(input, option) =>
                  removeVietnameseTones(option?.label ?? "").includes(
                    removeVietnameseTones(input)
                  )
                }
                value={companySizeState?.value}
                options={dataCompanySize}
                className="lg:w-[200px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
              />

              {/* location */}
              <Select
                placeholder="Địa điểm"
                showSearch
                filterOption={(input, option) =>
                  removeVietnameseTones(option?.label ?? "").includes(
                    removeVietnameseTones(input)
                  )
                }
                onChange={handleChangeLocatation}
                value={provinceData?.value}
                options={dataLocation}
                suffixIcon={
                  <EnvironmentOutlined className="text-primary-400" />
                }
                className="lg:w-[200px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
              />
            </div>
            <div className="flex-1" />
            <UIButton
              variantCustom="accent"
              size="large"
              icon={<ReloadOutlined />}
              onClick={() => {
                handleResetFilter();
              }}
              className="!h-[48px] !rounded-xl"
            >
              Đặt lại
            </UIButton>
          </div>
        </motion.div>
        {/* Companies Grid */}
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dataCompany &&
              dataCompany?.content?.length > 0 &&
              dataCompany?.content?.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
          </div>

          {/* Pagination */}
          <PaginationComponent
            current={currentPage}
            total={dataCompany?.totalElements || 0}
            pageSize={pageSizeBlogDefault}
            onChange={handleChangePage}
          />
        </>
      </Container>
    </div>
  );
};

export default CompaniesListingClient;
