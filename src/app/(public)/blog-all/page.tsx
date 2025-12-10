"use client";
import Container from "@/components/ui/Container";
import { PATHS } from "@/constants/paths";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Select } from "antd";
import Link from "next/link";
import BlogCard from "../blog/components/BlogCard";
import BlogList from "../blog/components/BlogList";
import PaginationComponent from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import { BlogService } from "@/services/home/blog/BlogService";
import { useQuery } from "@tanstack/react-query";
import { BlogType } from "@/types/home/blog/BlogType";
import { useState } from "react";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { motion } from "framer-motion";

const pageSizeBlogDefault = 9;

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "popular", label: "Phổ biến" },
];

const BlogAllPage = () => {
  const [pageBlog, setPageBlog] = useState(1);
  const [sortBy, setSortBy] = useState("newest");

  const { data, isLoading } = useQuery<
    BasePageResponse<BlogType>,
    Error
  >({
    queryKey: ["blogs", pageBlog, sortBy],
    queryFn: () =>
      BlogService.getAllBlogHavePage({
        pageNumber: pageBlog,
        pageSize: pageSizeBlogDefault,
      }),
  });

  const onChangePagination = (page: number) => {
    setPageBlog(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <Container className="!py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          className="!mb-6"
          items={[
            {
              title: (
                <Link href={PATHS.HOME} className="text-gray-600 hover:text-primary-600">
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: (
                <Link href={PATHS.BLOG} className="text-gray-600 hover:text-primary-600">
                  Blog
                </Link>
              ),
            },
            {
              title: <span className="text-gray-900 font-medium">Tất cả bài viết</span>,
            },
          ]}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Tất cả <span className="text-primary-600">bài viết</span>
          </h1>
          <p className="text-lg text-gray-600">
            Tìm thấy <strong>{data?.totalElements || 0}</strong> bài viết
          </p>
        </motion.div>

        {/* Search and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar />
            </div>
            <Select
              size="large"
              placeholder="Sắp xếp"
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              className="md:w-[180px] !h-[52px] [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-xl"
            />
          </div>
        </motion.div>

        {/* Blog List */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        ) : data?.content && data.content.length > 0 ? (
          <>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <BlogList>
                {data.content.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    title={blog.title || ""}
                    shortDescription={blog.shortDescription || ""}
                    imageUrl={blog.picture || "/hinh_blog_mau.jpg"}
                    linkDetail={`${PATHS.BLOG}/${blog.id}`}
                    createdDate={blog.createdDate}
                    index={index}
                  />
                ))}
              </BlogList>
            </motion.section>

            {/* Pagination */}
            {data.totalElements > pageSizeBlogDefault && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-12"
              >
                <PaginationComponent
                  current={pageBlog}
                  pageSize={pageSizeBlogDefault}
                  total={data.totalElements}
                  onChange={onChangePagination}
                />
              </motion.div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có bài viết nào
            </h3>
            <p className="text-gray-600">
              Hãy quay lại sau để xem các bài viết mới nhất
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};
export default BlogAllPage;
