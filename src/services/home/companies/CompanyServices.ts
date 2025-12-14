import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/common/BaseResponse";
import { CompanyType } from "@/types/home/company/CompanyType";

const CompanyServices = {
  async getAllCompany(): Promise<CompanyType[]> {
    const res = await api.get<IBaseResponse<CompanyType[]>>("/company");
    if (!res.data.data) {
      throw new Error("Không lấy được category");
    }
    return res?.data?.data;
  },
};
export default CompanyServices;
