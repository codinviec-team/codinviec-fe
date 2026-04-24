import { ProvinceType } from "@/types/ProvinceType";
import { StatusSpecial } from "@/types/StatusSpecial";
import { Wardtype } from "@/types/Ward";
import { IndustryType } from "./IndustryType";

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  statusSpecials: StatusSpecial[] | null;
  companySize: CompanySize;
  companyAddress: CompanyAddress[] | null;
  isFeatured: boolean;
  JobActive: number;
  industry: IndustryType;
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
