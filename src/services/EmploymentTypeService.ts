import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/BaseResponse";
import { EmploymentTypeType } from "@/types/EmploymentType";

const EmploymentTypeService = {
  async getAllEmploymentType(): Promise<EmploymentTypeType[]> {
    const res =
      await api.get<IBaseResponse<EmploymentTypeType[]>>("/employment-type");
    if (!res.data.data) {
      throw new Error("Không lấy được employment type");
    }
    return res?.data?.data;
  },
};
export default EmploymentTypeService;
