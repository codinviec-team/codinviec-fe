"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import ReduxProvider from "./ReduxProvider";
import MyQueryClientProvider from "./QueryClientProvider";

// Dynamic imports cho các component nặng - không block initial load
const GlobalHandler = dynamic(
  () => import("@/components/ui/Handler/GlobalHandler"),
  { ssr: false }
);

const ToastContainer = dynamic(
  () => import("@/components/ui/ToastContainer/ToastContainer"),
  { ssr: false }
);

// Dynamic import AntdProvider để defer antd loading

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <MyQueryClientProvider>
          {children}
          <GlobalHandler />
          <ToastContainer />
      </MyQueryClientProvider>
    </ReduxProvider>
  );
}








