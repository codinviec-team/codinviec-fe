import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import ContainerPage from "@/components/ui/container/page";
import React from "react";

export const metadata: Metadata = generatePublicMetadata(
  "Tìm việc làm IT - Hàng nghìn cơ hội việc làm công nghệ",
  "Tìm kiếm việc làm IT, developer, lập trình viên tại CodinViec. Hàng nghìn cơ hội việc làm công nghệ từ các công ty hàng đầu Việt Nam. Lọc theo địa điểm, mức lương, kinh nghiệm và nhiều tiêu chí khác.",
  "/jobs"
);

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <ContainerPage>
        {children}
    </ContainerPage>
  </>;
}

