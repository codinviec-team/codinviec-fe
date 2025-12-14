"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Select } from "antd";
import {
  BuildOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Container from "@/components/ui/Container";
import SearchBar from "@/components/ui/SearchBar";
import CompanyCard from "./CompanyCard";
import PaginationComponent from "@/components/ui/Pagination";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { CompanyType } from "@/types/home/company/CompanyType";
import { useQuery } from "@tanstack/react-query";
import CompanyServices from "@/services/home/companies/CompanyServices";

const sizes = [
  { value: "all", label: "Tất cả quy mô" },
  { value: "50 - 100", label: "50 - 100 nhân viên" },
  { value: "100 - 500", label: "100 - 500 nhân viên" },
  { value: "500 - 1,000", label: "500 - 1,000 nhân viên" },
  { value: "1,000 - 5,000", label: "1,000 - 5,000 nhân viên" },
  { value: "5,000 - 10,000", label: "5,000 - 10,000 nhân viên" },
];

const locations = [
  { value: "all", label: "Tất cả địa điểm" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
];

export default function CompaniesListingClient() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const handleSearch = (values: { keyword?: string; location?: string }) => {
    if (values.keyword) {
      setSearchKeyword(values.keyword);
    }
    if (values.location && values.location !== "all") {
      setSelectedLocation(values.location);
    }
    setCurrentPage(1);
  };

  const { data, isLoading } = useQuery<CompanyType[], Error>({
    queryKey: ["company"],
    queryFn: () => CompanyServices.getAllCompany(),
  });

  console.log("da", data);

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
              onFinish={handleSearch}
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
                // value={}
                // onChange={}
                options={sizes}
                className="lg:w-[200px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
              />

              <Select
                size="large"
                placeholder="Địa điểm"
                // value={selectedLocation}
                // onChange={setSelectedLocation}
                options={locations}
                suffixIcon={
                  <EnvironmentOutlined className="text-primary-400" />
                }
                className="lg:w-[200px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
              />

              <Select
                size="large"
                placeholder="Sắp xếp"
                // value={sortBy}
                // onChange={setSortBy}
                // options={sortOptions}
                className="lg:w-[180px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
              />

              <div className="flex-1" />

              <Button
                size="large"
                icon={<ReloadOutlined />}
                // onClick={handleReset}
                className="!h-[48px] !rounded-xl"
              >
                Đặt lại
              </Button>
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
            Tìm thấy <strong>10</strong> công ty phù hợp
          </p>
        </motion.div>

        {/* Companies Grid */}
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data &&
              data?.length > 0 &&
              data?.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
          </div>

          {/* Pagination */}
          <PaginationComponent
            current={currentPage}
            total={10}
            pageSize={pageSize}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      </Container>
    </div>
  );
}
