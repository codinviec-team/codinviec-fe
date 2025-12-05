import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký - CodinViec",
  description:
    "Đăng ký tài khoản CodinViec ngay hôm nay để bắt đầu tìm kiếm việc làm IT hoặc đăng tin tuyển dụng. Tạo tài khoản miễn phí.",
  openGraph: {
    title: "Đăng ký - CodinViec",
    description:
      "Đăng ký tài khoản CodinViec ngay hôm nay để bắt đầu tìm kiếm việc làm IT.",
    url: "/register",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
