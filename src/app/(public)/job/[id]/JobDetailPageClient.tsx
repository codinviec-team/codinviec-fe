"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  HeartFilled,
  FireOutlined,
  ThunderboltOutlined,
  ShareAltOutlined,
  BookOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import ContainerPage from "@/components/ui/container/page";
import { Job } from "@/components/home/FeaturedJobs/JobCard";

// Demo data - trong thực tế sẽ fetch từ API
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

type JobDetailPageClientProps = {
  jobId: string;
};

export default function JobDetailPageClient({ jobId }: JobDetailPageClientProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  
  const job = demoJobs[0];

  // if (!job) {
  //   return (
  //     <ContainerPage className="!py-16">
  //       <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
  //         <div className="text-6xl mb-4">😕</div>
  //         <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //           Không tìm thấy việc làm
  //         </h2>
  //         <p className="text-gray-600 mb-6">
  //           Việc làm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
  //         </p>
  //         <Button
  //           type="primary"
  //           icon={<ArrowLeftOutlined />}
  //           onClick={() => router.push("/jobs")}
  //           className="!rounded-xl"
  //         >
  //           Quay lại danh sách việc làm
  //         </Button>
  //       </div>
  //     </ContainerPage>
  //   );
  // }

  return (
    <div className="min-h-screen bg-primary-50">
      <ContainerPage className="!py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            className="!rounded-xl"
          >
            Quay lại
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-primary-100 p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-primary-100">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {job.isSuperHot && (
                        <motion.span
                          animate={{ 
                            scale: [1, 1.08, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(251, 191, 36, 0.8), 0 0 20px rgba(251, 191, 36, 0.6)",
                              "0 0 0 10px rgba(251, 191, 36, 0), 0 0 30px rgba(251, 191, 36, 0.4)",
                              "0 0 0 0 rgba(251, 191, 36, 0.8), 0 0 20px rgba(251, 191, 36, 0.6)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-3 py-1.5 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-white text-xs font-bold rounded-full shadow-2xl shadow-orange-500/80 border-3 border-yellow-200 ring-2 ring-yellow-300 ring-offset-2 ring-offset-white flex items-center gap-1"
                          style={{ borderWidth: '3px' }}
                        >
                          <FireOutlined className="text-yellow-100" />
                          Super Hot
                        </motion.span>
                      )}
                      {job.isUrgent && !job.isSuperHot && (
                        <motion.span
                          animate={{ 
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(239, 68, 68, 0.7), 0 0 15px rgba(239, 68, 68, 0.5)",
                              "0 0 0 8px rgba(239, 68, 68, 0), 0 0 25px rgba(239, 68, 68, 0.4)",
                              "0 0 0 0 rgba(239, 68, 68, 0.7), 0 0 15px rgba(239, 68, 68, 0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-2.5 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-2xl shadow-red-600/70 border-3 border-red-400 ring-2 ring-red-500 ring-offset-2 ring-offset-white"
                          style={{ borderWidth: '3px' }}
                        >
                          <ThunderboltOutlined className="text-yellow-200" />
                          Urgent
                        </motion.span>
                      )}
                      {job.isHot && !job.isSuperHot && (
                        <span className="px-2.5 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-xs font-semibold rounded-full shadow-md shadow-red-200/50 border border-red-200 flex items-center gap-1">
                          <FireOutlined />
                          Hot
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <p className="text-xl text-primary-600 font-semibold">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                    aria-label={isSaved ? "Bỏ lưu" : "Lưu việc làm"}
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

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                  <DollarOutlined className="text-2xl text-accent-500" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Mức lương</p>
                    <p className="font-bold text-accent-600">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                  <EnvironmentOutlined className="text-2xl text-primary-500" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Địa điểm</p>
                    <p className="font-bold text-gray-900">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                  <ClockCircleOutlined className="text-2xl text-secondary-500" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Đăng tải</p>
                    <p className="font-bold text-gray-900">{job.postedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                  <BookOutlined className="text-2xl text-accent-500" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Kinh nghiệm</p>
                    <p className="font-bold text-gray-900">2-5 năm</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kỹ năng yêu cầu</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-primary-50 text-primary-600 text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả công việc</h2>
                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                  <p>
                    Chúng tôi đang tìm kiếm một <strong>{job.title}</strong> có kinh nghiệm để
                    tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.
                  </p>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Trách nhiệm:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Phát triển và duy trì các ứng dụng web hiện đại</li>
                      <li>Tham gia vào quá trình thiết kế và xây dựng kiến trúc hệ thống</li>
                      <li>Hợp tác với team để đảm bảo chất lượng code và best practices</li>
                      <li>Tối ưu hóa hiệu suất và trải nghiệm người dùng</li>
                      <li>Tham gia code review và mentoring các developer junior</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Yêu cầu:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Kinh nghiệm làm việc với {job.tags.join(", ")}</li>
                      <li>Hiểu biết về các design patterns và best practices</li>
                      <li>Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả</li>
                      <li>Khả năng giải quyết vấn đề và tư duy logic</li>
                      <li>Kinh nghiệm với Git, CI/CD, và các công cụ phát triển hiện đại</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quyền lợi:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Mức lương cạnh tranh: {job.salary}</li>
                      <li>Làm việc tại {job.location}</li>
                      <li>Môi trường làm việc chuyên nghiệp, năng động</li>
                      <li>Cơ hội phát triển nghề nghiệp và học hỏi</li>
                      <li>Bảo hiểm đầy đủ, chế độ nghỉ phép linh hoạt</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="p-6 bg-primary-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TeamOutlined className="text-primary-500" />
                  Về công ty
                </h3>
                <p className="text-gray-700 mb-4">
                  {job.company} là một trong những công ty công nghệ hàng đầu tại Việt Nam,
                  chuyên phát triển các giải pháp phần mềm và dịch vụ công nghệ thông tin.
                  Với đội ngũ nhân viên tài năng và môi trường làm việc năng động, chúng tôi
                  luôn tạo điều kiện tốt nhất cho nhân viên phát triển sự nghiệp.
                </p>
                <Button
                  type="link"
                  href={`/company/${job.id}`}
                  className="!p-0 !h-auto text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Xem thêm về công ty →
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-primary-100 p-6 sticky top-24"
            >
              <Button
                type="primary"
                block
                size="large"
                href={`/job/${job.id}/apply`}
                className="!h-12 !rounded-xl !bg-accent-500 hover:!bg-accent-600 !mb-4"
              >
                Ứng tuyển ngay
              </Button>
              <Button
                block
                size="large"
                onClick={() => setIsSaved(!isSaved)}
                className="!h-12 !rounded-xl !mb-4"
                icon={isSaved ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
              >
                {isSaved ? "Đã lưu" : "Lưu việc làm"}
              </Button>
              <Button
                block
                size="large"
                icon={<ShareAltOutlined />}
                className="!h-12 !rounded-xl"
              >
                Chia sẻ
              </Button>
            </motion.div>
          </div>
        </div>
      </ContainerPage>
    </div>
  );
}

