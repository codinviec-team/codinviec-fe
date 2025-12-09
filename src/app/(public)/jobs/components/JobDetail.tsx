"use client";

import {useState} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {
    BookOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    FireOutlined,
    HeartFilled,
    HeartOutlined,
    ShareAltOutlined,
    TeamOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import {Job} from "@/components/home/FeaturedJobs/JobCard";

type JobDetailProps = {
  job: Job | null;
  onClose?: () => void;
};

export default function JobDetail({ job, onClose }: JobDetailProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!job) {
    return (
      <div className="hidden lg:flex items-center justify-center h-full bg-white rounded-2xl border border-primary-100">
        <div className="text-center">
          <div className="text-6xl mb-4">👈</div>
          <p className="text-lg text-gray-600">
            Chọn một việc làm để xem chi tiết
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:block bg-white rounded-2xl border border-primary-100 p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-primary-100">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-14 h-14 object-contain"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {job.title}
            </h2>
            <Link
              href={`/company/${job.id}`}
              className="text-lg text-primary-600 hover:text-primary-700 font-semibold"
            >
              {job.company}
            </Link>
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
          <DollarOutlined className="text-2xl text-accent-500" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Mức lương</p>
            <p className="font-bold text-accent-600">{job.salary}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
          <EnvironmentOutlined className="text-2xl text-primary-500" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Địa điểm</p>
            <p className="font-bold text-gray-900">{job.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
          <ClockCircleOutlined className="text-2xl text-secondary-500" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Đăng tải</p>
            <p className="font-bold text-gray-900">{job.postedAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
          <BookOutlined className="text-2xl text-accent-500" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Kinh nghiệm</p>
            <p className="font-bold text-gray-900">2-5 năm</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Kỹ năng yêu cầu</h3>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-primary-50 text-primary-600 text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Mô tả công việc</h3>
        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>
            Chúng tôi đang tìm kiếm một <strong>{job.title}</strong> có kinh nghiệm để
            tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Trách nhiệm:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Phát triển và duy trì các ứng dụng web hiện đại</li>
              <li>Tham gia vào quá trình thiết kế và xây dựng kiến trúc hệ thống</li>
              <li>Hợp tác với team để đảm bảo chất lượng code và best practices</li>
              <li>Tối ưu hóa hiệu suất và trải nghiệm người dùng</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Yêu cầu:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Kinh nghiệm làm việc với {job.tags.join(", ")}</li>
              <li>Hiểu biết về các design patterns và best practices</li>
              <li>Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả</li>
              <li>Khả năng giải quyết vấn đề và tư duy logic</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Quyền lợi:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Mức lương cạnh tranh: {job.salary}</li>
              <li>Làm việc tại {job.location}</li>
              <li>Môi trường làm việc chuyên nghiệp, năng động</li>
              <li>Cơ hội phát triển nghề nghiệp và học hỏi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="mb-6 p-4 bg-primary-50 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <TeamOutlined className="text-primary-500" />
          Về công ty
        </h3>
        <p className="text-gray-700 mb-3">
          {job.company} là một trong những công ty công nghệ hàng đầu tại Việt Nam,
          chuyên phát triển các giải pháp phần mềm và dịch vụ công nghệ thông tin.
        </p>
        <Link
          href={`/company/${job.id}`}
          className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
        >
          Xem thêm về công ty →
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-white pt-4 border-t border-primary-100 -mx-6 px-6 pb-6">
        <div className="flex gap-3">
          <Link
            href={`/job/${job.id}`}
            className="flex-1 text-center py-3 bg-primary-50 hover:bg-primary-100 text-primary-600 font-semibold rounded-xl transition-all duration-300"
          >
            Xem chi tiết đầy đủ
          </Link>
          <Link
            href={`/job/${job.id}/apply`}
            className="flex-1 text-center py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Ứng tuyển ngay
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

