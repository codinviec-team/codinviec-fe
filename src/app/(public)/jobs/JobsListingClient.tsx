"use client";

import { Job } from "@/components/home/HomePage/FeaturedJobs/JobCard";
import Container from "@/components/ui/Container";
import PaginationComponent from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import JobServices from "@/services/home/job/JobServices";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { JobType } from "@/types/home/job/JobType";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CompanyHighlight from "./components/CompanyHighlight";
import FilterModal from "./components/FilterModal";
import JobDetail from "./components/JobDetail";
import JobListCard from "./components/JobListCard";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import DropdownButtonCustomer from "@/components/ui/CheckboxDropdown";
import CheckboxDropdown from "@/components/ui/CheckboxDropdown";
import SalarySliderDropdown from "@/components/ui/SalarySliderDropdown ";
import { ProvinceType } from "@/types/common/ProvinceType";
import ProvinceService from "@/services/common/ProvinceService";
import useLocation from "@/hooks/Common/location/useLocation";
import LevelJobService from "@/services/common/LevelJobService";
import { JobLevelType } from "@/types/common/JobLevelType";
import EmploymentTypeService from "@/services/common/EmploymentTypeService";
import { EmploymentTypeType } from "@/types/common/EmploymentType";
import { IndustryType } from "@/types/common/IndustryType";
import IndustryService from "@/services/common/IndustryService";
import { useDebounce } from "use-debounce";
import { UIButton } from "@/components/ui/UIButton";

// Demo data - tương tự itviec
const demoJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer (ReactJS, TypeScript)",
    company: "FPT Software",
    companyLogo: "https://placehold.co/100x100/6b46c1/ffffff?text=FPT",
    location: "Hà Nội",
    salary: "25 - 40 triệu",
    postedAt: "Đăng 2 ngày trước",
    tags: ["ReactJS", "TypeScript", "TailwindCSS", "Next.js"],
    isSuperHot: true,
  },
  {
    id: 2,
    title: "Backend Developer (NodeJS/Python) - Remote",
    company: "VNG Corporation",
    companyLogo: "https://placehold.co/100x100/4db6ac/ffffff?text=VNG",
    location: "Hồ Chí Minh",
    salary: "30 - 50 triệu",
    postedAt: "Đăng 1 ngày trước",
    tags: ["NodeJS", "Python", "MongoDB", "Redis"],
    isUrgent: true,
  },
  {
    id: 3,
    title: "Fullstack Developer (MERN Stack)",
    company: "Tiki Corporation",
    companyLogo: "https://placehold.co/100x100/f59e0b/ffffff?text=Tiki",
    location: "Hồ Chí Minh",
    salary: "28 - 45 triệu",
    postedAt: "Đăng 3 ngày trước",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    isHot: true,
  },
  {
    id: 4,
    title: "DevOps Engineer (AWS/Kubernetes/Docker)",
    company: "Shopee Vietnam",
    companyLogo: "https://placehold.co/100x100/ef4444/ffffff?text=Shopee",
    location: "Hồ Chí Minh",
    salary: "35 - 55 triệu",
    postedAt: "Đăng 1 ngày trước",
    tags: ["AWS", "Kubernetes", "Docker", "CI/CD", "Terraform"],
  },
  {
    id: 5,
    title: "Mobile Developer (React Native/Flutter)",
    company: "MoMo",
    companyLogo: "https://placehold.co/100x100/ec4899/ffffff?text=MoMo",
    location: "Hồ Chí Minh",
    salary: "25 - 40 triệu",
    postedAt: "Đăng 4 ngày trước",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    id: 6,
    title: "AI/ML Engineer (Computer Vision, NLP)",
    company: "VinAI",
    companyLogo: "https://placehold.co/100x100/8b5cf6/ffffff?text=VinAI",
    location: "Hà Nội",
    salary: "40 - 70 triệu",
    postedAt: "Đăng 2 ngày trước",
    tags: ["Python", "TensorFlow", "PyTorch", "Computer Vision"],
    isSuperHot: true,
    isUrgent: true,
  },
  {
    id: 7,
    title: "Java Developer (Spring Boot, Microservices)",
    company: "Viettel Solutions",
    companyLogo: "https://placehold.co/100x100/10b981/ffffff?text=Viettel",
    location: "Hà Nội",
    salary: "20 - 35 triệu",
    postedAt: "Đăng 5 ngày trước",
    tags: ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
  },
  {
    id: 8,
    title: "QA Engineer (Automation Testing)",
    company: "Grab Vietnam",
    companyLogo: "https://placehold.co/100x100/06b6d4/ffffff?text=Grab",
    location: "Hồ Chí Minh",
    salary: "18 - 30 triệu",
    postedAt: "Đăng 3 ngày trước",
    tags: ["Selenium", "Cypress", "Jest", "API Testing"],
  },
  {
    id: 9,
    title: "Data Engineer (Spark, Kafka, Airflow)",
    company: "Lazada Vietnam",
    companyLogo: "https://placehold.co/100x100/3b82f6/ffffff?text=Lazada",
    location: "Hồ Chí Minh",
    salary: "30 - 50 triệu",
    postedAt: "Đăng 1 ngày trước",
    tags: ["Spark", "Kafka", "Airflow", "Python", "SQL"],
    isHot: true,
  },
  {
    id: 10,
    title: "UI/UX Designer (Figma, Design System)",
    company: "Be Group",
    companyLogo: "https://placehold.co/100x100/8b5cf6/ffffff?text=Be",
    location: "Hồ Chí Minh",
    salary: "15 - 25 triệu",
    postedAt: "Đăng 6 ngày trước",
    tags: ["Figma", "Design System", "Prototyping", "User Research"],
  },
  {
    id: 11,
    title: "Cloud Architect (AWS/Azure/GCP)",
    company: "CMC Corporation",
    companyLogo: "https://placehold.co/100x100/14b8a6/ffffff?text=CMC",
    location: "Hà Nội",
    salary: "45 - 80 triệu",
    postedAt: "Đăng 2 ngày trước",
    tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
    isUrgent: true,
  },
  {
    id: 12,
    title: "Blockchain Developer (Solidity, Web3)",
    company: "Kyber Network",
    companyLogo: "https://placehold.co/100x100/f97316/ffffff?text=Kyber",
    location: "Hồ Chí Minh",
    salary: "35 - 60 triệu",
    postedAt: "Đăng 4 ngày trước",
    tags: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
  },
];

const LEVEL_OPTIONS = ["Intern", "Fresher", "Junior", "Senior", "Leader"];

const WORKING_MODEL_OPTIONS = ["Onsite", "Remote", "Hybrid"];

const SALARY_OPTIONS = [
  "Dưới 10 triệu",
  "10 – 20 triệu",
  "20 – 30 triệu",
  "Trên 30 triệu",
];

const DOMAIN_OPTIONS = ["Backend", "Frontend", "Fullstack", "Mobile", "DevOps"];

const SALARY_MIN = 0;
const SALARY_MAX = 100000;
const pageSizeDefault = 9;
export default function JobsListingClient() {
  // ======= GENERAL =======
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    level: [] as string[],
    workingModel: [] as string[],
    domain: [] as string[],
    salaryRange: [SALARY_MIN, SALARY_MAX] as [number, number],
  });

  // useDebounce
  const debouncedFilters = useDebounce(filters, 500);
  // ======= API CALL =======

  // location
  const { dataLocation, provinceData, handleProvinceChange } = useLocation();

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
        industryNames: filters?.domain || [],
        jobLevelNames: filters?.level || [],
        employmentTypeNames: filters?.workingModel || [],
        salaryMin: filters?.salaryRange ? filters.salaryRange[0] : 0,
        salaryMax: filters?.salaryRange ? filters.salaryRange[1] : 100000,
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

  // ====== CONSOLE LOG & DATA PROCESSING =======
  // console.log("dataIndustry", dataIndustry);
  // console.log("dataEmploymentType", dataEmploymentType);
  // console.log("dataLevelJob", dataLevelJob);
  // console.log("object", dataJob);
  // console.log("filters", filters);
  // console.log("dataLo", dataLocation);

  // Tự động select job đầu tiên khi load hoặc khi paginatedJobs thay đổi
  useEffect(() => {
    if (dataJob?.content && dataJob.content.length > 0) {
      setSelectedJob(dataJob.content[0]);
    }
  }, [dataJob]);

  const handleReset = () => {
    setSearchKeyword("");
    setFilters((prev) => {
      return {
        level: [] as string[],
        workingModel: [] as string[],
        domain: [] as string[],
        salaryRange: [SALARY_MIN, SALARY_MAX] as [number, number],
      };
    });
    setCurrentPage(1);
    if (dataJob?.content && dataJob.content.length > 0) {
      setSelectedJob(dataJob.content[0]);
    } else {
      setSelectedJob(null);
    }
  };

  const handleSearch = (values: { keyword?: string; location?: string }) => {
    if (values.keyword) {
      setSearchKeyword(values.keyword);
    }
    setCurrentPage(1);
  };

  return (
    <Container className="min-h-screen bg-primary-50">
      {/* Search Section at Top */}
      <div className="bg-white border-b border-primary-100 py-8  px-6">
        <SearchBar
          onFinish={handleSearch}
          locations={dataLocation || []}
          onChangeLocation={handleProvinceChange}
        />
      </div>

      {/* Company Highlight */}
      <CompanyHighlight />

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
              onChange={(v) => setFilters((p) => ({ ...p, level: v }))}
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
              onChange={(v) => setFilters((p) => ({ ...p, workingModel: v }))}
            />

            <SalarySliderDropdown
              value={filters.salaryRange}
              onChange={(v) => setFilters((p) => ({ ...p, salaryRange: v }))}
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
              onChange={(v) => setFilters((p) => ({ ...p, domain: v }))}
            />
          </div>
          <UIButton
            variantCustom="accent"
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleReset}
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
                    setCurrentPage(page);
                    setSelectedJob(null);
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

        {/* Filter Modal */}
        <FilterModal
          open={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={() => {
            // Apply filters logic here
            setShowFilterModal(false);
          }}
        />
      </div>
    </Container>
  );
}
