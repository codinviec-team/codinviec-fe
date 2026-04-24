"use client";

import CheckboxDropdown from "@/components/CheckboxDropdown";
import Container from "@/components/Container";
import PaginationComponent from "@/components/Pagination";
import SalarySliderDropdown from "@/components/SalarySliderDropdown ";
import SearchBar from "@/components/SearchBar";
import { UIButton } from "@/components/UIButton";
import { PATHS } from "@/constants/paths";
import useLocation, { ProvinceOption } from "@/hooks/useLocation";
import EmploymentTypeService from "@/services/EmploymentTypeService";
import IndustryService from "@/services/IndustryService";
import LevelJobService from "@/services/LevelJobService";
import JobServices from "@/services/JobServices";
import { BasePageResponse } from "@/types/BasePageResponse";
import { EmploymentTypeType } from "@/types/EmploymentType";
import { IndustryType } from "@/types/IndustryType";
import { JobLevelType } from "@/types/JobLevelType";
import { ProvinceType } from "@/types/ProvinceType";
import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form } from "antd";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import CompanyHighlight from "./components/CompanyHighlight";
import JobDetail from "./components/JobDetail";
import JobListCard from "./components/JobListCard";
import { JobType } from "@/types/JobType";

// Demo data - tương tự itviec
const SALARY_MIN = 0;
const SALARY_MAX = 100000;
const pageSizeDefault = 9;
export default function JobsListingClient() {
  // ======= GENERAL =======
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    level: [] as string[],
    workingModel: [] as string[],
    domain: [] as string[],
    salaryRange: [SALARY_MIN, SALARY_MAX] as [number, number],
  });
  const [form] = Form.useForm();

  // location hiện lên lúc đầu
  const [location, setLocation] = useState<ProvinceType | null>(null);

  // ROUTER & URL PARAMS
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const locationParams = searchParams.get("location") || "";

  // useDebounce
  const debouncedFilters = useDebounce(filters, 500);
  // location
  const { dataLocation, provinceData, handleProvinceChange } = useLocation();

  // xét location khởi đầu
  useEffect(() => {
    if (dataLocation.length > 0 && locationParams) {
      const location = dataLocation.find(
        (item) => item.label === locationParams,
      );
      setLocation(location || null);
      handleProvinceChange?.(location);
      form?.setFieldsValue({ location: location?.id || "all" });
    }
  }, [dataLocation?.length]);

  // lấy giá trị từ URL params khi component mount
  useEffect(() => {
    const keywordParams = searchParams.get("keyword") || "";
    const workingModelParams =
      searchParams.get("workingModel")?.split("-") || [];
    const levelParams = searchParams.get("level")?.split("-") || [];
    const domainParams = searchParams.get("domain")?.split("-") || [];
    const salaryMinParams = parseInt(searchParams.get("salaryMin") || "1") || 0;
    const salaryMaxParams =
      parseInt(searchParams.get("salaryMax") || "100000") || 100000;
    const pageParams = parseInt(searchParams.get("page") || "1") || 0;

    setSearchKeyword(keywordParams);
    setCurrentPage(pageParams);
    setFilters({
      level: levelParams,
      workingModel: workingModelParams,
      domain: domainParams,
      salaryRange: [salaryMinParams, salaryMaxParams],
    });
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      params.set("page", "1");
    }
    if (!searchParams.get("keyword")) {
      params.set("keyword", "");
    }
    router.replace(`${PATHS.JOBS}?${params.toString()}`);
  }, []);

  // khi mà ko có search nó sẽ reset form search
  useEffect(() => {
    if (!searchParams.get("location")) {
      form.resetFields();
    }
  }, [searchParams]);

  // ======= API CALL =======

  // job
  const { data: dataJob, isLoading: isLoadingJob } = useQuery<
    BasePageResponse<JobType>,
    Error
  >({
    queryKey: [
      "job",
      currentPage,
      searchKeyword,
      provinceData?.name,
      debouncedFilters,
    ],
    queryFn: () => {
      return JobServices.getAllJobFilter({
        keyword: searchKeyword.trim() || "",
        pageSize: pageSizeDefault || 9,
        pageNumber: currentPage || 1,
        provinceName: provinceData?.name || "",
        industryNames: filters.domain || [],
        jobLevelNames: filters.level || [],
        employmentTypeNames: filters.workingModel || [],
        salaryMin: filters.salaryRange[0] || 0,
        salaryMax: filters.salaryRange[1] || 100000,
      });
    },
  });

  // level
  const { data: dataLevelJob, isLoading: isLoadingLevelJob } = useQuery<
    JobLevelType[],
    Error
  >({
    queryKey: ["level-job"],
    queryFn: () => {
      return LevelJobService.getAllLevelJob();
    },
  });

  // working model
  const { data: dataEmploymentType, isLoading: isLoadingEmploymentType } =
    useQuery<EmploymentTypeType[], Error>({
      queryKey: ["employment-type"],
      queryFn: () => {
        return EmploymentTypeService.getAllEmploymentType();
      },
    });

  // industry
  const { data: dataIndustry, isLoading: isLoadingIndustry } = useQuery<
    IndustryType[],
    Error
  >({
    queryKey: ["industry"],
    queryFn: () => {
      return IndustryService.getAllIndustry();
    },
  });

  // Tự động select job đầu tiên khi load hoặc khi paginatedJobs thay đổi
  useEffect(() => {
    if (dataJob?.content && dataJob.content.length > 0) {
      setSelectedJob(dataJob.content[0]);
    } else {
      setSelectedJob(null);
    }
  }, [dataJob]);

  // ======= HANDLER FUNCTIONS =======

  // Search Handler
  const handleSearch = (values: { keyword?: string; location?: string }) => {
    setSearchKeyword(values.keyword || "");
    setCurrentPage(1);
    params.set("keyword", values.keyword || "");
    params.set("page", "1");
    router.replace(`${PATHS.JOBS}?${params.toString()}`);
  };

  // Level Filter
  const handleChangeLevelFilter = (selectedLevels: string[]) => {
    setFilters((prev) => ({
      ...prev,
      level: selectedLevels,
    }));
    setCurrentPage(1);
    const listLevel = selectedLevels.join("-");
    if (listLevel) {
      params.set("level", listLevel);
    } else {
      params.delete("level");
    }
    params.set("page", "1");
    router.replace(`${PATHS.JOBS}?${params.toString()}`);
  };

  // Working Model Filter
  const handleChangeWorkingModelFilter = (selectedWorkingModels: string[]) => {
    setFilters((prev) => ({
      ...prev,
      workingModel: selectedWorkingModels,
    }));
    setCurrentPage(1);
    const listWorkingModel = selectedWorkingModels.join("-");
    if (listWorkingModel) {
      params.set("workingModel", listWorkingModel);
    } else {
      params.delete("workingModel");
    }
    params.set("page", "1");
    router.replace(`${PATHS.JOBS}?${params.toString()}`);
  };

  // Domain Filter
  const handleChangeDomainFilter = (selectedDomains: string[]) => {
    setFilters((prev) => ({
      ...prev,
      domain: selectedDomains,
    }));
    setCurrentPage(1);
    const listDomain = selectedDomains.join("-");
    if (listDomain) {
      params.set("domain", listDomain);
    } else {
      params.delete("domain");
    }
    params.set("page", "1");
    router.replace(`${PATHS.JOBS}?${params.toString()}`);
  };

  // Debounce salary URL update — tránh spam router.replace và API khi kéo slider
  const debounceSalaryUrl = useDebouncedCallback(
    (salaryRange: [number, number]) => {
      setCurrentPage(1);
      const freshParams = new URLSearchParams(searchParams.toString());
      freshParams.set("salaryMin", salaryRange[0].toString());
      freshParams.set("salaryMax", salaryRange[1].toString());
      freshParams.set("page", "1");
      router.replace(`${PATHS.JOBS}?${freshParams.toString()}`);
    },
    500,
  );

  // Salary Range Filter
  const handleChangeSalaryRangeFilter = (salaryRange: [number, number]) => {
    setFilters((prev) => ({ ...prev, salaryRange }));
    debounceSalaryUrl(salaryRange);
  };

  // change location
  const handleChangeLocation = (provinces: ProvinceOption | undefined) => {
    handleProvinceChange?.(provinces);
    setCurrentPage(1);
    if (provinces && provinces.label) {
      params.set("location", provinces.label);
    } else {
      params.delete("location");
    }
    params.set("page", "1");
    router.replace(`${PATHS.JOBS}?${params.toString()}`);
  };

  // change page
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    params.set("page", page.toString());
    router.replace(`${PATHS.JOBS}?${params.toString()}`);
  };

  // handle reset
  const handleReset = () => {
    if (
      params.size > 2 ||
      searchParams.get("keyword") !== "" ||
      searchParams.get("page") !== "1"
    ) {
      setSearchKeyword("");
      setFilters((prev) => {
        return {
          level: [] as string[],
          workingModel: [] as string[],
          domain: [] as string[],
          salaryRange: [SALARY_MIN, SALARY_MAX] as [number, number],
        };
      });
      if (dataJob?.content && dataJob.content.length > 0) {
        setSelectedJob(dataJob.content[0]);
      } else {
        setSelectedJob(null);
      }
      setCurrentPage(1);
      setLocation(null);
      handleProvinceChange?.(undefined);
      form?.resetFields();
      const resetParams = new URLSearchParams();
      resetParams.set("page", "1");
      resetParams.set("keyword", "");
      router.replace(`${PATHS.JOBS}?${resetParams.toString()}`);
    }
  };

  return (
    <Container className="min-h-screen bg-primary-50">
      {/* Search Section at Top */}
      <div className="bg-white border-b border-primary-100 py-8  px-6">
        <SearchBar
          onFinish={handleSearch}
          locations={dataLocation || []}
          onChangeLocation={handleChangeLocation}
          defaultValuesSearch={searchParams.get("keyword") || ""}
          defaultValuesLocation={location?.id}
          form={form}
        />
      </div>

      {/* Company Highlight */}
      {/* <CompanyHighlight /> */}

      <div className="!py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {searchKeyword ? (
              <>
                <span>{dataJob?.content.length}</span>{" "}
                <span className="text-red-600">{searchKeyword}</span> jobs in
                Vietnam
              </>
            ) : (
              <>
                Tìm việc làm <span className="text-primary-600">IT</span>
              </>
            )}
          </h1>
        </motion.div>

        {/* Filter Buttons Row */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex mb-6 gap-2 justify-between items-center w-full"
        >
          <div className="flex flex-wrap gap-2 flex-wrap items-center">
            <CheckboxDropdown
              label="Level"
              values={filters.level}
              options={
                dataLevelJob?.map((level) => {
                  return { label: level.name, value: level.name };
                }) || []
              }
              onChange={(v) => handleChangeLevelFilter(v)}
            />

            <CheckboxDropdown
              label="Working Model"
              values={filters.workingModel}
              options={
                dataEmploymentType?.map((employmentType) => {
                  return {
                    label: employmentType.name,
                    value: employmentType.name,
                  };
                }) || []
              }
              onChange={(v) => handleChangeWorkingModelFilter(v)}
            />

            <SalarySliderDropdown
              value={filters.salaryRange}
              onChange={(v) => handleChangeSalaryRangeFilter(v)}
              min={SALARY_MIN}
              max={SALARY_MAX}
            />

            <CheckboxDropdown
              label="Job Domain"
              values={filters.domain}
              options={
                dataIndustry?.map((industry) => {
                  return { label: industry.name, value: industry.name };
                }) || []
              }
              onChange={(v) => handleChangeDomainFilter(v)}
            />
          </div>
          <UIButton
            variantCustom="accent"
            size="large"
            icon={<ReloadOutlined />}
            onClick={() => {
              handleReset();
            }}
            className="!h-[48px] !rounded-xl"
          >
            Đặt lại
          </UIButton>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Jobs List - Left Side */}
          <div
            className={`${
              selectedJob ? "lg:w-3/7" : "lg:w-full"
            } transition-all duration-300`}
          >
            {(dataJob?.content || []).length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {dataJob?.content.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => setSelectedJob(job)}
                      className="cursor-pointer"
                    >
                      <JobListCard
                        job={job}
                        isSelected={selectedJob?.id === job.id}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <PaginationComponent
                  current={currentPage}
                  total={dataJob?.totalElements || 0}
                  pageSize={pageSizeDefault}
                  onChange={(page) => {
                    handleChangePage(page);
                  }}
                  showSizeChanger={false}
                  showQuickJumper
                  className="mt-8"
                />
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy việc làm phù hợp
                </h3>
                <p className="text-gray-600 mb-6">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn
                </p>
                <Button
                  type="primary"
                  onClick={handleReset}
                  className="!rounded-xl"
                >
                  Đặt lại bộ lọc
                </Button>
              </div>
            )}
          </div>

          {/* Job Detail - Right Side */}
          <div
            className={`${
              selectedJob ? "lg:w-4/7" : "lg:hidden"
            } transition-all duration-300`}
          >
            <JobDetail job={selectedJob} />
          </div>
        </div>
      </div>
    </Container>
  );
}
