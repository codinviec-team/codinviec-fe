"use client";
import Container from "@/components/ui/Container";
import { PATHS } from "@/constants/paths";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Select } from "antd";
import Link from "next/link";

import BlogCard from "@/components/ui/BlogCard";
import BlogList from "@/components/ui/BlogList";
import PaginationComponent from "@/components/ui/Pagination";
import SearchBar, { SearchFormFields } from "@/components/ui/SearchBar";
import { BlogService } from "@/services/home/blog/BlogServices";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { BlogType } from "@/types/home/blog/BlogType";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingBlog from "@/components/ui/LoadingBlog";

const pageSizeBlogDefault = 9;

const sortOptions = [
  { value: "createdDateDesc", label: "Mới nhất" },
  { value: "createdDateAsc", label: "Cũ nhất" },
  { value: "sortHighlight", label: "Nổi bật nhất" },
];
const BlogAllClientsPage = () => {
  const [pageBlog, setPageBlog] = useState(1);
  const [sortBy, setSortBy] = useState("createdDateDesc");
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordParam = searchParams.get("keyword") || "";
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery<BasePageResponse<BlogType>, Error>({
    queryKey: ["blogs", pageBlog, sortBy, keywordParam],
    queryFn: () =>
      BlogService.getAllBlogHavePage({
        pageNumber: pageBlog || 1,
        pageSize: pageSizeBlogDefault || 9,
        sortBy: sortBy || "createdDateDesc",
        keyword: keywordParam,
      }),
  });

  const onChangePagination = (page: number) => {
    setPageBlog(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const onChangeKeyword = (values: SearchFormFields) => {
    const { keyword } = values;
    router.push(
      `${PATHS.BLOG_ALL}?keyword=${encodeURIComponent(keyword || "")}`
    );
  };

  const resetSearchParams = () => {
    setSortBy("createdDateDesc");
    setPageBlog(1);
    router.push(`${PATHS.BLOG_ALL}`);
  };

  // khi mà ko có search nó sẽ reset form search
  useEffect(() => {
    if (!keywordParam) {
      form.resetFields();
    }
  }, [keywordParam]);

  return (
    <div className="w-full">
      <div className="bg-brand-gradient py-12">
        <Container className="!py-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Blog <span className="text-accent-300">CodinViec</span>
            </h1>
            <p className="text-lg text-white max-w-2xl">
              Khám phá những bài viết hữu ích về nghề nghiệp, kỹ năng và cơ hội
              phát triển trong ngành IT
            </p>
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="flex-1">
                <SearchBar
                  form={form}
                  showLocation={false}
                  onFinish={onChangeKeyword}
                  defaultValuesSearch={keywordParam || ""}
                />
              </div>
              <Select
                size="large"
                placeholder="Sắp xếp"
                value={sortBy}
                onChange={onChangeSortBy}
                options={sortOptions}
                className="md:w-[180px] !h-[52px] [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-xl max-md:text-center"
              />
              {/* reset button */}
              <button
                className="cursor-pointer h-[52px] w-[52px] bg-white flex items-center justify-center rounded-2xl max-md:w-full"
                onClick={resetSearchParams}
              >
                <ReloadOutlined />
              </button>
            </div>
          </motion.div>
        </Container>
      </div>
      <Container className="!py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          className="!mb-6"
          items={[
            {
              title: (
                <Link
                  href={PATHS.HOME}
                  className="text-gray-600 hover:text-primary-600"
                >
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: (
                <Link
                  href={PATHS.BLOG}
                  className="text-gray-600 hover:text-primary-600"
                >
                  Blog
                </Link>
              ),
            },
            {
              title: (
                <span className="text-gray-900 font-medium">
                  Tất cả bài viết
                </span>
              ),
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

        {/* Blog List */}
        {isLoading ? (
          <LoadingBlog />
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
export default BlogAllClientsPage;
