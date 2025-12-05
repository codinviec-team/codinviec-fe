import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập - CodinViec",
  description:
    "Đăng nhập vào CodinViec để tìm kiếm việc làm IT phù hợp hoặc đăng tin tuyển dụng. Đăng nhập bằng email hoặc Google.",
  openGraph: {
    title: "Đăng nhập - CodinViec",
    description: "Đăng nhập vào CodinViec để tìm kiếm việc làm IT phù hợp.",
    url: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
