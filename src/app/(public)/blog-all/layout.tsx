import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tất cả bài viết - Blog CodinViec",
  description:
    "Xem tất cả bài viết về lập trình, công nghệ và nghề nghiệp IT trên blog CodinViec. Chia sẻ kiến thức và kinh nghiệm từ cộng đồng IT.",
  openGraph: {
    title: "Tất cả bài viết - Blog CodinViec",
    description:
      "Xem tất cả bài viết về lập trình, công nghệ và nghề nghiệp IT trên blog CodinViec.",
    url: "/blog-all",
  },
};

export default function BlogAllLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
