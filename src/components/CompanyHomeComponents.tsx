import { IMAGES_PATH, PATHS } from "@/constants/paths";
import { CompanyType } from "@/types/CompanyType";
import { motion } from "framer-motion";
import Link from "next/link";

type CompanyHomeComponentsProps = {
  company: CompanyType;
  index?: number;
};

export default function CompanyHomeComponents({
  company,
  index = 1,
}: CompanyHomeComponentsProps) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`${domain}/${PATHS.COMPANIES}/${company.id}`}
        className="group block bg-primary-50 hover:bg-white border border-primary-100 hover:border-accent-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <div className="flex flex-col items-center text-center">
          {/* Logo Container */}
          <div className="w-full h-20 flex items-center justify-center mb-4 bg-white rounded-xl border border-primary-100 group-hover:border-accent-200 transition-colors overflow-hidden">
            <img
              src={company.logo || IMAGES_PATH.DEFAULT_COMPANY_LOGO}
              alt={company.name}
              className="max-w-[120px] max-h-[50px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Company Info */}
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {company.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {company.industry.name || "Ngành nghề không xác định"}
          </p>
          <span className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-600 text-sm font-medium rounded-full">
            {company.JobActive} việc làm
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
