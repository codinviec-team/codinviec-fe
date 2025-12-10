import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";

export const metadata: Metadata = generatePublicMetadata(
  "Về chúng tôi - CodinViec",
  "Tìm hiểu về CodinViec - Nền tảng tuyển dụng IT hàng đầu Việt Nam. Chúng tôi kết nối hàng nghìn lập trình viên với các công ty công nghệ tốt nhất.",
  "/about"
);

export default function About() {
  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Về chúng tôi</h1>
        <p className="text-lg text-gray-600">
          Trang này đang được phát triển. Vui lòng quay lại sau.
        </p>
      </div>
    </div>
  );
}