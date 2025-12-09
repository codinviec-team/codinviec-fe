"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import {
  FilterOutlined,
} from "@ant-design/icons";
import ContainerPage from "@/components/ui/container/page";
import FilterModal from "./components/FilterModal";
import JobListCard from "./components/JobListCard";
import JobDetail from "./components/JobDetail";
import CompanyHighlight from "./components/CompanyHighlight";
import MyPagination from "@/components/ui/MyPagination/page";
import SearchCustom from "@/components/ui/SearchCustom/page";
import { Job } from "@/components/home/FeaturedJobs/JobCard";

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


export default function JobsListingClient() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter và sort jobs (demo logic)
  const filteredJobs = demoJobs.filter((job) => {
    if (searchKeyword && !job.title.toLowerCase().includes(searchKeyword.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchKeyword.toLowerCase())) {
      return false;
    }
    return !(selectedLocation !== "all" && job.location !== selectedLocation);

  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "newest") return 0; // Giữ nguyên thứ tự
    if (sortBy === "salary_desc") {
      const aSalary = parseInt(a.salary.split(" - ")[0]);
      const bSalary = parseInt(b.salary.split(" - ")[0]);
      return bSalary - aSalary;
    }
    if (sortBy === "salary_asc") {
      const aSalary = parseInt(a.salary.split(" - ")[0]);
      const bSalary = parseInt(b.salary.split(" - ")[0]);
      return aSalary - bSalary;
    }
    return 0;
  });

  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Tự động select job đầu tiên khi load hoặc khi paginatedJobs thay đổi
  useEffect(() => {
    if (paginatedJobs.length > 0) {
      if (!selectedJob) {
        // Nếu chưa có job nào được chọn, chọn job đầu tiên
        setSelectedJob(paginatedJobs[0]);
      } else {
        // Kiểm tra xem selectedJob có còn trong paginatedJobs không
        const isJobInCurrentPage = paginatedJobs.some(job => job.id === selectedJob.id);
        if (!isJobInCurrentPage) {
          // Nếu job đã chọn không còn trong trang hiện tại, chọn job đầu tiên
          setSelectedJob(paginatedJobs[0]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginatedJobs]);

  const handleReset = () => {
    setSearchKeyword("");
    setSelectedLocation("all");
    setSortBy("newest");
    setCurrentPage(1);
    setSelectedJob(null);
  };

  const handleSearch = (values: { keyword?: string; location?: string }) => {
    if (values.keyword) {
      setSearchKeyword(values.keyword);
    }
    if (values.location) {
      setSelectedLocation(values.location);
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Search Section at Top */}
      <div className="bg-white border-b border-primary-100 py-8">
        <ContainerPage className="!py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SearchCustom onFinish={handleSearch} />
          </motion.div>
        </ContainerPage>
      </div>

      {/* Company Highlight */}
      <CompanyHighlight />

      <ContainerPage className="!py-8">
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
                <span>{filteredJobs.length}</span>{" "}
                <span className="text-red-600">{searchKeyword}</span> jobs in Vietnam
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
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Button
            size="large"
            className="!h-10 !px-4 !rounded-lg !border-primary-200 hover:!border-primary-400"
            icon={<FilterOutlined />}
          >
            Level
          </Button>
          <Button
            size="large"
            className="!h-10 !px-4 !rounded-lg !border-primary-200 hover:!border-primary-400"
            icon={<FilterOutlined />}
          >
            Working Model
          </Button>
          <Button
            size="large"
            className="!h-10 !px-4 !rounded-lg !border-primary-200 hover:!border-primary-400"
            icon={<FilterOutlined />}
          >
            Salary
          </Button>
          <Button
            size="large"
            className="!h-10 !px-4 !rounded-lg !border-primary-200 hover:!border-primary-400"
            icon={<FilterOutlined />}
          >
            Job Domain
          </Button>
          <div className="flex-1" />
          <Button
            size="large"
            icon={<FilterOutlined />}
            onClick={() => setShowFilterModal(true)}
            className="!h-10 !px-4 !rounded-lg"
          >
            Filter
          </Button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Jobs List - Left Side */}
          <div className={`${selectedJob ? "lg:w-1/2" : "lg:w-full"} transition-all duration-300`}>
            {paginatedJobs.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {paginatedJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => setSelectedJob(job)}
                      className="cursor-pointer"
                    >
                      <JobListCard job={job} isSelected={selectedJob?.id === job.id} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <MyPagination
                  current={currentPage}
                  total={filteredJobs.length}
                  pageSize={pageSize}
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
          <div className={`${selectedJob ? "lg:w-1/2" : "lg:hidden"} transition-all duration-300`}>
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
      </ContainerPage>
    </div>
  );
}

