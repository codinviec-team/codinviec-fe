"use client";

import {useState} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {
    ClockCircleOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    FireOutlined,
    HeartFilled,
    HeartOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import {Job} from "@/components/home/FeaturedJobs/JobCard";
import clsx from "clsx";

type JobListCardProps = {
  job: Job;
  isSelected?: boolean;
  index?: number;
};

export default function JobListCard({ job, isSelected = false, index = 0 }: JobListCardProps) {
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
          <div className="w-20 h-20 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
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
              <Link
                href={`/job/${job.id}`}
                className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2 block"
              >
                {job.title}
              </Link>
              <Link
                href={`/company/${job.id}`}
                className="text-base text-gray-600 hover:text-accent-500 transition-colors font-medium"
              >
                {job.company}
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
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Details Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <DollarOutlined className="text-accent-500" />
              <span className="font-semibold text-accent-600">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvironmentOutlined className="text-gray-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockCircleOutlined className="text-gray-400" />
              <span>{job.postedAt}</span>
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

