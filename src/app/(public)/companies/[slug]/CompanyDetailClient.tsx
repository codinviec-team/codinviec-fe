"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  GlobalOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  TrophyOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import Container from "@/components/ui/Container";
import JobListCard from "@/app/(public)/jobs/components/JobListCard";
import { Job } from "@/components/home/HomePage/FeaturedJobs/JobCard";
import { CompanyType } from "@/types/home/company/CompanyType";

// Demo data

const companyJobs: Record<string, Job[]> = {
  "fpt-software": [
    {
      id: 1,
      title: "Senior Frontend Developer (ReactJS, TypeScript)",
      company: "FPT Software",
      companyLogo: "https://placehold.co/100x100/6b46c1/ffffff?text=FPT",
      location: "Hà Nội",
      salary: "25 - 40 triệu",
      postedAt: "Đăng 2 ngày trước",
      tags: ["ReactJS", "TypeScript", "TailwindCSS", "Next.js"],
      isHot: true,
    },
    {
      id: 7,
      title: "Java Developer (Spring Boot, Microservices)",
      company: "FPT Software",
      companyLogo: "https://placehold.co/100x100/6b46c1/ffffff?text=FPT",
      location: "Hà Nội",
      salary: "20 - 35 triệu",
      postedAt: "Đăng 5 ngày trước",
      tags: ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
    },
  ],
  "vng-corporation": [
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
  ],
  "nec-vietnam": [
    {
      id: 13,
      title: "Project Leader/ BrSE (Japanese N2+)",
      company: "NEC Vietnam",
      companyLogo: "https://placehold.co/100x100/1e40af/ffffff?text=NEC",
      location: "Hồ Chí Minh",
      salary: "35 - 60 triệu",
      postedAt: "Đăng 3 ngày trước",
      tags: ["Japanese", "Project Management", "BrSE"],
      isHot: true,
    },
    {
      id: 14,
      title: "Chief Information Technology/ Head of AI (Japanese N2+)",
      company: "NEC Vietnam",
      companyLogo: "https://placehold.co/100x100/1e40af/ffffff?text=NEC",
      location: "Hà Nội",
      salary: "50 - 80 triệu",
      postedAt: "Đăng 1 ngày trước",
      tags: ["AI", "Japanese", "Leadership"],
      isUrgent: true,
    },
    {
      id: 15,
      title: "[Sign-on Bonus] Project Manager (Japanese N2+)",
      company: "NEC Vietnam",
      companyLogo: "https://placehold.co/100x100/1e40af/ffffff?text=NEC",
      location: "Hồ Chí Minh",
      salary: "40 - 70 triệu",
      postedAt: "Đăng 2 ngày trước",
      tags: ["Project Management", "Japanese", "Agile"],
      isHot: true,
    },
  ],
};

type CompanyDetailClientProps = {
  slug: string;
};

export default function CompanyDetailClient({
  slug,
}: CompanyDetailClientProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // const company = companies[0];
  const jobs = companyJobs[slug] || [];

  // if (!company) {
  //   return (
  //     <ContainerPage className="!py-16">
  //       <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
  //         <div className="text-6xl mb-4">😕</div>
  //         <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //           Không tìm thấy công ty
  //         </h2>
  //         <p className="text-gray-600 mb-6">
  //           Công ty bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
  //         </p>
  //         <Button
  //           type="primary"
  //           icon={<ArrowLeftOutlined />}
  //           onClick={() => router.push("/companies")}
  //           className="!rounded-xl"
  //         >
  //           Quay lại danh sách công ty
  //         </Button>
  //       </div>
  //     </ContainerPage>
  //   );
  // }

  const tabItems = [
    {
      key: "overview",
      label: "Tổng quan",
    },
    {
      key: "jobs",
      label: `Việc làm (${jobs.length})`,
    },
    {
      key: "benefits",
      label: "Lợi ích",
    },
  ];

  // return (
  //   <div className="min-h-screen bg-primary-50">
  //     <Container className="!py-8">
  //       {/* Back Button */}
  //       <motion.div
  //         initial={{ opacity: 0, x: -20 }}
  //         animate={{ opacity: 1, x: 0 }}
  //         className="mb-6"
  //       >
  //         <Button
  //           icon={<ArrowLeftOutlined />}
  //           onClick={() => router.back()}
  //           className="!rounded-xl"
  //         >
  //           Quay lại
  //         </Button>
  //       </motion.div>

  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //         {/* Main Content */}
  //         <div className="lg:col-span-2">
  //           {/* Company Header */}
  //           <motion.div
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             className="bg-white rounded-2xl border border-primary-100 p-8 mb-6"
  //           >
  //             <div className="flex items-start justify-between mb-6">
  //               <div className="flex items-start gap-6 flex-1">
  //                 <div className="w-24 h-24 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
  //                   <img
  //                     src={company.logo}
  //                     alt={company.name}
  //                     className="w-20 h-20 object-contain"
  //                   />
  //                 </div>
  //                 <div className="flex-1">
  //                   <h1 className="text-3xl font-bold text-gray-900 mb-3">
  //                     {company.name}
  //                   </h1>
  //                   <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
  //                     <div className="flex items-center gap-2">
  //                       <EnvironmentOutlined className="text-primary-400" />
  //                       <span>{company.location}</span>
  //                     </div>
  //                     <div className="flex items-center gap-2">
  //                       <TeamOutlined className="text-primary-400" />
  //                       <span>{company.size} nhân viên</span>
  //                     </div>
  //                     <div className="flex items-center gap-2">
  //                       <GlobalOutlined className="text-primary-400" />
  //                       <span>{company.country}</span>
  //                     </div>
  //                   </div>
  //                   <div className="flex flex-wrap gap-2">
  //                     <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full">
  //                       {company.industry}
  //                     </span>
  //                     <span className="px-3 py-1 bg-accent-50 text-accent-600 text-sm font-medium rounded-full">
  //                       {company.type}
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="flex items-center gap-2 flex-shrink-0">
  //                 <button
  //                   onClick={() => setIsSaved(!isSaved)}
  //                   className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
  //                   aria-label={isSaved ? "Bỏ lưu" : "Lưu công ty"}
  //                 >
  //                   {isSaved ? (
  //                     <HeartFilled className="text-xl text-red-500" />
  //                   ) : (
  //                     <HeartOutlined className="text-xl text-gray-400 hover:text-red-500" />
  //                   )}
  //                 </button>
  //                 <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
  //                   <ShareAltOutlined className="text-xl text-gray-400 hover:text-primary-600" />
  //                 </button>
  //               </div>
  //             </div>

  //             {/* Tabs */}
  //             <Tabs
  //               activeKey={activeTab}
  //               onChange={setActiveTab}
  //               items={tabItems}
  //               className="[&_.ant-tabs-tab]:!text-base [&_.ant-tabs-tab]:!font-medium [&_.ant-tabs-tab-active]:!text-primary-600 [&_.ant-tabs-ink-bar]:!bg-primary-600"
  //             />
  //           </motion.div>

  //           {/* Tab Content */}
  //           {activeTab === "overview" && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="bg-white rounded-2xl border border-primary-100 p-8"
  //             >
  //               <h2 className="text-2xl font-bold text-gray-900 mb-4">
  //                 Giới thiệu công ty
  //               </h2>
  //               <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
  //                 <p>{company.description}</p>
  //                 <p>
  //                   {company.name} là một trong những công ty công nghệ hàng đầu
  //                   tại Việt Nam, chuyên cung cấp các giải pháp phần mềm và dịch
  //                   vụ công nghệ thông tin chất lượng cao. Với đội ngũ nhân viên
  //                   tài năng và môi trường làm việc năng động, chúng tôi luôn
  //                   tạo điều kiện tốt nhất cho nhân viên phát triển sự nghiệp.
  //                 </p>
  //                 <div>
  //                   <h3 className="font-semibold text-gray-900 mb-2">
  //                     Sứ mệnh
  //                   </h3>
  //                   <p>
  //                     Chúng tôi cam kết mang đến những giải pháp công nghệ tiên
  //                     tiến nhất, góp phần phát triển ngành công nghệ thông tin
  //                     Việt Nam và khu vực.
  //                   </p>
  //                 </div>
  //                 <div>
  //                   <h3 className="font-semibold text-gray-900 mb-2">
  //                     Tầm nhìn
  //                   </h3>
  //                   <p>
  //                     Trở thành công ty công nghệ hàng đầu khu vực, được công
  //                     nhận về chất lượng sản phẩm và dịch vụ, cũng như môi
  //                     trường làm việc tốt nhất cho nhân viên.
  //                   </p>
  //                 </div>
  //               </div>
  //             </motion.div>
  //           )}

  //           {activeTab === "jobs" && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="space-y-4"
  //             >
  //               {jobs.length > 0 ? (
  //                 jobs.map((job) => (
  //                   <div key={job.id} className="cursor-pointer">
  //                     <JobListCard job={job} />
  //                   </div>
  //                 ))
  //               ) : (
  //                 <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
  //                   <div className="text-6xl mb-4">💼</div>
  //                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
  //                     Hiện chưa có việc làm
  //                   </h3>
  //                   <p className="text-gray-600">
  //                     Công ty này hiện chưa có vị trí tuyển dụng nào.
  //                   </p>
  //                 </div>
  //               )}
  //             </motion.div>
  //           )}

  //           {activeTab === "benefits" && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="bg-white rounded-2xl border border-primary-100 p-8"
  //             >
  //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
  //                 Lý do yêu thích làm việc tại {company.name}
  //               </h2>
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                 {[
  //                   {
  //                     icon: <DollarOutlined className="text-2xl" />,
  //                     title: "Lương thưởng cạnh tranh",
  //                     description:
  //                       "Mức lương và thưởng hấp dẫn, đánh giá theo năng lực và đóng góp.",
  //                   },
  //                   {
  //                     icon: <TrophyOutlined className="text-2xl" />,
  //                     title: "Cơ hội phát triển",
  //                     description:
  //                       "Chương trình đào tạo và phát triển nghề nghiệp rõ ràng, cơ hội thăng tiến.",
  //                   },
  //                   {
  //                     icon: <RocketOutlined className="text-2xl" />,
  //                     title: "Môi trường năng động",
  //                     description:
  //                       "Làm việc với các công nghệ mới nhất, dự án thú vị và đội ngũ chuyên nghiệp.",
  //                   },
  //                   {
  //                     icon: <CheckCircleOutlined className="text-2xl" />,
  //                     title: "Phúc lợi đầy đủ",
  //                     description:
  //                       "Bảo hiểm đầy đủ, nghỉ phép linh hoạt, chế độ làm việc remote/hybrid.",
  //                   },
  //                 ].map((benefit, index) => (
  //                   <div
  //                     key={index}
  //                     className="p-4 bg-primary-50 rounded-xl border border-primary-100"
  //                   >
  //                     <div className="flex items-start gap-4">
  //                       <div className="text-primary-500 flex-shrink-0">
  //                         {benefit.icon}
  //                       </div>
  //                       <div>
  //                         <h3 className="font-semibold text-gray-900 mb-2">
  //                           {benefit.title}
  //                         </h3>
  //                         <p className="text-sm text-gray-600">
  //                           {benefit.description}
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             </motion.div>
  //           )}
  //         </div>

  //         {/* Sidebar */}
  //         <div className="lg:col-span-1">
  //           <motion.div
  //             initial={{ opacity: 0, x: 20 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             className="space-y-6"
  //           >
  //             {/* Quick Info */}
  //             <div className="bg-white rounded-2xl border border-primary-100 p-6">
  //               <h3 className="text-lg font-bold text-gray-900 mb-4">
  //                 Thông tin công ty
  //               </h3>
  //               <div className="space-y-3 text-sm">
  //                 <div className="flex items-start gap-3">
  //                   <EnvironmentOutlined className="text-primary-400 mt-1" />
  //                   <div>
  //                     <p className="text-gray-500">Địa điểm</p>
  //                     <p className="font-medium text-gray-900">
  //                       {company.location}
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div className="flex items-start gap-3">
  //                   <TeamOutlined className="text-primary-400 mt-1" />
  //                   <div>
  //                     <p className="text-gray-500">Quy mô</p>
  //                     <p className="font-medium text-gray-900">
  //                       {company.size} nhân viên
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div className="flex items-start gap-3">
  //                   <CalendarOutlined className="text-primary-400 mt-1" />
  //                   <div>
  //                     <p className="text-gray-500">Loại hình</p>
  //                     <p className="font-medium text-gray-900">
  //                       {company.type}
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div className="flex items-start gap-3">
  //                   <GlobalOutlined className="text-primary-400 mt-1" />
  //                   <div>
  //                     <p className="text-gray-500">Quốc gia</p>
  //                     <p className="font-medium text-gray-900">
  //                       {company.country}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* CTA */}
  //             {jobs.length > 0 && (
  //               <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
  //                 <h3 className="text-xl font-bold mb-2">
  //                   {jobs.length} việc làm đang tuyển
  //                 </h3>
  //                 <p className="text-primary-200 mb-4 text-sm">
  //                   Khám phá cơ hội nghề nghiệp tại {company.name}
  //                 </p>
  //                 <Link href="/jobs">
  //                   <Button
  //                     type="primary"
  //                     block
  //                     size="large"
  //                     className="!bg-white !text-primary-600 hover:!bg-primary-50 !font-bold !rounded-xl"
  //                     onClick={() => setActiveTab("jobs")}
  //                   >
  //                     Xem tất cả việc làm
  //                   </Button>
  //                 </Link>
  //               </div>
  //             )}
  //           </motion.div>
  //         </div>
  //       </div>
  //     </Container>

  //   </div>
  // );
}
