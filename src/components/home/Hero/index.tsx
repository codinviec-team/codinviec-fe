"use client";

import { Form, Input, Select } from "antd";
import { UiButton } from "@/components/ui/base/UiButton";
import { motion } from "framer-motion";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";

const locations = [
  { value: "all", label: "Tất cả thành phố" },
  { value: "hanoi", label: "Hà Nội" },
  { value: "hcm", label: "Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  { value: "other", label: "Khác" },
];

const popularKeywords = [
  "ReactJS",
  "NodeJS",
  "Python",
  "Java",
  "DevOps",
  "Fullstack",
  "Mobile",
  "AI/ML",
];

export default function HeroSection() {
  const handleSearch = (values: { keyword?: string; location?: string }) => {
    console.log("Search:", values);
  };

  return (
    <section className="relative bg-brand-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-64 h-64 bg-secondary-400 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:pt-24 lg:pb-36">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Tìm kiếm việc làm{" "}
            <span className="text-accent">IT hàng đầu</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg lg:text-xl text-primary-200 mb-8 max-w-2xl mx-auto"
          >
            Kết nối với hơn 1,000+ công ty hàng đầu và tìm công việc IT mơ ước của bạn
          </motion.p>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl max-w-3xl mx-auto"
          >
            <Form
              onFinish={handleSearch}
              className="flex flex-col md:flex-row gap-3"
              layout="vertical"
            >
              <Form.Item name="keyword" className="flex-1 !mb-0">
                <Input
                  size="large"
                  placeholder="Nhập từ khóa, vị trí, công ty..."
                  prefix={
                    <SearchOutlined className="text-primary-400 text-lg mr-2" />
                  }
                  className="!h-[52px] !text-base !rounded-xl !border-primary-200 hover:!border-primary-400 focus:!border-primary-500"
                />
              </Form.Item>

              <Form.Item name="location" className="md:w-[200px] !mb-0">
                <Select
                  size="large"
                  placeholder="Địa điểm"
                  options={locations}
                  defaultValue="all"
                  suffixIcon={
                    <EnvironmentOutlined className="text-primary-400" />
                  }
                  className="!h-[52px] w-full [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border-primary-200 [&_.ant-select-selection-item]:!leading-[52px]"
                />
              </Form.Item>

              <Form.Item className="!mb-0">
                <UiButton
                  htmlType="submit"
                  variantCustom="accent"
                  className="!h-[52px] !px-8 !text-base !font-bold"
                >
                  <SearchOutlined className="mr-1" />
                  Tìm việc
                </UiButton>
              </Form.Item>
            </Form>
          </motion.div>

          {/* Popular Keywords */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            <span className="text-primary-300 text-sm mr-2">Phổ biến:</span>
            {popularKeywords.map((keyword) => (
              <button
                key={keyword}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
              >
                {keyword}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "5,000+", label: "Việc làm IT" },
              { number: "1,200+", label: "Công ty tuyển dụng" },
              { number: "50,000+", label: "Ứng viên" },
              { number: "95%", label: "Tỷ lệ hài lòng" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <div className="text-2xl lg:text-3xl font-bold text-accent">
                  {stat.number}
                </div>
                <div className="text-sm text-primary-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-[1px] left-0 right-0 ">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f1ecfa"
          />
        </svg>
      </div>
    </section>
  );
}

