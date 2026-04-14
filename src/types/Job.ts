export interface IJob {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  benefits?: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  location: string;
  jobType: "fulltime" | "parttime" | "remote" | "contract" | "internship";
  experienceLevel?: "fresher" | "junior" | "middle" | "senior" | "lead";
  categoryId?: string;
  categoryName?: string;
  companyId?: string;
  companyName?: string;
  companyLogo?: string;
  status: "draft" | "pending" | "approved" | "rejected" | "expired";
  viewCount?: number;
  applicationCount?: number;
  isHot?: boolean;
  isUrgent?: boolean;
  expiredAt?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface IJobFilter {
  keyword?: string;
  status?: string;
  categoryId?: string;
  companyId?: string;
  jobType?: string;
  location?: string;
}

