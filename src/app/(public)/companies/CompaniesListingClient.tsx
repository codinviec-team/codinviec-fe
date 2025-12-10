"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Button, Select} from "antd";
import {BuildOutlined, EnvironmentOutlined, ReloadOutlined,} from "@ant-design/icons";
import Container from "@/components/ui/Container";
import SearchBar from "@/components/ui/SearchBar";
import CompanyCard from "./components/CompanyCard";
import PaginationComponent from "@/components/ui/Pagination";

export type Company = {
  id: number;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  country: string;
  type: string;
  jobCount: number;
  description: string;
  isHot?: boolean;
  isFeatured?: boolean;
};

// Demo data
const demoCompanies: Company[] = [
  {
    id: 1,
    name: "FPT Software",
    slug: "fpt-software",
    logo: "https://placehold.co/120x60/6b46c1/ffffff?text=FPT",
    industry: "Software Outsourcing",
    size: "5,000 - 10,000",
    location: "Hà Nội, Hồ Chí Minh, Đà Nẵng",
    country: "Vietnam",
    type: "Product & Service",
    jobCount: 45,
    description: "FPT Software là công ty phần mềm hàng đầu Việt Nam với hơn 30 năm kinh nghiệm.",
    isHot: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "VNG Corporation",
    slug: "vng-corporation",
    logo: "https://placehold.co/120x60/4db6ac/ffffff?text=VNG",
    industry: "Internet/Technology",
    size: "1,000 - 5,000",
    location: "Hồ Chí Minh",
    country: "Vietnam",
    type: "Product",
    jobCount: 32,
    description: "VNG là công ty công nghệ hàng đầu với các sản phẩm như Zalo, Zing MP3.",
    isHot: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Tiki Corporation",
    slug: "tiki-corporation",
    logo: "https://placehold.co/120x60/f59e0b/ffffff?text=Tiki",
    industry: "E-commerce",
    size: "1,000 - 5,000",
    location: "Hồ Chí Minh",
    country: "Vietnam",
    type: "Product",
    jobCount: 25,
    description: "Tiki là nền tảng thương mại điện tử hàng đầu Việt Nam.",
    isFeatured: true,
  },
  {
    id: 4,
    name: "Shopee Vietnam",
    slug: "shopee-vietnam",
    logo: "https://placehold.co/120x60/ef4444/ffffff?text=Shopee",
    industry: "E-commerce",
    size: "500 - 1,000",
    location: "Hồ Chí Minh",
    country: "Vietnam",
    type: "Product",
    jobCount: 38,
    description: "Shopee là nền tảng thương mại điện tử hàng đầu Đông Nam Á.",
    isHot: true,
  },
  {
    id: 5,
    name: "MoMo",
    slug: "momo",
    logo: "https://placehold.co/120x60/ec4899/ffffff?text=MoMo",
    industry: "Fintech",
    size: "500 - 1,000",
    location: "Hồ Chí Minh",
    country: "Vietnam",
    type: "Product",
    jobCount: 22,
    description: "MoMo là ví điện tử và nền tảng thanh toán số hàng đầu Việt Nam.",
  },
  {
    id: 6,
    name: "VinAI",
    slug: "vinai",
    logo: "https://placehold.co/120x60/8b5cf6/ffffff?text=VinAI",
    industry: "AI/ML",
    size: "100 - 500",
    location: "Hà Nội",
    country: "Vietnam",
    type: "Product & Service",
    jobCount: 18,
    description: "VinAI là công ty nghiên cứu và phát triển AI hàng đầu Việt Nam.",
    isHot: true,
  },
  {
    id: 7,
    name: "Viettel Solutions",
    slug: "viettel-solutions",
    logo: "https://placehold.co/120x60/10b981/ffffff?text=Viettel",
    industry: "Telecom/IT Services",
    size: "1,000 - 5,000",
    location: "Hà Nội",
    country: "Vietnam",
    type: "Service",
    jobCount: 28,
    description: "Viettel Solutions cung cấp giải pháp công nghệ thông tin và viễn thông.",
  },
  {
    id: 8,
    name: "Grab Vietnam",
    slug: "grab-vietnam",
    logo: "https://placehold.co/120x60/06b6d4/ffffff?text=Grab",
    industry: "Transportation/Tech",
    size: "1,000 - 5,000",
    location: "Hồ Chí Minh",
    country: "Vietnam",
    type: "Product",
    jobCount: 35,
    description: "Grab là nền tảng công nghệ đa dịch vụ hàng đầu Đông Nam Á.",
    isHot: true,
  },
  {
    id: 9,
    name: "Lazada Vietnam",
    slug: "lazada-vietnam",
    logo: "https://placehold.co/120x60/3b82f6/ffffff?text=Lazada",
    industry: "E-commerce",
    size: "500 - 1,000",
    location: "Hồ Chí Minh",
    country: "Vietnam",
    type: "Product",
    jobCount: 20,
    description: "Lazada là nền tảng thương mại điện tử hàng đầu tại Việt Nam.",
  },
  {
    id: 10,
    name: "CMC Corporation",
    slug: "cmc-corporation",
    logo: "https://placehold.co/120x60/14b8a6/ffffff?text=CMC",
    industry: "IT Services",
    size: "1,000 - 5,000",
    location: "Hà Nội",
    country: "Vietnam",
    type: "Service",
    jobCount: 30,
    description: "CMC là tập đoàn công nghệ thông tin hàng đầu Việt Nam.",
  },
  {
    id: 11,
    name: "Kyber Network",
    slug: "kyber-network",
    logo: "https://placehold.co/120x60/f97316/ffffff?text=Kyber",
    industry: "Blockchain",
    size: "50 - 100",
    location: "Hồ Chí Minh",
    country: "Vietnam",
    type: "Product",
    jobCount: 12,
    description: "Kyber Network là giao thức thanh khoản on-chain hàng đầu.",
  },
  {
    id: 12,
    name: "NEC Vietnam",
    slug: "nec-vietnam",
    logo: "https://placehold.co/120x60/1e40af/ffffff?text=NEC",
    industry: "IT Services",
    size: "500 - 1,000",
    location: "Hồ Chí Minh, Hà Nội",
    country: "Vietnam",
    type: "Service",
    jobCount: 15,
    description: "NEC Vietnam là một trong những công ty ICT Nhật Bản hàng đầu tại Việt Nam.",
    isFeatured: true,
  },
];

const industries = [
  { value: "all", label: "Tất cả ngành" },
  { value: "Software Outsourcing", label: "Software Outsourcing" },
  { value: "Internet/Technology", label: "Internet/Technology" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Fintech", label: "Fintech" },
  { value: "AI/ML", label: "AI/ML" },
  { value: "Blockchain", label: "Blockchain" },
];

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

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "jobCount_desc", label: "Nhiều việc làm nhất" },
  { value: "name_asc", label: "Tên A-Z" },
];

export default function CompaniesListingClient() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
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

  // Filter companies
  const filteredCompanies = demoCompanies.filter((company) => {
    if (searchKeyword && !company.name.toLowerCase().includes(searchKeyword.toLowerCase()) && 
        !company.description.toLowerCase().includes(searchKeyword.toLowerCase())) {
      return false;
    }
    if (selectedIndustry !== "all" && company.industry !== selectedIndustry) {
      return false;
    }
    if (selectedSize !== "all" && company.size !== selectedSize) {
      return false;
    }
    return !(selectedLocation !== "all" && !company.location.includes(selectedLocation));

  });

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === "newest") return 0;
    if (sortBy === "jobCount_desc") {
      return b.jobCount - a.jobCount;
    }
    if (sortBy === "name_asc") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const paginatedCompanies = sortedCompanies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleReset = () => {
    setSearchKeyword("");
    setSelectedIndustry("all");
    setSelectedSize("all");
    setSelectedLocation("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Search Section at Top */}
      <div className="bg-white border-b border-primary-100 py-8">
        <Container className="!py-0">
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
            Tìm thấy <strong>{filteredCompanies.length}</strong> công ty phù hợp
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-primary-100 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <Select
              size="large"
              placeholder="Ngành nghề"
              value={selectedIndustry}
              onChange={setSelectedIndustry}
              options={industries}
              className="lg:w-[200px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
            />

            <Select
              size="large"
              placeholder="Quy mô"
              value={selectedSize}
              onChange={setSelectedSize}
              options={sizes}
              className="lg:w-[200px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
            />

            <Select
              size="large"
              placeholder="Địa điểm"
              value={selectedLocation}
              onChange={setSelectedLocation}
              options={locations}
              suffixIcon={<EnvironmentOutlined className="text-primary-400" />}
              className="lg:w-[200px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
            />

            <Select
              size="large"
              placeholder="Sắp xếp"
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              className="lg:w-[180px] !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl"
            />

            <div className="flex-1" />

            <Button
              size="large"
              icon={<ReloadOutlined />}
              onClick={handleReset}
              className="!h-[48px] !rounded-xl"
            >
              Đặt lại
            </Button>
          </div>
        </motion.div>

        {/* Companies Grid */}
        {paginatedCompanies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CompanyCard company={company} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
                <PaginationComponent
              current={currentPage}
              total={filteredCompanies.length}
              pageSize={pageSize}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy công ty phù hợp
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
      </Container>
    </div>
  );
}

