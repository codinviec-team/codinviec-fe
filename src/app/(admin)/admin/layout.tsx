import type { Metadata } from "next";
import { generateAdminMetadata } from "@/utils/metadata";
import LayoutClient from "@/components/LayoutClient";
import AdminGuard from "@/components/AdminGuard";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = generateAdminMetadata(
  "Trang quản trị",
  "Trang quản trị hệ thống CodinViec",
);

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <Suspense fallback={null}>
        <LayoutClient>{children}</LayoutClient>
      </Suspense>
    </AdminGuard>
  );
}
