import { Province } from "@/types/common/ProvinceType";
import { StatusSpecial } from "@/types/common/StatusSpecial";
import { Ward } from "@/types/common/Ward";

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  address: any;
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
  province: Province;
  ward: Ward;
  detail: string;
  headOffice: boolean;
}
