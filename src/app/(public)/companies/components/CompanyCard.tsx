import CustomBadge from "@/components/ui/CustomBadge";
import { IMAGES_PATH } from "@/constants/paths";
import { BadgeVariant } from "@/types/common/BadgeType";
import { CompanyType } from "@/types/home/company/CompanyType";
import { EnvironmentOutlined, TeamOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";

type CompanyCardProps = {
  company: CompanyType;
  countjob?: number;
};

export default function CompanyCard({ company, countjob }: CompanyCardProps) {
  const companyAddress =
    company.companyAddress.filter((company) => company.headOffice)[0] || null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-primary-100 hover:border-accent-300 p-6 transition-all duration-300 hover:shadow-xl h-[344px]"
    >
      <Link href={`/company/${company.id}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-20 h-20 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={company.logo || IMAGES_PATH.DEFAULT_COMPANY_LOGO}
                alt={company.name}
                className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex items-center gap-2">
              {company &&
                company?.statusSpecials?.map((status) => {
                  if (status?.title === "spotlight") return;
                  return (
                    <CustomBadge
                      key={status.id}
                      variant={
                        (status!.title.toLowerCase() as BadgeVariant) || ""
                      }
                    />
                  );
                })}
            </div>
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              {company.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {company.description}
            </p>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <EnvironmentOutlined className="text-primary-400" />
                <span>
                  {companyAddress?.province.name || "Chưa có địa điểm"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TeamOutlined className="text-primary-400" />
                <span>
                  {company.companySize.minEmployees} -{" "}
                  {company.companySize.maxEmployees} nhân viên
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-primary-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{countjob} việc làm</span>
              <span className="text-primary-600 font-semibold text-sm group-hover:text-accent-500 transition-colors">
                Xem chi tiết →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
