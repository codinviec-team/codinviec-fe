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
import React, { useState } from "react";
import CompanyCard from "./CompanyCard";

const pageSizeBlogDefault = 9;

export default function CompaniesListingClient() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputingState, setInputingState] = useState("");

  const { dataLocation, provinceData, handleProvinceChange } = useLocation();
  const { dataCompanySize, companySizeState, handleCompanySizeChange } =
    useCompanySize();
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

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

  const handleFinishSearch = () => {
    setSearchKeyword(inputingState);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputingState(e?.target?.value);
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
  };

  const handleChangeCompanySize = (
    value: number,
    option?: CompanySizeOption | CompanySizeOption[]
  ) => {
    if (!option || Array.isArray(option)) {
      handleCompanySizeChange(undefined);
      return;
    }
    handleCompanySizeChange?.(option);
  };

  const handleChangePagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const handleResetFilter = () => {
    handleProvinceChange?.(undefined);
    handleCompanySizeChange?.(undefined);
    setSearchKeyword("");
    form.resetFields();
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
              onKeywordChange={onChangeSearch}
              placeholder="Tìm kiếm công ty..."
              locationPlaceholder="Tất cả thành phố"
            />
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-primary-100 my-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <Select
                size="large"
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
                size="large"
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

              <div className="flex-1" />
              <UIButton
                variantCustom="accent"
                size="large"
                icon={<ReloadOutlined />}
                onClick={handleResetFilter}
                className="!h-[48px] !rounded-xl"
              >
                Đặt lại
              </UIButton>
            </div>
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
            onChange={handleChangePagination}
          />
        </>
      </Container>
    </div>
  );
}
