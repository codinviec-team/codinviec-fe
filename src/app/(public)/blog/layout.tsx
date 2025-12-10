import type { Metadata } from "next";
import type { ReactNode } from "react";
import { generatePublicMetadata } from "@/utils/metadata";

export const metadata: Metadata = generatePublicMetadata(
  "Blog - Chia sẻ kiến thức và kinh nghiệm IT",
  "Blog tìm việc giúp phát triển ý tưởng và sự nghiệp của bạn. Chia sẻ kiến thức, kinh nghiệm về lập trình, công nghệ và nghề nghiệp IT tại CodinViec.",
  "/blog"
);

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
