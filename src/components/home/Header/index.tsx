"use client";

import Link from "next/link";
import Image from "next/image";
import { PATHS } from "@/constants/paths";
import ListCategory from "@/components/home/Category/ListCategory";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { useLogout } from "@/hooks/auth/useLogout";
import { IUser } from "@/types/auth/User";

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

    const displayName = getUserDisplayName(user);

    return (
        <header className="bg-brand-gradient border-b border-primary-700 sticky top-0 z-50">
            <nav className="max-w px-12 mx-auto flex items-center justify-between py-4">
                <div className="flex items-center space-x-6">
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
                    {!loading && isAuthenticated && user ? (
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

                            {/* Dropdown Menu - Hiển thị khi hover */}
                            <div className="absolute right-0 mt-3 w-60 bg-primary-900/95 rounded-2xl shadow-2xl border border-primary-700/60 py-2.5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-md">
                                {/* User Info Section */}
                                <div className="px-5 py-4 border-b border-primary-700/50 mb-2">
                                    <p className="text-sm font-semibold text-accent-100 truncate">
                                        {displayName}
                                    </p>
                                    <p className="text-xs text-accent-300/80 truncate mt-0.5">
                                        {user.email}
                                    </p>
                                </div>
                                <Link
                                    href={PATHS.PROFILE}
                                    className="flex items-center gap-3.5 px-5 py-3.5 text-sm font-medium text-accent-100 hover:bg-accent-500/20 hover:text-accent-200 transition-all duration-200 rounded-xl mx-1.5 group/item"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-accent-500/10 flex items-center justify-center group-hover/item:bg-accent-500/20 transition-colors">
                                        <svg
                                            className="w-5 h-5 text-accent-300 group-hover/item:text-accent-200 transition-colors"
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
                                <div className="border-t border-primary-700/50 my-2.5 mx-2"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3.5 w-full text-left px-5 py-3.5 text-sm font-medium text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-all duration-200 rounded-xl mx-1.5 group/item"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/item:bg-red-500/20 transition-colors">
                                        <svg
                                            className="w-5 h-5 text-red-400 group-hover/item:text-red-300 transition-colors"
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
                            </div>
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
            </nav>
        </header>
    );
}
