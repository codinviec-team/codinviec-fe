"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useState } from "react";
import clsx from "clsx";

export type Job = {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  postedAt: string;
  tags: string[];
  isHot?: boolean;
  isUrgent?: boolean;
  isSuperHot?: boolean;
};

type JobCardProps = {
  job: Job;
  index?: number;
  className?: string;
};

export default function JobCard({ job, index = 0, className }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={clsx(
        "group bg-white rounded-2xl border border-primary-100 hover:border-accent-300 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Company Logo */}
        <div className="w-16 h-16 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/job/${job.id}`}
              className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 leading-tight"
            >
              {job.title}
            </Link>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0"
              aria-label={isSaved ? "Bỏ lưu" : "Lưu việc làm"}
            >
              {isSaved ? (
                <HeartFilled className="text-lg text-red-500" />
              ) : (
                <HeartOutlined className="text-lg text-gray-400 hover:text-red-500" />
              )}
            </button>
          </div>
          <Link
            href={`/company/${job.id}`}
            className="text-sm text-gray-600 hover:text-accent-500 transition-colors"
          >
            {job.company}
          </Link>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
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
            className="px-3 py-1.5 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-white text-xs font-bold rounded-full shadow-2xl shadow-orange-500/80 border-3 border-yellow-200 ring-2 ring-yellow-300 ring-offset-2 ring-offset-white"
            style={{ borderWidth: '3px' }}
          >
            🔥 Super Hot
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
            className="px-2.5 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full shadow-2xl shadow-red-600/70 border-3 border-red-400 ring-2 ring-red-500 ring-offset-2 ring-offset-white"
            style={{ borderWidth: '3px' }}
          >
            ⚡ Urgent
          </motion.span>
        )}
        {job.isHot && !job.isSuperHot && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-xs font-semibold rounded-full shadow-md shadow-red-200/50 border border-red-200">
            🔥 Hot
          </span>
        )}
        {job.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <DollarOutlined className="text-accent-500" />
          <span className="font-medium text-accent-600">{job.salary}</span>
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

      {/* Apply Button */}
      <div className="mt-4 pt-4 border-t border-primary-50">
        <Link
          href={`/job/${job.id}`}
          className="block w-full text-center py-2.5 bg-primary-50 hover:bg-primary-600 text-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300"
        >
          Ứng tuyển ngay
        </Link>
      </div>
    </motion.div>
  );
}

