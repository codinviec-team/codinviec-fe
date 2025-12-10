"use client";
import BlogCard from "@/components/ui/BlogCard";
import BlogList from "@/components/ui/BlogList";
import { PATHS } from "@/constants/paths";
import { BlogType } from "@/types/home/blog/BlogType";
import { ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";

type ScNewProps = {
  latestBlogs?: BlogType[];
};

const ScNew = ({ latestBlogs }: ScNewProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ClockCircleOutlined className="text-2xl text-primary-500" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Mới nhất
          </h2>
        </div>
        <Link
          href={PATHS.BLOG_ALL}
          className="text-accent-600 hover:text-accent-700 font-semibold link-underline"
        >
          Xem tất cả
        </Link>
      </div>
      <BlogList>
        {latestBlogs?.map((blog, index) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            shortDescription={blog.shortDescription}
            imageUrl={blog.picture}
            linkDetail={`${PATHS.BLOG}/${blog.id}`}
            createdDate={blog.createdDate}
            index={index}
          />
        ))}
      </BlogList>
    </motion.section>
  );
};

export default ScNew;
