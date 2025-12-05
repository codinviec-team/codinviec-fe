import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý danh mục - Admin CodinViec",
  description: "Quản lý danh mục việc làm trên hệ thống CodinViec",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
