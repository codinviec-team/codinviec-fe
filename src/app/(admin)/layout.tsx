"use client";

import React, { Suspense } from "react";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </AdminGuard>
  );
}

