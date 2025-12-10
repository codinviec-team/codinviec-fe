import type { Metadata } from "next";
import { generateAdminMetadata } from "@/utils/metadata";
import LayoutClient from "../../../components/hr/Layout/LayoutClient";
import {ReactNode} from "react";

export const metadata: Metadata = generateAdminMetadata(
  "Trang quản lý HR",
  "Trang quản lý nhân sự và tuyển dụng cho HR"
);

export default function HRLayout({
  children,
}: {
  children: ReactNode;
}) {
  return<LayoutClient>{children}</LayoutClient>;
}

