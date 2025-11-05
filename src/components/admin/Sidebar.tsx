"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Admin</h2>
      <ul className="space-y-2 text-gray-600">
        <li><Link href="/admin" className="hover:text-blue-600">Dashboard</Link></li>
        <li><Link href="/admin/job" className="hover:text-blue-600">Quản lý việc làm</Link></li>
        <li><Link href="/admin/users" className="hover:text-blue-600">Người dùng</Link></li>
      </ul>
    </aside>
  );
}
