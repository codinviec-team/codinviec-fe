import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/common/BaseResponse";
import { IndustryType } from "@/types/common/IndustryType";

const IndustryService = {
  async getAllIndustry(): Promise<IndustryType[]> {
    const res = await api.get<IBaseResponse<IndustryType[]>>("/industry");
    if (!res.data.data) {
      throw new Error("Không lấy được ngành nghề");
    }
    return res?.data?.data;
  },
};
export default IndustryService;
