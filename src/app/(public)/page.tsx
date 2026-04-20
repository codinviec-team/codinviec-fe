import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import HeroHomeComponent from "@/components/HeroComponent";
import JobCategoriesComponent from "@/components/JobCategoriesComponent";
import FeaturedJobComponent from "@/components/FeaturedJobComponent";
import TopEmployersComponent from "@/components/TopEmployersComponent";
import StatsSectionComponent from "@/components/StatsSectionComponent";

export const metadata: Metadata = generatePublicMetadata(
  "Trang chủ - Tìm việc làm IT, Developer, Lập trình viên",
  "Tìm kiếm việc làm IT, developer, lập trình viên tại CodinViec. Hàng nghìn cơ hội việc làm công nghệ từ các công ty hàng đầu Việt Nam.",
  "/",
);

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Search */}
      <HeroHomeComponent />

      {/* Job Categories */}
      <JobCategoriesComponent />

      {/* Featured Jobs */}
      <FeaturedJobComponent />

      {/* Top Employers */}
      <TopEmployersComponent />

      {/* Stats & CTA Section */}
      <StatsSectionComponent />
    </div>
  );
}
