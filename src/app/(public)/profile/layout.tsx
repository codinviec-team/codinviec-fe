import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân - CodinViec",
  description:
    "Quản lý hồ sơ cá nhân của bạn trên CodinViec. Cập nhật thông tin, kinh nghiệm và kỹ năng để tìm việc làm IT phù hợp.",
  openGraph: {
    title: "Hồ sơ cá nhân - CodinViec",
    description:
      "Quản lý hồ sơ cá nhân của bạn trên CodinViec để tìm việc làm IT phù hợp.",
    url: "/profile",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
