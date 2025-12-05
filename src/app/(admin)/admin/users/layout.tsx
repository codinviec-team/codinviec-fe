import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý người dùng - Admin CodinViec",
  description: "Quản lý danh sách người dùng trên hệ thống CodinViec",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
