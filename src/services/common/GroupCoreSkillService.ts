import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/common/BaseResponse";
import {
  GroupCoreSkillType,
  SaveGroupCoreSkillType,
} from "@/types/common/GroupCoreSkillType";

const GroupCoreSkillService = {
  async SaveGroupCoreSkill(
    payload: SaveGroupCoreSkillType
  ): Promise<GroupCoreSkillType> {
    const res = await api.post<IBaseResponse<GroupCoreSkillType>>(
      `/group-core-skill`,
      payload
    );
    if (!res.data.data) {
      throw new Error("Thêm mới group skill thất bại");
    }
    return res?.data?.data;
  },
};

export default GroupCoreSkillService;
