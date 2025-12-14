"use client";
import BlogCard from "@/components/ui/BlogCard";
import BlogList from "@/components/ui/BlogList";
import NoneBlog from "@/components/ui/NoneBlog";

import { PATHS } from "@/constants/paths";
import { BlogType } from "@/types/home/blog/BlogType";
import { FireOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";

type ScFeatureProps = {
  featuredBlogs?: BlogType[] | null | [];
};

const ScFeature = ({ featuredBlogs = [] }: ScFeatureProps) => {
  if (!featuredBlogs || featuredBlogs.length === 0) {
    return <NoneBlog />;
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-primary-600">
          <FireOutlined className="text-2xl text-orange-500" />
          <h2 className="text-2xl lg:text-3xl font-bold ">Bài viết nổi bật</h2>
        </div>
        <Link
          href={PATHS.BLOG_ALL}
          className="text-accent-600 hover:text-accent-700 font-semibold link-underline"
        >
          Xem tất cả
        </Link>
      </div>
      <BlogList>
        {featuredBlogs?.map((blog, index) => (
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
export default ScFeature;
