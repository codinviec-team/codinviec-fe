import ReduxProvider from "@/providers/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";
import Handler from "@/components/ui/Handler";
import Toast from "@/components/ui/Toast";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Suspense } from "react";
import "./globals.css";
import { ConfigProvider } from "antd";
import MyQueryClientProvider from "@/providers/QueryClientProvider";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5a3fa6" },
    { media: "(prefers-color-scheme: dark)", color: "#5a3fa6" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "CodinViec - Nền tảng tuyển dụng IT hàng đầu Việt Nam",
    template: "%s | CodinViec",
  },
  description:
    "Nền tảng tuyển dụng IT hàng đầu Việt Nam. Kết nối hàng nghìn lập trình viên với các công ty công nghệ tốt nhất. Tìm việc làm IT, developer, lập trình viên tại CodinViec.",
  keywords: [
    "tuyển dụng IT",
    "việc làm IT",
    "tuyển dụng lập trình viên",
    "việc làm developer",
    "tuyển dụng công nghệ",
    "IT jobs Vietnam",
    "tech jobs",
    "software engineer jobs",
    "CodinViec",
  ],
  authors: [{ name: "CodinViec" }],
  creator: "CodinViec",
  publisher: "CodinViec",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo-icon.svg",
    shortcut: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "CodinViec",
    title: "CodinViec - Nền tảng tuyển dụng IT hàng đầu Việt Nam",
    description:
      "Nền tảng tuyển dụng IT hàng đầu Việt Nam. Kết nối hàng nghìn lập trình viên với các công ty công nghệ tốt nhất.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodinViec - Nền tảng tuyển dụng IT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodinViec - Nền tảng tuyển dụng IT hàng đầu Việt Nam",
    description:
      "Nền tảng tuyển dụng IT hàng đầu Việt Nam. Kết nối hàng nghìn lập trình viên với các công ty công nghệ tốt nhất.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Thêm Google Search Console verification code nếu có
    // google: "your-google-verification-code",
  },
};

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
                <LoadingScreen />
                <Suspense fallback={null}>{children}</Suspense>
                <Handler />
                <Toast />
              </ConfigProvider>
            </MyQueryClientProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
