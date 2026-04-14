import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import HeroSection from "@/components/HeroComponent";
import JobCategories from "@/components/JobCategoriesComponent";
import FeaturedJobs from "@/components/FeaturedJobComponent";
import TopEmployers from "@/components/TopEmployers";
import StatsSection from "@/components/StatsSection";

export const metadata: Metadata = generatePublicMetadata(
  "Trang chủ - Tìm việc làm IT, Developer, Lập trình viên",
  "Tìm kiếm việc làm IT, developer, lập trình viên tại CodinViec. Hàng nghìn cơ hội việc làm công nghệ từ các công ty hàng đầu Việt Nam.",
  "/",
);

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Job Categories */}
      <JobCategories />

      {/* Featured Jobs */}
      <FeaturedJobs />

      {/* Top Employers */}
      <TopEmployers />

      {/* Stats & CTA Section */}
      <StatsSection />
    </div>
  );
}
