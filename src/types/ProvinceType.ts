import { Wardtype } from "./Ward";

export interface ProvinceType {
  id: number;
  name: string;
  wards: Wardtype[];
}
