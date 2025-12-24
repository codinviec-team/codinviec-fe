import api from "@/interceptor/api";
import { RoleType } from "@/types/auth/Role";
import { IBaseResponse } from "@/types/common/BaseResponse";

const RoleService = {
  async getAllRole(): Promise<RoleType[]> {
    const res = await api.get<IBaseResponse<RoleType[]>>("/roles");
    if (!res.data.data) {
      throw new Error("Không lấy được roles");
    }
    return res?.data?.data;
  },
};
export default RoleService;
