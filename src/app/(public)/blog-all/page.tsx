import { Metadata } from "next";
import BlogAllClientsPage from "./components/BlogAllClients";

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
    canonical: "/blog-all",
  },
  authors: [{ name: "Codinviec" }],
};
const BlogAllPage = () => {
  return <BlogAllClientsPage />;
};
export default BlogAllPage;
