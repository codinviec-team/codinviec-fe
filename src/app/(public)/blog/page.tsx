"use client";
import ContainerPage from "@/components/ui/container/page";
import { PATHS } from "@/constants/paths";
import { HomeOutlined, FireOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import BlogCardCustom from "./components/BlogCardCustom";
import ListBlogCustom from "./components/ListBlogCustom";
import { UiButton } from "@/components/ui/base/UiButton";
import SearchCustom from "@/components/ui/SearchCustom/page";
import { motion } from "framer-motion";

// Demo data
const featuredBlogs = [
  {
    id: 1,
    title: "10 Kỹ năng lập trình viên cần có trong năm 2024",
    shortDescription:
      "Khám phá những kỹ năng quan trọng nhất mà mọi lập trình viên cần phát triển để thành công trong ngành công nghệ hiện đại.",
    imageUrl: "/hinh_blog_mau.jpg",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Hướng dẫn viết CV IT ấn tượng cho nhà tuyển dụng",
    shortDescription:
      "Bí quyết viết CV IT thu hút nhà tuyển dụng, bao gồm cách trình bày dự án, kỹ năng kỹ thuật và kinh nghiệm làm việc.",
    imageUrl: "/hinh_blog_mau.jpg",
    createdDate: "2024-01-12",
  },
  {
    id: 3,
    title: "Lộ trình học Fullstack Developer từ zero to hero",
    shortDescription:
      "Lộ trình chi tiết để trở thành Fullstack Developer, từ những kiến thức cơ bản đến các công nghệ hiện đại nhất.",
    imageUrl: "/hinh_blog_mau.jpg",
    createdDate: "2024-01-10",
  },
];

const latestBlogs = [
  {
    id: 4,
    title: "Top 5 framework JavaScript phổ biến nhất 2024",
    shortDescription:
      "So sánh và đánh giá các framework JavaScript hàng đầu như React, Vue, Angular và khi nào nên sử dụng chúng.",
    imageUrl: "/hinh_blog_mau.jpg",
    createdDate: "2024-01-08",
  },
  {
    id: 5,
    title: "DevOps là gì? Tại sao nó quan trọng với developer?",
    shortDescription:
      "Tìm hiểu về DevOps, các công cụ phổ biến và cách nó giúp cải thiện quy trình phát triển phần mềm.",
    imageUrl: "/hinh_blog_mau.jpg",
    createdDate: "2024-01-05",
  },
  {
    id: 6,
    title: "Cách chuẩn bị cho buổi phỏng vấn kỹ thuật",
    shortDescription:
      "Những điều cần biết và cách chuẩn bị tốt nhất cho buổi phỏng vấn kỹ thuật tại các công ty công nghệ hàng đầu.",
    imageUrl: "/hinh_blog_mau.jpg",
    createdDate: "2024-01-03",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-primary-50">
      <ContainerPage className="!py-8">
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
              title: <span className="text-gray-900 font-medium">Blog</span>,
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
            Blog <span className="text-primary-600">Tìm Việc</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Khám phá những bài viết hữu ích về nghề nghiệp, kỹ năng và cơ hội phát triển trong ngành IT
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12"
        >
          <SearchCustom />
        </motion.div>

        {/* Featured Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FireOutlined className="text-2xl text-orange-500" />
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Bài viết nổi bật
              </h2>
            </div>
            <Link
              href={PATHS.BLOG_ALL}
              className="text-accent-600 hover:text-accent-700 font-semibold link-underline"
            >
              Xem tất cả
            </Link>
          </div>
          <ListBlogCustom>
            {featuredBlogs.map((blog, index) => (
              <BlogCardCustom
                key={blog.id}
                title={blog.title}
                shortDescription={blog.shortDescription}
                imageUrl={blog.imageUrl}
                linkDetail={`${PATHS.BLOG}/${blog.id}`}
                createdDate={blog.createdDate}
                index={index}
              />
            ))}
          </ListBlogCustom>
        </motion.section>

        {/* Latest Section */}
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
          <ListBlogCustom>
            {latestBlogs.map((blog, index) => (
              <BlogCardCustom
                key={blog.id}
                title={blog.title}
                shortDescription={blog.shortDescription}
                imageUrl={blog.imageUrl}
                linkDetail={`${PATHS.BLOG}/${blog.id}`}
                createdDate={blog.createdDate}
                index={index}
              />
            ))}
          </ListBlogCustom>
        </motion.section>
      </ContainerPage>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
        <ContainerPage>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                Hãy kể về câu chuyện sự nghiệp của bạn
              </h3>
              <p className="text-primary-200 text-lg">
                Chia sẻ kinh nghiệm và giúp cộng đồng phát triển
              </p>
            </div>
            <UiButton
              variantCustom="accent"
              className="!h-12 !px-8 !text-base !font-bold !rounded-xl"
            >
              Chia sẻ ngay
            </UiButton>
          </motion.div>
        </ContainerPage>
      </div>
    </div>
  );
};
export default BlogPage;
