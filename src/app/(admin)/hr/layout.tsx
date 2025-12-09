import type { Metadata } from "next";
import { generateAdminMetadata } from "@/utils/metadata";
import HRLayoutClient from "../../../components/hr/HRLayoutClient";

export const metadata: Metadata = generateAdminMetadata(
  "Trang quản lý HR",
  "Trang quản lý nhân sự và tuyển dụng cho HR"
);

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HRLayoutClient>{children}</HRLayoutClient>;
}

