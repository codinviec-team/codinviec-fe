import api from "@/interceptor/api";
import { AvailableSkillType } from "@/types/common/AvailableSkill";
import { IBaseResponse } from "@/types/common/BaseResponse";

const AvailableSkillService = {
  async getAllAvailableSkill(): Promise<AvailableSkillType[]> {
    const res = await api.get<IBaseResponse<AvailableSkillType[]>>(
      "/available-skill"
    );
    if (!res.data.data) {
      throw new Error("Không lấy được available skill");
    }
    return res?.data?.data;
  },
};
export default AvailableSkillService;
