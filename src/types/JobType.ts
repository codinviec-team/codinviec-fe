import { StatusSpecial } from "@/types/StatusSpecial";
import { CompanyType } from "@/types/CompanyType";
import { AvailableSkillType } from "@/types/AvailableSkill";

export interface JobType {
  id: number;
  jobPosition: string;
  company: CompanyType;
  detailAddress: string;
  descriptionJob: string;
  requirement: string;
  benefits: string;
  provinceId: number;
  provinceName: string;
  industryId: number;
  industryName: string;
  jobLevelId: number;
  jobLevelName: string;
  degreeLevelId: number;
  degreeLevelName: string;
  employmentTypeId: number;
  employmentTypeName: string;
  experienceId: number;
  experienceName: string;
  statusSpecials: StatusSpecial[];
  skills: AvailableSkillType[];
  isAgreedSalary: boolean;
  isFeatured: boolean;
  responsibility: string;
  idJobStatus: number;
  jobStatusName: string;
  salary: number;
  createdDate: string;
  updatedDate: string;
}

export interface SearchJobType {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
}

export interface JobFilterType {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  provinceName?: string;
  industryNames?: string[];
  jobLevelNames?: string[];
  employmentTypeNames?: string[];
  salaryMin?: number;
  salaryMax?: number;
}

export interface ApplyJobType {
  userId: string;
  idJob: number;
}
