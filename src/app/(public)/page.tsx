import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import HeroSection from "@/components/home/HomePage/Hero";
import JobCategories from "@/components/home/HomePage/JobCategories";
import FeaturedJobs from "@/components/home/HomePage/FeaturedJobs";
import TopEmployers from "@/components/home/HomePage/TopEmployers";
import StatsSection from "@/components/home/HomePage/StatsSection";

export const metadata: Metadata = generatePublicMetadata(
  "Trang chủ - Tìm việc làm IT, Developer, Lập trình viên",
  "Tìm kiếm việc làm IT, developer, lập trình viên tại CodinViec. Hàng nghìn cơ hội việc làm công nghệ từ các công ty hàng đầu Việt Nam.",
  "/"
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
