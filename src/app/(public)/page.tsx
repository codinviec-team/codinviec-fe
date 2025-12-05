import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { generatePublicMetadata } from "@/utils/metadata";

export const metadata: Metadata = generatePublicMetadata(
  "Trang chủ - Tìm việc làm IT, Developer, Lập trình viên",
  "Tìm kiếm việc làm IT, developer, lập trình viên tại CodinViec. Hàng nghìn cơ hội việc làm công nghệ từ các công ty hàng đầu Việt Nam.",
  "/"
);

export default function HomePage() {
  return <HomePageClient />;
}
