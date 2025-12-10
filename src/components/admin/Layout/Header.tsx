"use client";

import Image from "next/image";
import {useAppSelector} from "@/hooks/hooks";
import {RootState} from "@/store";
import {useLogout} from "@/hooks/auth/useLogout";
import {
    BellOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Badge, Dropdown, Input, MenuProps} from "antd";
import Link from "next/link";
import {PATHS} from "@/constants/paths";

type AdminHeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onMobileMenuClick: () => void;
};

export default function AdminHeader({
  sidebarOpen,
  onToggleSidebar,
  onMobileMenuClick,
}: AdminHeaderProps) {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { handleLogout } = useLogout();

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.email?.split("@")[0] || "Admin";

  const dropdownItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Link href={PATHS.PROFILE} className="flex items-center gap-2">
          <UserOutlined />
          <span>Hồ sơ của tôi</span>
        </Link>
      ),
    },
    {
      key: "settings",
      label: (
        <Link href={`${PATHS.ADMIN}/settings`} className="flex items-center gap-2">
          <SettingOutlined />
          <span>Cài đặt</span>
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 w-full"
        >
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </button>
      ),
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-primary-100 sticky top-0 z-30 shadow-sm">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <MenuOutlined className="text-xl" />
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <MenuFoldOutlined className="text-xl" />
            ) : (
              <MenuUnfoldOutlined className="text-xl" />
            )}
          </button>

          {/* Search */}
          <div className="hidden sm:block">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-64 !rounded-xl !border-primary-200 hover:!border-primary-400 focus:!border-primary-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Badge count={5} size="small">
            <button className="p-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
              <BellOutlined className="text-xl" />
            </button>
          </Badge>

          {/* User Dropdown */}
          <Dropdown
            menu={{ items: dropdownItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <button className="flex items-center gap-3 p-2 hover:bg-primary-50 rounded-xl transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden border-2 border-primary-200">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-sm">
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

