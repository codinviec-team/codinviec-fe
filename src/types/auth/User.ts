import { RoleType } from "./Role";

export interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  gender?: string;
  education?: string;
  address?: string;
  websiteLink?: string;
  birthDate?: string; // ISO date string từ BE
  findJob?: boolean;
  groupSoftSkill?: string;
  companyId?: string;
  role?: RoleType; // Role name (nếu BE trả về)
  block?: boolean;
  createdDate?: string;
  updatedDate?: string;
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
