import type { Metadata } from "next";
import { generateAdminMetadata } from "@/utils/metadata";
import LayoutClient from "./components/LayoutClient";
import { HrProvider } from "@/context/HrContext";

export const metadata: Metadata = generateAdminMetadata(
  "Trang quản lý HR",
  "Trang quản lý nhân sự và tuyển dụng dành cho HR",
);

export default function HRLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutClient>
      <HrProvider>{children}</HrProvider>
    </LayoutClient>
  );
}
