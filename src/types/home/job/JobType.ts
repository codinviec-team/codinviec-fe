import { StatusSpecial } from "@/types/common/StatusSpecial";
import { CompanyType } from "../company/CompanyType";
import { AvailableSkillType } from "@/types/common/AvailableSkill";

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
