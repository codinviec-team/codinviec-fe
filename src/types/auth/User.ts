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
  isFindJob?: boolean;
  groupSoftSkill?: string;
  companyId?: string;
  roleId?: string;
  role?: string; // Role name (nếu BE trả về)
  createdDate?: string;
  updatedDate?: string;
}

