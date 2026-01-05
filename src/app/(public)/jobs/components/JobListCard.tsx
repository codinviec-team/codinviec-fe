"use client";

import CustomBadge from "@/components/ui/CustomBadge";
import TagCustomer from "@/components/ui/TagCustomer";
import { BadgeVariant } from "@/types/common/BadgeType";
import { JobType } from "@/types/home/job/JobType";
import {
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type JobListCardProps = {
  job: JobType;
  isSelected?: boolean;
  index?: number;
};

export default function JobListCard({
  job,
  isSelected = false,
  index = 0,
}: JobListCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={clsx(
        "group bg-white rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg",
        isSelected
          ? "border-primary-600 shadow-lg ring-2 ring-primary-100"
          : "border-primary-100 hover:border-accent-300"
      )}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <Link
            href={`/company/${job.id}`}
            className="text-base text-gray-600 hover:text-accent-500 transition-colors font-medium"
          >
            <div className="w-20 h-20 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden">
              <img
                src={job.company.logo || "/defaultCompanyLogo.webp"}
                alt={job.company.name}
                className="w-16 h-16 object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
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
              <Link
                href={`/job/${job.id}`}
                className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2 block"
              >
                {job.jobPosition}
              </Link>
              <Link
                href={`/company/${job.id}`}
                className="text-base text-gray-600 hover:text-accent-500 transition-colors font-medium"
              >
                {job.company.name}
              </Link>
            </div>

            {/* Save Button */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0"
              aria-label={isSaved ? "Bỏ lưu" : "Lưu việc làm"}
            >
              {isSaved ? (
                <HeartFilled className="text-xl text-red-500" />
              ) : (
                <HeartOutlined className="text-xl text-gray-400 hover:text-red-500" />
              )}
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job?.skills &&
              job?.skills.map((skill) => (
                <TagCustomer key={skill?.id}>{skill?.name}</TagCustomer>
              ))}
          </div>

          {/* Details Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <DollarOutlined className="text-accent-500" />
              <span className="font-semibold text-accent-600">
                {job.isAgreedSalary
                  ? "Thỏa thuận"
                  : job.salary.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <EnvironmentOutlined className="text-gray-400" />
              <span>{job.provinceName}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockCircleOutlined className="text-gray-400" />
              <span>{job.employmentTypeName}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-primary-50">
            <Link
              href={`/job/${job.id}`}
              className="flex-1 text-center py-2.5 bg-primary-50 hover:bg-primary-600 text-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300"
            >
              Xem chi tiết
            </Link>
            <Link
              href={`/job/${job.id}/apply`}
              className="flex-1 text-center py-2.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Ứng tuyển ngay
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
