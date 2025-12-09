import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import CompanyDetailClient from "./CompanyDetailClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generatePublicMetadata(
    `Chi tiết công ty - ${params.slug}`,
    "Xem thông tin chi tiết về công ty, văn hóa làm việc, lợi ích và các vị trí tuyển dụng hiện tại.",
    `/companies/${params.slug}`
  );
}

export default function CompanyDetailPage({ params }: Props) {
  return <CompanyDetailClient slug={params.slug} />;
}

