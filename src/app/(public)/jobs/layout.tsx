import type { Metadata } from "next";
import type { ReactNode } from "react";
import { generatePublicMetadata } from "@/utils/metadata";
import Container from "@/components/ui/Container";

export const metadata: Metadata = generatePublicMetadata(
  "Tìm việc làm IT - Hàng nghìn cơ hội việc làm công nghệ",
  "Tìm kiếm việc làm IT, developer, lập trình viên tại CodinViec. Hàng nghìn cơ hội việc làm công nghệ từ các công ty hàng đầu Việt Nam. Lọc theo địa điểm, mức lương, kinh nghiệm và nhiều tiêu chí khác.",
  "/jobs"
);

export default function JobsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>
    <Container>
        {children}
    </Container>
  </>;
}

