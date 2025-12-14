import Footer from "@/components/home/Layout/Footer";
import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/home/Layout/Header";

export const metadata: Metadata = {
  title: {
    default: "CodinViec - Nền tảng tuyển dụng IT hàng đầu Việt Nam",
    template: "%s | CodinViec",
  },
  description:
    "Nền tảng tuyển dụng IT hàng đầu Việt Nam. Kết nối hàng nghìn lập trình viên với các công ty công nghệ tốt nhất.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow flex">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
    </>
  );
}
