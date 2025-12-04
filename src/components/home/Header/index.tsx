"use client";

import Link from "next/link";
import Image from "next/image";
import { PATHS } from "@/constants/paths";
import ListCategory from "@/components/home/Category/ListCategory";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { useLogout } from "@/hooks/auth/useLogout";
import { IUser } from "@/types/auth/User";
import { useState } from "react";
import { MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import MobileCategoryList from "@/components/home/Category/MobileCategoryList";
import { motion, AnimatePresence } from "framer-motion";

const getUserDisplayName = (user: IUser | null): string => {
    if (!user) return "User";
    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) return user.firstName;
    if (user.email) return user.email.split("@")[0];
    return "User";
};

export default function Header() {
    const { isAuthenticated, user, loading } = useAppSelector(
        (state: RootState) => state.auth
    );
    const { handleLogout } = useLogout();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);

    const displayName = getUserDisplayName(user);

    return (
        <header className="bg-brand-gradient border-b border-primary-700 sticky top-0 z-50">
            <nav className="max-w px-12 mx-auto flex items-center justify-between py-4">
                <div className="flex items-center space-x-6">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 text-accent-100 hover:text-accent hover:bg-primary-800/40 rounded-lg transition-colors"
                        aria-label="Menu"
                    >
                        <MenuOutlined className="text-xl" />
                    </button>

                    <Link
                        href={PATHS.HOME}
                        className="text-accent font-extrabold text-2xl hover:text-accent-200 transition"
                    >
                        CodinViec
                    </Link>

                    <ul className="hidden md:flex items-center space-x-6 text-base font-semibold text-accent-100">
                        <ListCategory />
                    </ul>
                </div>

                <div className="hidden md:flex items-center space-x-4 text-accent-100 font-medium">
                    {isAuthenticated && user ? (
                        // User đã đăng nhập - Hiển thị avatar và dropdown với hover
                        <div className="relative group">
                            <button className="flex items-center justify-center hover:opacity-90 transition-all cursor-pointer p-1.5 rounded-xl hover:bg-primary-800/40 active:scale-95">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent-200 to-accent-300 flex items-center justify-center overflow-hidden border-2 border-accent-400/50 shadow-lg ring-2 ring-accent-500/20">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt="User avatar"
                                            width={44}
                                            height={44}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-accent-700 font-bold text-xl">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </span>
                                    )}
                                </div>
                                <svg
                                    className="w-4 h-4 text-accent-100 ml-1.5 transition-transform duration-300 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Invisible bridge để giữ hover khi di chuyển từ button xuống dropdown */}
                            <div className="absolute right-0 top-full w-full h-2 hidden group-hover:block pointer-events-none z-50" />

                            {/* Dropdown Menu - Hiển thị khi hover với animation */}
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute right-0 top-full pt-2 w-52 bg-primary-900/98 rounded-xl shadow-xl border border-primary-700/50 py-1.5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible backdrop-blur-sm pointer-events-auto"
                                >
                                    {/* User Info Section */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.05 }}
                                        className="px-3 py-2.5 border-b border-primary-700/40 mb-1"
                                    >
                                        <p className="text-sm font-semibold text-accent-100 truncate">
                                            {displayName}
                                        </p>
                                        <p className="text-xs text-accent-200/70 truncate mt-0.5">
                                            {user.email}
                                        </p>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Link
                                            href={PATHS.PROFILE}
                                            className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-accent-100 hover:bg-primary-800/60 hover:text-accent transition-all duration-150 rounded-lg mx-1 group/item"
                                        >
                                            <div className="w-7 h-7 rounded-md bg-accent-500/15 flex items-center justify-center group-hover/item:bg-accent-500/25 transition-colors">
                                                <svg
                                                    className="w-4 h-4 text-accent-300 group-hover/item:text-accent transition-colors"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </div>
                                            <span>Hồ sơ của tôi</span>
                                        </Link>
                                    </motion.div>

                                    {/* Admin Link - Chỉ hiển thị nếu user có role admin */}
                                    {user.role === "ADMIN" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            <Link
                                                href={PATHS.ADMIN}
                                                className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-accent-100 hover:bg-primary-800/60 hover:text-accent transition-all duration-150 rounded-lg mx-1 group/item"
                                            >
                                                <div className="w-7 h-7 rounded-md bg-yellow-500/15 flex items-center justify-center group-hover/item:bg-yellow-500/25 transition-colors">
                                                    <SettingOutlined className="w-4 h-4 text-yellow-400 group-hover/item:text-yellow-300 transition-colors" />
                                                </div>
                                                <span>Quản trị</span>
                                            </Link>
                                        </motion.div>
                                    )}

                                    <div className="border-t border-primary-700/40 my-1 mx-1"></div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: user.role === "ADMIN" ? 0.2 : 0.15 }}
                                    >
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-150 rounded-lg mx-1 group/item"
                                        >
                                            <div className="w-7 h-7 rounded-md bg-red-500/15 flex items-center justify-center group-hover/item:bg-red-500/25 transition-colors">
                                                <svg
                                                    className="w-4 h-4 text-red-400 group-hover/item:text-red-300 transition-colors"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                            </div>
                                            <span>Đăng xuất</span>
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    ) : (
                        // User chưa đăng nhập - Hiển thị nút đăng nhập/đăng ký
                        <>
                            <Link
                                href={PATHS.SIGNIN}
                                className="hover:text-accent transition"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href={PATHS.SIGNUP}
                                className="bg-accent text-primary-900 px-4 py-2 rounded-lg font-bold hover:opacity-90 transition"
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Auth Buttons */}
                {!loading && !isAuthenticated && (
                    <div className="md:hidden flex items-center space-x-2">
                        <Link
                            href={PATHS.SIGNIN}
                            className="text-accent-100 hover:text-accent transition text-sm"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            href={PATHS.SIGNUP}
                            className="bg-accent text-primary-900 px-3 py-1.5 rounded-lg font-bold hover:opacity-90 transition text-sm"
                        >
                            Đăng ký
                        </Link>
                    </div>
                )}

                {/* Mobile User Avatar với Sidebar */}
                {!loading && isAuthenticated && user && (
                    <button
                        onClick={() => setMobileUserMenuOpen(true)}
                        className="md:hidden p-1.5 rounded-xl active:bg-primary-800/40 transition-colors"
                        aria-label="User menu"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-200 to-accent-300 flex items-center justify-center overflow-hidden border-2 border-accent-400/50">
                            {user.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt="User avatar"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-accent-700 font-bold text-lg">
                                    {user.email?.charAt(0).toUpperCase() || "U"}
                                </span>
                            )}
                        </div>
                    </button>
                )}
            </nav>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    {/* Drawer - Chỉ hiển thị Categories */}
                    <div className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
                        <div className="p-4 border-b border-primary-200 flex items-center justify-between bg-brand-gradient">
                            <span className="text-accent font-extrabold text-xl">Danh mục</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-accent-100 active:text-accent active:bg-primary-800/40 rounded-lg transition-colors"
                            >
                                <CloseOutlined />
                            </button>
                        </div>

                        <div className="p-4">
                            {/* Mobile Categories - Click để expand/collapse */}
                            <MobileCategoryList />
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile User Menu Sidebar */}
            {mobileUserMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileUserMenuOpen(false)}
                    />
                    
                    {/* Sidebar - Hiển thị hồ sơ và đăng xuất */}
                    <div className="fixed right-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
                        <div className="p-4 border-b border-primary-200 flex items-center justify-between bg-brand-gradient">
                            <span className="text-accent font-extrabold text-xl">Tài khoản</span>
                            <button
                                onClick={() => setMobileUserMenuOpen(false)}
                                className="p-2 text-accent-100 active:text-accent active:bg-primary-800/40 rounded-lg transition-colors"
                            >
                                <CloseOutlined />
                            </button>
                        </div>

                        <div className="p-4">
                            {/* User Info */}
                            {user && (
                                <div className="mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-200 to-accent-300 flex items-center justify-center overflow-hidden border-2 border-accent-400/50">
                                            {user.avatar ? (
                                                <Image
                                                    src={user.avatar}
                                                    alt="User avatar"
                                                    width={48}
                                                    height={48}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span className="text-accent-700 font-bold text-xl">
                                                    {user.email?.charAt(0).toUpperCase() || "U"}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">
                                                {displayName}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Menu Items */}
                            <div className="space-y-2">
                                <Link
                                    href={PATHS.PROFILE}
                                    onClick={() => setMobileUserMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 bg-primary-50 hover:bg-primary-100 active:bg-primary-200 rounded-xl transition-colors text-gray-700 font-medium"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary-200 flex items-center justify-center">
                                        <UserOutlined className="text-primary-600" />
                                    </div>
                                    <span>Hồ sơ của tôi</span>
                                </Link>
                                
                                {/* Admin Link - Chỉ hiển thị nếu user có role admin */}
                                {user && user.role === "ADMIN" && (
                                    <Link
                                        href={PATHS.ADMIN}
                                        onClick={() => setMobileUserMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 bg-yellow-50 hover:bg-yellow-100 active:bg-yellow-200 rounded-xl transition-colors text-yellow-700 font-medium"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-yellow-200 flex items-center justify-center">
                                            <SettingOutlined className="text-yellow-600" />
                                        </div>
                                        <span>Quản trị</span>
                                    </Link>
                                )}
                                
                                <button
                                    onClick={() => {
                                        setMobileUserMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="flex items-center gap-3 w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded-xl transition-colors text-red-600 font-medium"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-red-200 flex items-center justify-center">
                                        <LogoutOutlined className="text-red-600" />
                                    </div>
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
