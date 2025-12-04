import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import React, { Suspense } from "react";

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

