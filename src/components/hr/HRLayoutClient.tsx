"use client";

import React, { useState } from "react";
import HRSidebar from "./HRSidebar";
import AdminHeader from "@/components/admin/Header";

interface HRLayoutClientProps {
  children: React.ReactNode;
}

export default function HRLayoutClient({ children }: HRLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-primary-50">
      {/* Sidebar */}
      <HRSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onMobileMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">{children}</main>

        {/* Footer */}
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

