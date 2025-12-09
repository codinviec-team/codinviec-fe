import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";

export const metadata: Metadata = generatePublicMetadata(
  "Danh sách công ty IT - Công ty công nghệ hàng đầu Việt Nam",
  "Khám phá danh sách các công ty công nghệ hàng đầu Việt Nam. Tìm hiểu về văn hóa công ty, môi trường làm việc và cơ hội nghề nghiệp.",
  "/companies"
);

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

