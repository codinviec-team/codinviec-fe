import ReduxProvider from "@/app/providers/ReduxProvider";
import AuthProvider from "@/app/providers/AuthProvider";
import GlobalHandler from "@/components/ui/Handler/GlobalHandler";
import ToastContainer from "@/components/ui/ToastContainer/ToastContainer";
import GlobalLoadingScreen from "@/components/ui/GlobalLoadingScreen/GlobalLoadingScreen";
import React, { Suspense } from "react";
import "./globals.css";
import { ConfigProvider } from "antd";
import MyQueryClientProvider from "./providers/QueryClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen">
        <ReduxProvider>
          <AuthProvider>
            <MyQueryClientProvider>
              <ConfigProvider
                theme={{
                  token: {
                    fontFamily:
                      'Lexend, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    colorPrimary: "#5a3fa6",
                    borderRadius: 12,
                  },
                }}
              >
                <GlobalLoadingScreen />
                <Suspense fallback={null}>{children}</Suspense>
                <GlobalHandler />
                <ToastContainer />
              </ConfigProvider>
            </MyQueryClientProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
