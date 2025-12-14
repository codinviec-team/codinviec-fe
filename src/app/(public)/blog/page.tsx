import { Metadata } from "next";
import BlogPageClients from "./components/BlogPageClients";

export const metadata: Metadata = {
  title: "Blog - Codinviec | Tìm việc và sự nghiệp IT",
  description:
    "Khám phá những bài viết hữu ích về nghề nghiệp, kỹ năng và cơ hội phát triển trong ngành IT. Chia sẻ kinh nghiệm, mẹo phỏng vấn và xu hướng tuyển dụng.",
  keywords: [
    "blog",
    "tìm việc",
    "IT",
    "nghề nghiệp",
    "kỹ năng",
    "phỏng vấn",
    "tuyển dụng",
  ],
  alternates: {
    canonical: "/blog",
  },
  authors: [{ name: "Codinviec" }],
};

const BlogPage = () => {
  return <BlogPageClients />;
};
export default BlogPage;
