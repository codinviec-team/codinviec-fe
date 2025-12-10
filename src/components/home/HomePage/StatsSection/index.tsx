"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PATHS } from "@/constants/paths";
import {
  RocketOutlined,
  TeamOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {UIButton} from "@/components/ui/UIButton";

const features = [
  {
    icon: <RocketOutlined className="text-3xl" />,
    title: "Cơ hội không giới hạn",
    description: "Hàng nghìn việc làm IT từ các công ty hàng đầu được cập nhật mỗi ngày",
  },
  {
    icon: <TeamOutlined className="text-3xl" />,
    title: "Kết nối trực tiếp",
    description: "Liên hệ trực tiếp với nhà tuyển dụng, không qua trung gian",
  },
  {
    icon: <TrophyOutlined className="text-3xl" />,
    title: "Đánh giá minh bạch",
    description: "Review công ty từ nhân viên thực tế giúp bạn đưa ra quyết định đúng",
  },
  {
    icon: <SafetyCertificateOutlined className="text-3xl" />,
    title: "Bảo mật thông tin",
    description: "Thông tin cá nhân được bảo mật tuyệt đối theo tiêu chuẩn quốc tế",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Main CTA Section */}
      <div className="bg-brand-gradient py-20 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-48 h-48 bg-accent-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl lg:text-5xl font-bold text-white mb-6"
            >
              Bắt đầu sự nghiệp IT của bạn{" "}
              <span className="text-accent">ngay hôm nay</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg lg:text-xl text-primary-200 mb-10 max-w-2xl mx-auto"
            >
              Đăng ký miễn phí và khám phá hàng ngàn cơ hội việc làm IT hấp dẫn. 
              Để CodinViec giúp bạn tìm được công việc mơ ước!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href={PATHS.SIGNUP}>
                <UIButton
                  variantCustom="accent"
                  className="!h-[56px] !px-10 !text-lg !font-bold"
                >
                  Tạo hồ sơ miễn phí
                </UIButton>
              </Link>
              <Link href="/jobs">
                <UIButton
                  variantCustom="outline"
                  className="!h-[56px] !px-10 !text-lg !font-bold !border-white !text-white hover:!bg-white/10"
                >
                  Tìm việc ngay
                </UIButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn <span className="text-primary">CodinViec</span>?
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-accent-50 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              Đăng ký nhận thông tin việc làm mới nhất
            </h3>
            <p className="text-gray-600 mb-6">
              Nhận thông báo về các việc làm phù hợp với bạn qua email
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 max-w-md px-5 py-3 rounded-xl border border-primary-200 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-200 transition-all"
              />
              <UIButton
                variantCustom="primary"
                className="!h-[50px] !px-8"
              >
                Đăng ký
              </UIButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

