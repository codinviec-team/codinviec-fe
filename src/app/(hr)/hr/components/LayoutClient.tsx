"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "@/components/admin/Layout/Header";

interface HRLayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: HRLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-primary-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onMobileMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">{children}</main>

        <footer className="border-t border-primary-100 bg-white py-4 px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600">
            <p>© 2024 CoDinViec HR. All rights reserved.</p>
            <p>Version 1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
