"use client";

import HeroSection from "@/components/home/Hero";
import JobCategories from "@/components/home/JobCategories";
import TopEmployers from "@/components/home/TopEmployers";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import StatsSection from "@/components/home/StatsSection";

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
