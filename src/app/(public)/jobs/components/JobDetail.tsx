"use client";

import CustomBadge from "@/components/CustomBadge";
import TagCustomer from "@/components/TagCustomer";
import { PATHS } from "@/constants/paths";
import { BadgeVariant } from "@/types/BadgeType";
import { JobType } from "@/types/home/job/JobType";
import { timeAgo } from "@/utils/DateHelper";
import {
  BookOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type JobDetailProps = {
  job: JobType | null;
  onClose?: () => void;
};

export default function JobDetail({ job, onClose }: JobDetailProps) {
  const [isSaved, setIsSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [job]); // 👈 data thay đổi là scroll lên đầu

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
      className="hidden lg:block bg-white rounded-2xl border border-primary-100 p-6 sticky top-30 max-h-[calc(100vh-8rem)] overflow-y-auto"
      ref={scrollRef}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-primary-100">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={job.company.logo || "/defaultCompanyLogo.webp"}
              alt={job.company.name}
              className="w-14 h-14 object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {job?.statusSpecials &&
                job?.statusSpecials.map((item) => {
                  if (!item?.title || item?.title === "spotlight") return "";
                  return (
                    <CustomBadge
                      key={item.id}
                      variant={item?.title as BadgeVariant}
                    />
                  );
                })}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {job.jobPosition}
            </h2>
            <Link
              href={`${PATHS.COMPANIES}/${job.id}`}
              className="text-lg text-primary-600 hover:text-primary-700 font-semibold"
            >
              {job.company.name}
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
            <p className="font-bold text-accent-600">
              {" "}
              {job.isAgreedSalary
                ? "Thỏa thuận"
                : job.salary.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
          <EnvironmentOutlined className="text-2xl text-primary-500" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Địa điểm</p>
            <p className="font-bold text-gray-900">{job.provinceName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
          <ClockCircleOutlined className="text-2xl text-secondary-500" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Đăng tải</p>
            <p className="font-bold text-gray-900">
              {timeAgo(job.createdDate)}
            </p>
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
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Kỹ năng yêu cầu
        </h3>
        <div className="flex flex-wrap gap-2">
          {job?.skills &&
            job?.skills.map((skill) => (
              <TagCustomer key={skill?.id}>{skill?.name}</TagCustomer>
            ))}
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Mô tả công việc
        </h3>
        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>
            Chúng tôi đang tìm kiếm một <strong>{job.jobPosition}</strong> có
            kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của chúng
            tôi.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Trách nhiệm:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Phát triển và duy trì các ứng dụng web hiện đại</li>
              <li>
                Tham gia vào quá trình thiết kế và xây dựng kiến trúc hệ thống
              </li>
              <li>
                Hợp tác với team để đảm bảo chất lượng code và best practices
              </li>
              <li>Tối ưu hóa hiệu suất và trải nghiệm người dùng</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Yêu cầu:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Kinh nghiệm làm việc với {job.skills.join(", ")}</li>
              <li>Hiểu biết về các design patterns và best practices</li>
              <li>Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả</li>
              <li>Khả năng giải quyết vấn đề và tư duy logic</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Quyền lợi:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Mức lương cạnh tranh: {job.salary}</li>
              <li>Làm việc tại {job.detailAddress}</li>
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
          {job.company.name} là một trong những công ty công nghệ hàng đầu tại
          Việt Nam, chuyên phát triển các giải pháp phần mềm và dịch vụ công
          nghệ thông tin.
        </p>
        <Link
          href={`${PATHS.COMPANIES}/${job.id}`}
          className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
        >
          Xem thêm về công ty →
        </Link>
      </div>
    </motion.div>
  );
}
