import { generatePublicMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = generatePublicMetadata(
  "Tìm việc làm IT - Hàng nghìn cơ hội việc làm công nghệ",
  "Tìm kiếm việc làm IT, developer, lập trình viên tại CodinViec. Hàng nghìn cơ hội việc làm công nghệ từ các công ty hàng đầu Việt Nam. Lọc theo địa điểm, mức lương, kinh nghiệm và nhiều tiêu chí khác.",
  "/jobs"
);

export default function JobsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
