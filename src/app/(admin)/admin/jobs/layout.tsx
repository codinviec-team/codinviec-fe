import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý việc làm - Admin CodinViec",
  description: "Quản lý danh sách việc làm trên hệ thống CodinViec",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
