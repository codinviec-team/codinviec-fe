import JobServices from "@/services/JobServices";
import type { Metadata } from "next";
import JobDetailPageClient from "./JobDetailPageClient";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const jobId = Number(id);
  if (Number.isNaN(jobId)) {
    notFound();
  }

  try {
    const job = await JobServices.getJobByIdInServer(jobId);

    return {
      title: `${job.jobPosition} tại ${job.company.name} | Codinviec`,
      description: job.descriptionJob,
    };
  } catch (error) {
    notFound();
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  return <JobDetailPageClient jobId={id} />;
}
