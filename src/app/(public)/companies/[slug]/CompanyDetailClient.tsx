"use client";

import Container from "@/components/Container";
import CustomBadge from "@/components/CustomBadge";
import LoadingCustom from "@/components/LoadingCustom";
import { PATHS } from "@/constants/paths";
import CompanyServices from "@/services/CompanyServices";
import JobServices from "@/services/JobServices";
import { BadgeVariant } from "@/types/BadgeType";
import { CompanyAddress, CompanyType } from "@/types/CompanyType";
import { JobType } from "@/types/home/job/JobType";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  RocketOutlined,
  ShareAltOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Tabs } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import JobListCard from "../../jobs/components/JobListCard";

// Demo data

type CompanyDetailClientProps = {
  slug: string;
};

export default function CompanyDetailClient({
  slug,
}: CompanyDetailClientProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // companies data
  const { data: dataComapny, isLoading: isLoadingComapny } = useQuery<
    CompanyType,
    Error
  >({
    queryKey: ["company"],
    queryFn: () => {
      return CompanyServices.getCompanyById(slug || "");
    },
  });

  const { data: dataJobs, isLoading: isLoadingJobs } = useQuery<
    JobType[],
    Error
  >({
    queryKey: ["jobs"],
    queryFn: () => {
      return JobServices.getJobByIdCompany(slug || "");
    },
  });

  const loadingPage = isLoadingComapny || isLoadingJobs;

  if (loadingPage) {
    return (
      <Container>
        <LoadingCustom />
      </Container>
    );
  }

  if (!dataComapny && !loadingPage) {
    return (
      <Container className="!py-16">
        <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy công ty
          </h2>
          <p className="text-gray-600 mb-6">
            Công ty bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push(PATHS.COMPANIES)}
            className="!rounded-xl"
          >
            Quay lại danh sách công ty
          </Button>
        </div>
      </Container>
    );
  }

  const tabItems = [
    {
      key: "overview",
      label: "Tổng quan",
    },
    {
      key: "jobs",
      label: `Việc làm (${dataJobs?.length || 0})`,
    },
    {
      key: "benefits",
      label: "Lợi ích",
    },
  ];

  const headOfficeCompany =
    dataComapny?.companyAddress?.find(
      (address: CompanyAddress) => address.headOffice === true,
    ) || dataComapny?.companyAddress[0];

  return (
    <Container className="!py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push(PATHS.COMPANIES)}
          className="!rounded-xl"
        >
          Quay lại
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Company Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-primary-100 p-8 mb-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-6 flex-1">
                <div className="w-24 h-24 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={dataComapny?.logo || "/defaultCompanyLogo.webp"}
                    alt={dataComapny?.name || ""}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {dataComapny?.name || ""}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <EnvironmentOutlined className="text-primary-400" />
                      <span>{headOfficeCompany?.province?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TeamOutlined className="text-primary-400" />
                      <span>
                        {dataComapny?.companySize?.minEmployees || 0} -{" "}
                        {dataComapny?.companySize?.maxEmployees || 0} nhân viên
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GlobalOutlined className="text-primary-400" />
                      <a href={dataComapny?.website || ""} target="_blank">
                        {dataComapny?.website || ""}
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dataComapny?.statusSpecials &&
                      dataComapny?.statusSpecials.map((item) => {
                        if (!item?.title || item?.title === "spotlight")
                          return "";
                        return (
                          <CustomBadge
                            key={item.id}
                            variant={item?.title as BadgeVariant}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                  aria-label={isSaved ? "Bỏ lưu" : "Lưu công ty"}
                >
                  {isSaved ? (
                    <HeartFilled className="text-xl text-red-500" />
                  ) : (
                    <HeartOutlined className="text-xl text-gray-400 hover:text-red-500" />
                  )}
                </button>
                <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
                  <ShareAltOutlined className="text-xl text-gray-400 hover:text-primary-600" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              className="[&_.ant-tabs-tab]:!text-base [&_.ant-tabs-tab]:!font-medium [&_.ant-tabs-tab-active]:!text-primary-600 [&_.ant-tabs-ink-bar]:!bg-primary-600"
            />
          </motion.div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-primary-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Giới thiệu công ty
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                <p>{dataComapny?.description || ""}</p>
                <p>
                  {dataComapny?.name || ""} là một trong những công ty công nghệ
                  hàng đầu tại Việt Nam, chuyên cung cấp các giải pháp phần mềm
                  và dịch vụ công nghệ thông tin chất lượng cao. Với đội ngũ
                  nhân viên tài năng và môi trường làm việc năng động, chúng tôi
                  luôn tạo điều kiện tốt nhất cho nhân viên phát triển sự
                  nghiệp.
                </p>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sứ mệnh</h3>
                  <p>
                    Chúng tôi cam kết mang đến những giải pháp công nghệ tiên
                    tiến nhất, góp phần phát triển ngành công nghệ thông tin
                    Việt Nam và khu vực.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tầm nhìn</h3>
                  <p>
                    Trở thành công ty công nghệ hàng đầu khu vực, được công nhận
                    về chất lượng sản phẩm và dịch vụ, cũng như môi trường làm
                    việc tốt nhất cho nhân viên.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "jobs" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {dataJobs && dataJobs?.length > 0 ? (
                dataJobs.map((job) => (
                  <div key={job.id} className="cursor-pointer">
                    <JobListCard job={job} />
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
                  <div className="text-6xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Hiện chưa có việc làm
                  </h3>
                  <p className="text-gray-600">
                    Công ty này hiện chưa có vị trí tuyển dụng nào.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "benefits" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-primary-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Lý do yêu thích làm việc tại {dataComapny?.name || ""}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <DollarOutlined className="text-2xl" />,
                    title: "Lương thưởng cạnh tranh",
                    description:
                      "Mức lương và thưởng hấp dẫn, đánh giá theo năng lực và đóng góp.",
                  },
                  {
                    icon: <TrophyOutlined className="text-2xl" />,
                    title: "Cơ hội phát triển",
                    description:
                      "Chương trình đào tạo và phát triển nghề nghiệp rõ ràng, cơ hội thăng tiến.",
                  },
                  {
                    icon: <RocketOutlined className="text-2xl" />,
                    title: "Môi trường năng động",
                    description:
                      "Làm việc với các công nghệ mới nhất, dự án thú vị và đội ngũ chuyên nghiệp.",
                  },
                  {
                    icon: <CheckCircleOutlined className="text-2xl" />,
                    title: "Phúc lợi đầy đủ",
                    description:
                      "Bảo hiểm đầy đủ, nghỉ phép linh hoạt, chế độ làm việc remote/hybrid.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="p-4 bg-primary-50 rounded-xl border border-primary-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-primary-500 flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quick Info */}
            <div className="bg-white rounded-2xl border border-primary-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Thông tin công ty
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="text-primary-400 mt-1" />
                  <div>
                    <p className="text-gray-500">Địa điểm</p>
                    <p className="font-medium text-gray-900">
                      {headOfficeCompany?.ward?.name || ""} -{" "}
                      {headOfficeCompany?.province?.name || ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TeamOutlined className="text-primary-400 mt-1" />
                  <div>
                    <p className="text-gray-500">Quy mô</p>
                    <p className="font-medium text-gray-900">
                      {dataComapny?.companySize.minEmployees || ""} -{" "}
                      {dataComapny?.companySize.maxEmployees || ""} nhân viên
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GlobalOutlined className="text-primary-400 mt-1" />
                  <div>
                    <p className="text-gray-500">Quốc gia</p>
                    <p className="font-medium text-gray-900">Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            {dataJobs && dataJobs?.length > 0 && (
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {dataJobs?.length} việc làm đang tuyển
                </h3>
                <p className="text-primary-200 mb-4 text-sm">
                  Khám phá cơ hội nghề nghiệp tại {dataComapny?.name}
                </p>
                <Button
                  type="primary"
                  block
                  size="large"
                  className="!bg-white !text-primary-600 hover:!bg-primary-50 !font-bold !rounded-xl"
                  onClick={() => setActiveTab("jobs")}
                >
                  Xem tất cả việc làm
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
