import ReduxProvider from "@/app/providers/ReduxProvider";
import AuthProvider from "@/app/providers/AuthProvider";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import GlobalHandler from "@/components/ui/Handler/GlobalHandler";
import ToastContainer from "@/components/ui/ToastContainer/ToastContainer";
import React, {Suspense} from "react";
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
                  },
                }}
              >
                <Header />
                <main className="flex-grow flex">
                    <Suspense fallback={null}>
                        {children}
                    </Suspense>
                </main>
                <Footer />
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
