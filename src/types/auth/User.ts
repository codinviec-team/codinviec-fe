import { GroupCoreSkillType } from "../common/GroupCoreSkillType";
import { CompanyType } from "../home/company/CompanyType";
import { JobType } from "../home/job/JobType";
import { RoleType } from "./Role";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  gender: string;
  education: string;
  address: string;
  websiteLink: string;
  birthDate: string;
  groupSoftSkill: string | null;
  company: CompanyType | null;
  role: RoleType;
  cv: string | null;
  block: boolean;
  createdDate: string;
  updatedDate: string;
  findJob: boolean;
}

export interface SearchUserType {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  roleId?: string | null;
  block?: boolean | null;
}

export interface BlockUserType {
  userId: string;
}

export interface SaveUserType {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  education: string;
  address: string;
  websiteLink: string;
  birthDate: string;
  companyId: string | null;
  roleId: string;
}

export interface UpdateUserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  education: string;
  address: string;
  websiteLink: string;
  birthDate: string;
  companyId: string | null;
  roleId: string;
}

export interface DeleteUserType {
  userId: string;
}

export interface changeSoftSkillType {
  softSkill: string | null;
}

export interface JobApplyUserType {
  listUsers: IUser[];
  listJobs: JobType[];
}
