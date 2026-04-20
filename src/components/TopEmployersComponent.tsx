"use client";

import Container from "@/components/Container";
import { PATHS } from "@/constants/paths";
import CompanyServices from "@/services/CompanyServices";
import { CompanyType } from "@/types/CompanyType";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "node_modules/@tanstack/react-query/build/modern/useQuery";
import CompanyHomeComponents from "./CompanyHomeComponents";

//  Top employer in homepage
export default function TopEmployersComponent() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

  const { data: dataCompany, isLoading: isLoadingCompany } = useQuery<
    CompanyType[],
    Error
  >({
    queryKey: ["company"],
    queryFn: () => {
      return CompanyServices.getCompanyFeatured();
    },
  });
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
          {dataCompany &&
            dataCompany?.length > 0 &&
            dataCompany?.map((company, index) => (
              <CompanyHomeComponents
                key={company.id}
                company={company}
                index={index}
              />
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
            href={`${domain}/${PATHS.COMPANIES}`}
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
