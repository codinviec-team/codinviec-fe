"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { Spin } from "antd";
import { PATHS } from "@/constants/paths";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );


  useEffect(() => {
    // Chờ loading xong mới check
    if (!loading) {
      // Nếu chưa đăng nhập, redirect về login
      if (!isAuthenticated || !user) {
        router.push(PATHS.SIGNIN);
        return;
      }

      // Nếu không phải ROLE_ADMIN, redirect về home
      if (user.role !== "ROLE_ADMIN") {
        router.push(PATHS.HOME);
        return;
      }
    }
  }, [user, loading, isAuthenticated, router]);

  // Hiển thị loading khi đang kiểm tra auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Nếu không phải admin, hiển thị loading (sẽ redirect trong useEffect)
  if (!user || user.role !== "ROLE_ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  // Nếu là admin, hiển thị nội dung
  return <>{children}</>;
}

