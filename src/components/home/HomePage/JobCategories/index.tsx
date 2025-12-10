"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CodeOutlined,
  MobileOutlined,
  CloudOutlined,
  DatabaseOutlined,
  SafetyOutlined,
  RobotOutlined,
  DesktopOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import Container from "@/components/ui/Container";

const categories = [
  {
    icon: <CodeOutlined className="text-3xl" />,
    name: "Frontend Developer",
    jobCount: 850,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    icon: <DatabaseOutlined className="text-3xl" />,
    name: "Backend Developer",
    jobCount: 720,
    color: "bg-gradient-to-br from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
  {
    icon: <DesktopOutlined className="text-3xl" />,
    name: "Fullstack Developer",
    jobCount: 540,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
  },
  {
    icon: <MobileOutlined className="text-3xl" />,
    name: "Mobile Developer",
    jobCount: 380,
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    hoverColor: "hover:from-orange-600 hover:to-orange-700",
  },
  {
    icon: <CloudOutlined className="text-3xl" />,
    name: "DevOps/Cloud",
    jobCount: 290,
    color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    hoverColor: "hover:from-cyan-600 hover:to-cyan-700",
  },
  {
    icon: <RobotOutlined className="text-3xl" />,
    name: "AI/ML Engineer",
    jobCount: 180,
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
    hoverColor: "hover:from-pink-600 hover:to-pink-700",
  },
  {
    icon: <SafetyOutlined className="text-3xl" />,
    name: "Security Engineer",
    jobCount: 120,
    color: "bg-gradient-to-br from-red-500 to-red-600",
    hoverColor: "hover:from-red-600 hover:to-red-700",
  },
  {
    icon: <ApiOutlined className="text-3xl" />,
    name: "QA/Tester",
    jobCount: 250,
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function JobCategories() {
  return (
    <Container className="!py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
        >
          Khám phá <span className="text-primary">ngành nghề IT</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Tìm kiếm cơ hội việc làm trong các lĩnh vực công nghệ phổ biến nhất
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
      >
        {categories.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              href={`/jobs?category=${encodeURIComponent(category.name)}`}
              className={`block p-6 rounded-2xl ${category.color} ${category.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <span className="text-sm opacity-90">
                  {category.jobCount} việc làm
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

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
          className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
        >
          Xem tất cả ngành nghề
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </motion.div>
    </Container>
  );
}

