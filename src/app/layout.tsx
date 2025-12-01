import ReduxProvider from "@/app/providers/ReduxProvider";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import GlobalHandler from "@/components/ui/Handler/GlobalHandler";
import ToastContainer from "@/components/ui/ToastContainer/ToastContainer";
import React from "react";
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
          <MyQueryClientProvider>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily:
                    'Lexend, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                },
              }}
            >
              <Header />
              <main className="flex-grow flex">{children}</main>
              <Footer />
              <GlobalHandler />
              <ToastContainer />
            </ConfigProvider>
          </MyQueryClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
