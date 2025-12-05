import type { Metadata } from "next";

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  url?: string;
  noIndex?: boolean;
  image?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const siteName = "CodinViec";
const defaultDescription =
  "Nền tảng tuyển dụng IT hàng đầu Việt Nam. Kết nối hàng nghìn lập trình viên với các công ty công nghệ tốt nhất.";

/**
 * Helper function để tạo metadata cho các trang một cách dễ dàng
 * 
 * @example
 * // Trong page.tsx (server component)
 * export const metadata = generateMetadata({
 *   title: "Trang chủ",
 *   description: "Mô tả trang chủ",
 *   url: "/"
 * });
 * 
 * @example
 * // Trong page.tsx (client component - cần tạo layout.tsx)
 * // Tạo file layout.tsx trong cùng thư mục
 * export const metadata = generateMetadata({
 *   title: "Blog",
 *   description: "Mô tả blog"
 * });
 */
export function generateMetadata({
  title,
  description = defaultDescription,
  url = "/",
  noIndex = false,
  image = "/og-image.jpg",
}: GenerateMetadataOptions): Metadata {
  const fullTitle = title.includes("CodinViec")
    ? title
    : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Helper để tạo metadata cho trang admin (tự động set noIndex)
 */
export function generateAdminMetadata(
  title: string,
  description?: string
): Metadata {
  return generateMetadata({
    title: `Admin - ${title}`,
    description: description || `Trang quản trị ${title.toLowerCase()} trên hệ thống CodinViec`,
    noIndex: true,
  });
}

/**
 * Helper để tạo metadata cho trang public
 */
export function generatePublicMetadata(
  title: string,
  description?: string,
  url?: string
): Metadata {
  return generateMetadata({
    title,
    description,
    url,
    noIndex: false,
  });
}
