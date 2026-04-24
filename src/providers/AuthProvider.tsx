"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { checkAuth } from "@/store/slice/auth/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // httpOnly cookie không đọc được từ JS — hỏi server để biết đã auth chưa
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
}
