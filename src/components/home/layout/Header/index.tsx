"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/public" className="text-xl font-semibold text-blue-600">
          FindJob
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/public" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>
          <Link href="/admin" className="text-gray-600 hover:text-blue-600">Admin</Link>
        </div>
      </nav>
    </header>
  );
}
