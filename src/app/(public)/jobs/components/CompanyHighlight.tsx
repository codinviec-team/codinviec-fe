"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

const featuredCompany = {
  id: 1,
  name: "NEC Vietnam",
  logo: "https://placehold.co/120x60/1e40af/ffffff?text=NEC",
  location: "Hồ Chí Minh - Hà Nội",
  description: "ONE OF THE TOP ICT JAPANESE COMPANIES IN VIETNAM",
  jobCount: 3,
  jobs: [
    "Project Leader/ BrSE (Japanese N2+)",
    "Chief Information Technology/ Head of AI (Japanese N2+)",
    "[Sign-on Bonus] Project Manager (Japanese N2+)",
  ],
};

export default function CompanyHighlight() {
  return (
    <section className="bg-white py-6 border-b border-primary-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Company Spotlight Ad Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1 relative bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-6 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-400 rounded-full blur-2xl" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                COMPANY SPOTLIGHT
              </div>
              <div className="text-white mb-4">
                <div className="text-2xl font-bold mb-2">50 Countries</div>
                <div className="text-2xl font-bold mb-4">284 Branches</div>
                <div className="space-y-1 text-sm">
                  <div>JOIN with us</div>
                  <div>Take CHALLENGES</div>
                  <div>DEVELOP</div>
                  <div>& MOVE UP</div>
                </div>
              </div>
              <div className="text-primary-200 text-xs">
                orchestrating a brighter world NEC
              </div>
            </div>
          </motion.div>

          {/* Featured Company Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 bg-white border border-primary-100 rounded-2xl p-6 flex flex-col lg:flex-row gap-6"
          >
            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={featuredCompany.logo}
                    alt={featuredCompany.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {featuredCompany.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {featuredCompany.location}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    {featuredCompany.description}
                  </p>
                </div>
              </div>
              <Link
                href={`/company/${featuredCompany.id}`}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm"
              >
                Xem {featuredCompany.jobCount} việc làm <RightOutlined />
              </Link>
            </div>

            {/* Job Listings */}
            <div className="lg:w-[300px] flex-shrink-0">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Việc làm nổi bật
              </h4>
              <div className="space-y-2">
                {featuredCompany.jobs.map((job, index) => (
                  <Link
                    key={index}
                    href={`/job/${featuredCompany.id}-${index}`}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <RightOutlined className="text-red-500 text-xs mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {job}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

