import { ProvinceType } from "@/types/ProvinceType";
import { StatusSpecial } from "@/types/StatusSpecial";
import { Wardtype } from "@/types/Ward";

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  statusSpecials: StatusSpecial[];
  companySize: CompanySize;
  companyAddress: CompanyAddress[];
  createdDate: string;
  updatedDate: string;
}

export interface CompanySize {
  id: number;
  minEmployees: number;
  maxEmployees: number;
}

export interface CompanyAddress {
  id: number;
  province: ProvinceType;
  ward: Wardtype;
  detail: string;
  headOffice: boolean;
}
