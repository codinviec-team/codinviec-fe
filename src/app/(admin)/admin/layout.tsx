import type { Metadata } from "next";
import { generateAdminMetadata } from "@/utils/metadata";
import AdminLayoutClient from "../../../components/admin/AdminLayoutClient";

export const metadata: Metadata = generateAdminMetadata(
  "Trang quản trị",
  "Trang quản trị hệ thống CodinViec"
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
