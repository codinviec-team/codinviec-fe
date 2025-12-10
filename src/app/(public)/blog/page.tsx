"use client";
import Container from "@/components/ui/Container";
import SearchBar from "@/components/ui/SearchBar";
import { UIButton } from "@/components/ui/UIButton";
import { PATHS } from "@/constants/paths";
import { BlogService } from "@/services/home/blog/BlogService";
import { BlogType } from "@/types/home/blog/BlogType";
import { HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import ScNew from "./components/ScNew";
import ScFeature from "./components/ScFeature";
import { useRouter } from "next/navigation";
import { BasePageResponse } from "@/types/common/BasePageResponse";

const BlogPage = () => {
  const router = useRouter();

  const { data: latestBlogs } = useQuery<BasePageResponse<BlogType>, Error>({
    queryKey: ["blogsFeatured"],
    queryFn: () =>
      BlogService.getAllBlogHavePage({
        pageNumber: 0,
        pageSize: 6,
        sortBy: "createdDateDesc",
      }),
  });

  const { data: featuredBlogs } = useQuery<BasePageResponse<BlogType>, Error>({
    queryKey: ["blogsNewest"],
    queryFn: () =>
      BlogService.getAllBlogHavePage({
        pageNumber: 0,
        pageSize: 6,
        sortBy: "sortHighlight",
      }),
  });

  const handleSearch = (values: { keyword?: string }) => {
    const { keyword } = values;
    // chấp nhận cả ký tự đặc biệt trong từ khóa tìm kiếm
    router.push(
      `${PATHS.BLOG_ALL}?keyword=${encodeURIComponent(keyword || "")}`
    );
  };

  return (
    <div className="w-full">
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
            Khám phá những bài viết hữu ích về nghề nghiệp, kỹ năng và cơ hội
            phát triển trong ngành IT
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12"
        >
          <SearchBar showLocation={false} onFinish={handleSearch} />
        </motion.div>

        {/* Featured Section */}
        <ScFeature featuredBlogs={featuredBlogs?.content || []} />

        {/* Latest Section */}
        <ScNew latestBlogs={latestBlogs?.content || []} />
        {/* ACION */}
      </Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-center gap-6 bg-accent-50"
      >
        <Container>
          <div className="">
            <h3 className="text-2xl lg:text-3xl font-bold mb-2">
              Hãy kể về câu chuyện sự nghiệp của bạn
            </h3>
            <p className="text-lg mt-2">
              Chia sẻ kinh nghiệm và giúp cộng đồng phát triển
            </p>
          </div>
          <UIButton
            variantCustom="accent"
            className="!h-12 !px-8 !text-base !font-bold !rounded-xl !mt-4"
          >
            Chia sẻ ngay
          </UIButton>
        </Container>
      </motion.div>
    </div>
  );
};
export default BlogPage;
