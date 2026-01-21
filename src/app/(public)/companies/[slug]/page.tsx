import type { Metadata } from "next";
import { generatePublicMetadata } from "@/utils/metadata";
import CompanyDetailClient from "./CompanyDetailClient";
import CompanyServices from "@/services/home/companies/CompanyServices";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  try {
    const company = await CompanyServices.getCompanyByInServer(slug);
    if (!company) {
      notFound();
    }
    return {
      title: `${company.name} | Thông tin công ty`,
      description: company.description?.slice(0, 160),

      openGraph: {
        title: company.name,
        description: company.description,
        images: [
          {
            url: company.logo || "/defaultCompanyLogo.webp",
            width: 1200,
            height: 630,
          },
        ],
      },

      keywords: [company.name, "việc làm", "công ty", company.description],
    };
  } catch (error) {
    notFound();
  }
}

export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params;
  return <CompanyDetailClient slug={slug} />;
}
