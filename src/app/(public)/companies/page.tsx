import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import CompaniesListingClient from "./CompaniesListingClient";

export const metadata: Metadata = generatePublicMetadata(
  "Danh sách công ty IT hàng đầu Việt Nam - CodinViec",
  "Khám phá danh sách các công ty công nghệ hàng đầu Việt Nam. Tìm hiểu về văn hóa công ty, môi trường làm việc và cơ hội nghề nghiệp tại các công ty IT tốt nhất.",
  "/companies"
);

export default function CompaniesPage() {
  return <CompaniesListingClient />;
}

