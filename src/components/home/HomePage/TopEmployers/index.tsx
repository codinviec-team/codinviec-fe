"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/ui/Container";

const employers = [
  {
    id: 1,
    name: "FPT Software",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=FPT",
    jobCount: 45,
    industry: "Software Outsourcing",
  },
  {
    id: 2,
    name: "VNG Corporation",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=VNG",
    jobCount: 32,
    industry: "Internet/Technology",
  },
  {
    id: 3,
    name: "Viettel IDC",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=Viettel",
    jobCount: 28,
    industry: "Telecom/IT Services",
  },
  {
    id: 4,
    name: "Tiki Corporation",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=Tiki",
    jobCount: 25,
    industry: "E-commerce",
  },
  {
    id: 5,
    name: "Shopee Vietnam",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=Shopee",
    jobCount: 38,
    industry: "E-commerce",
  },
  {
    id: 6,
    name: "Momo",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=Momo",
    jobCount: 22,
    industry: "Fintech",
  },
  {
    id: 7,
    name: "NashTech",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=NashTech",
    jobCount: 30,
    industry: "Software Outsourcing",
  },
  {
    id: 8,
    name: "KMS Technology",
    logo: "https://placehold.co/160x80/1a1a2e/4db6ac?text=KMS",
    jobCount: 35,
    industry: "Software Development",
  },
];

export default function TopEmployers() {
  return (
    <section className="bg-white py-16">
      <Container className="!py-0">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Nhà tuyển dụng <span className="text-accent-500">hàng đầu</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Khám phá cơ hội từ các công ty công nghệ hàng đầu Việt Nam
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {employers.map((employer, index) => (
            <motion.div
              key={employer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/company/${employer.id}`}
                className="group block bg-primary-50 hover:bg-white border border-primary-100 hover:border-accent-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Logo Container */}
                  <div className="w-full h-20 flex items-center justify-center mb-4 bg-white rounded-xl border border-primary-100 group-hover:border-accent-200 transition-colors overflow-hidden">
                    <img
                      src={employer.logo}
                      alt={employer.name}
                      className="max-w-[120px] max-h-[50px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Company Info */}
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {employer.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {employer.industry}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-600 text-sm font-medium rounded-full">
                    {employer.jobCount} việc làm
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
            href="/companies"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg"
          >
            Xem tất cả nhà tuyển dụng
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

