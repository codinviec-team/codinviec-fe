"use client";

import Link from "next/link";
import Image from "next/image";
import { PATHS } from "@/constants/paths";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const footerLinks = {
  forCandidates: [
    { label: "Tìm việc làm", href: "/jobs" },
    { label: "Công ty hàng đầu", href: "/companies" },
    { label: "Blog tìm việc", href: PATHS.BLOG },
    { label: "Hướng dẫn ứng tuyển", href: "/guide" },
    { label: "Tạo CV online", href: "/cv-builder" },
  ],
  forEmployers: [
    { label: "Đăng tin tuyển dụng", href: "/employer/post-job" },
    { label: "Tìm ứng viên", href: "/employer/candidates" },
    { label: "Bảng giá dịch vụ", href: "/employer/pricing" },
    { label: "Hướng dẫn tuyển dụng", href: "/employer/guide" },
  ],
  about: [
    { label: "Về CodinViec", href: PATHS.ABOUT },
    { label: "Liên hệ", href: "/contact" },
    { label: "Điều khoản sử dụng", href: "/terms" },
    { label: "Chính sách bảo mật", href: "/privacy" },
    { label: "Quy chế hoạt động", href: "/regulations" },
  ],
};

const socialLinks = [
  { icon: <FacebookOutlined />, href: "#", label: "Facebook" },
  { icon: <LinkedinOutlined />, href: "#", label: "LinkedIn" },
  { icon: <TwitterOutlined />, href: "#", label: "Twitter" },
  { icon: <YoutubeOutlined />, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href={PATHS.HOME}
              className="inline-block mb-4 hover:opacity-90 transition"
            >
              <Image
                src="/logo-full.svg"
                alt="CodinViec Logo"
                width={500}
                height={200}
                className="h-18 w-auto"
                priority
              />
            </Link>
            <p className="text-primary-300 mb-6 max-w-sm leading-relaxed">
              Nền tảng tuyển dụng IT hàng đầu Việt Nam. Kết nối hàng nghìn lập trình viên 
              với các công ty công nghệ tốt nhất.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <EnvironmentOutlined className="text-accent" />
                <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneOutlined className="text-accent" />
                <a href="tel:1900123456" className="hover:text-accent transition">
                  1900 123 456
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MailOutlined className="text-accent" />
                <a
                  href="mailto:contact@codinviec.com"
                  className="hover:text-accent transition"
                >
                  contact@codinviec.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-800 hover:bg-accent rounded-lg flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Dành cho ứng viên
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.forCandidates.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Dành cho nhà tuyển dụng
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.forEmployers.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Về CodinViec
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-400">
              © {new Date().getFullYear()} CodinViec. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-400">
              <Link href="/terms" className="hover:text-accent transition">
                Điều khoản
              </Link>
              <Link href="/privacy" className="hover:text-accent transition">
                Bảo mật
              </Link>
              <Link href="/cookies" className="hover:text-accent transition">
                Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
