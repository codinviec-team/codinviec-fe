"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";

type BlogCardProps = {
  title?: string;
  shortDescription?: string;
  imageUrl?: string;
  linkDetail?: string;
  createdDate?: string;
  index?: number;
  className?: string;
};

const BlogCard = ({
  title = "",
  shortDescription = "",
  imageUrl = "/hinh_blog_mau.jpg",
  linkDetail = "",
  createdDate,
  index = 0,
  className,
}: BlogCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={clsx(
        className,
        "group bg-white rounded-2xl overflow-hidden shadow-sm border border-primary-100 hover:shadow-xl hover:border-accent-300 flex flex-col transition-all duration-300"
      )}
    >
      {/* Image */}
      <Link
        href={linkDetail}
        className="relative w-full h-[240px] overflow-hidden"
      >
        <Image
          src={imageUrl || "/hinh_blog_mau.jpg"}
          alt={title || "Blog image"}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <Link href={linkDetail}>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-primary-600 transition-colors">
              {title || "Tiêu đề bài viết"}
            </h3>
          </Link>

          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {shortDescription || "Mô tả ngắn về bài viết..."}
          </p>

          {createdDate && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <CalendarOutlined />
              <span>{formatDate(createdDate)}</span>
            </div>
          )}
        </div>

        <Link
          href={linkDetail}
          className="flex items-center gap-2 text-primary-600 hover:text-accent-500 font-semibold text-sm transition-colors group/link"
        >
          <span>Đọc thêm</span>
          <ArrowRightOutlined className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
export default BlogCard;
