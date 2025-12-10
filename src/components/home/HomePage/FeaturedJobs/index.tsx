"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Tabs } from "antd";
import Container from "@/components/ui/Container";
import JobCard, { Job } from "./JobCard";
import { FireOutlined, ThunderboltOutlined, StarOutlined } from "@ant-design/icons";

const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer (ReactJS)",
    company: "FPT Software",
    companyLogo: "https://placehold.co/100x100/6b46c1/ffffff?text=FPT",
    location: "Hà Nội",
    salary: "25 - 40 triệu",
    postedAt: "Đăng 2 ngày trước",
    tags: ["ReactJS", "TypeScript", "TailwindCSS"],
    isHot: true,
  },
  {
    id: 2,
    title: "Backend Developer (NodeJS/Python)",
    company: "VNG Corporation",
    companyLogo: "https://placehold.co/100x100/4db6ac/ffffff?text=VNG",
    location: "Hồ Chí Minh",
    salary: "30 - 50 triệu",
    postedAt: "Đăng 1 ngày trước",
    tags: ["NodeJS", "Python", "MongoDB"],
    isUrgent: true,
  },
  {
    id: 3,
    title: "Fullstack Developer (MERN Stack)",
    company: "Tiki Corporation",
    companyLogo: "https://placehold.co/100x100/f59e0b/ffffff?text=Tiki",
    location: "Hồ Chí Minh",
    salary: "28 - 45 triệu",
    postedAt: "Đăng 3 ngày trước",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    isHot: true,
  },
  {
    id: 4,
    title: "DevOps Engineer (AWS/K8s)",
    company: "Shopee Vietnam",
    companyLogo: "https://placehold.co/100x100/ef4444/ffffff?text=Shopee",
    location: "Hồ Chí Minh",
    salary: "35 - 55 triệu",
    postedAt: "Đăng 1 ngày trước",
    tags: ["AWS", "Kubernetes", "Docker", "CI/CD"],
  },
  {
    id: 5,
    title: "Mobile Developer (React Native)",
    company: "MoMo",
    companyLogo: "https://placehold.co/100x100/ec4899/ffffff?text=MoMo",
    location: "Hồ Chí Minh",
    salary: "25 - 40 triệu",
    postedAt: "Đăng 4 ngày trước",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    id: 6,
    title: "AI/ML Engineer (Computer Vision)",
    company: "VinAI",
    companyLogo: "https://placehold.co/100x100/8b5cf6/ffffff?text=VinAI",
    location: "Hà Nội",
    salary: "40 - 70 triệu",
    postedAt: "Đăng 2 ngày trước",
    tags: ["Python", "TensorFlow", "PyTorch", "CV"],
    isHot: true,
    isUrgent: true,
  },
];

const tabItems = [
  {
    key: "all",
    label: (
      <span className="flex items-center gap-2">
        <StarOutlined />
        Tất cả
      </span>
    ),
  },
  {
    key: "hot",
    label: (
      <span className="flex items-center gap-2">
        <FireOutlined />
        Việc làm Hot
      </span>
    ),
  },
  {
    key: "urgent",
    label: (
      <span className="flex items-center gap-2">
        <ThunderboltOutlined />
        Tuyển gấp
      </span>
    ),
  },
];

export default function FeaturedJobs() {
  return (
    <Container className="!py-16">
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
        >
          Việc làm <span className="text-primary">nổi bật</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Khám phá những cơ hội việc làm IT hấp dẫn nhất dành cho bạn
        </motion.p>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Tabs
          defaultActiveKey="all"
          items={tabItems}
          centered
          className="[&_.ant-tabs-tab]:!text-base [&_.ant-tabs-tab]:!font-medium [&_.ant-tabs-tab-active]:!text-primary-600 [&_.ant-tabs-ink-bar]:!bg-primary-600"
        />
      </motion.div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleJobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-10"
      >
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg text-lg"
        >
          Xem tất cả việc làm
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </motion.div>
    </Container>
  );
}

