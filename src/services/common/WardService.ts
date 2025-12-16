import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/common/BaseResponse";
import { Wardtype } from "@/types/common/Ward";

const ProvinceService = {
  async getAllProvince(): Promise<Wardtype[]> {
    const res = await api.get<IBaseResponse<Wardtype[]>>("/ward");
    if (!res.data.data) {
      throw new Error("Không lấy được ward");
    }
    return res?.data?.data;
  },
};
export default ProvinceService;
