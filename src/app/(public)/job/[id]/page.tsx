import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import JobDetailPageClient from "./JobDetailPageClient";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generatePublicMetadata(
    `Chi tiết việc làm - Job ${params.id}`,
    "Xem chi tiết việc làm IT, developer, lập trình viên tại CodinViec",
    `/job/${params.id}`
  );
}

export default function JobDetailPage({ params }: Props) {
  return <JobDetailPageClient jobId={params.id} />;
}

