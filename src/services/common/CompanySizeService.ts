import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/common/BaseResponse";
import { CompanySizeType } from "@/types/common/CompanySize";

const CompanySizeService = {
  async getAllCompanySize(): Promise<CompanySizeType[]> {
    const res = await api.get<IBaseResponse<CompanySizeType[]>>(
      "/company-size"
    );
    if (!res.data.data) {
      throw new Error("Không lấy được CompanySize");
    }
    return res?.data?.data;
  },
};
export default CompanySizeService;
