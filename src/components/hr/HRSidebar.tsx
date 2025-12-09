"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  CloseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

interface HRSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/hr",
  },
  {
    key: "jobs",
    label: "Quản lý việc làm",
    icon: <FileTextOutlined />,
    path: "/hr/jobs",
  },
  {
    key: "post-job",
    label: "Đăng việc làm",
    icon: <PlusCircleOutlined />,
    path: "/hr/jobs/post",
  },
  {
    key: "candidates",
    label: "Ứng viên",
    icon: <UserOutlined />,
    path: "/hr/candidates",
  },
  {
    key: "analytics",
    label: "Thống kê",
    icon: <BarChartOutlined />,
    path: "/hr/analytics",
  },
  {
    key: "company",
    label: "Công ty",
    icon: <TeamOutlined />,
    path: "/hr/company",
  },
  {
    key: "settings",
    label: "Cài đặt",
    icon: <SettingOutlined />,
    path: "/hr/settings",
  },
];

export default function HRSidebar({ isOpen, onClose }: HRSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/hr") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-64 bg-white border-r border-primary-100 
          transition-transform duration-300 ease-in-out z-50
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-primary-100">
          <Link href="/hr" className="flex items-center gap-2">
            <Image
              src="/logo-icon.svg"
              alt="CodinViec Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <span className="font-bold text-xl text-accent-600">HR</span>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <CloseOutlined className="text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.path}
                  onClick={() => onClose()}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 group
                    ${
                      isActive(item.path)
                        ? "bg-accent-600 text-white shadow-md shadow-accent-200"
                        : "text-gray-600 hover:bg-primary-50 hover:text-accent-600"
                    }
                  `}
                >
                  <span
                    className={`
                    text-xl transition-transform group-hover:scale-110
                    ${isActive(item.path) ? "text-white" : "text-gray-500"}
                  `}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-100">
          <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-4">
            <p className="text-xs text-gray-600 font-medium mb-1">
              CoDinViec HR
            </p>
            <p className="text-xs text-gray-500">Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}

