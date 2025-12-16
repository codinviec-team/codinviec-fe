import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/common/BaseResponse";
import { ProvinceType } from "@/types/common/ProvinceType";

const ProvinceService = {
  async getAllProvince(): Promise<ProvinceType[]> {
    const res = await api.get<IBaseResponse<ProvinceType[]>>("/province");
    if (!res.data.data) {
      throw new Error("Không lấy được province");
    }
    return res?.data?.data;
  },
};
export default ProvinceService;
