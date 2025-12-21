import api from "@/interceptor/api";
import {
  AvailableSkillExperienceType,
  DeleteAvailableSkillExperienceType,
  SaveAvailableSkillExperienceType,
  UpdateAvailableSkillExperienceType,
} from "@/types/common/AvailableSkillExperienceType";
import { IBaseResponse } from "@/types/common/BaseResponse";

const AvailableSkillExperienceService = {
  async getAllAvailableSkillExperienceById(
    idUser: string
  ): Promise<AvailableSkillExperienceType[]> {
    const res = await api.get<IBaseResponse<AvailableSkillExperienceType[]>>(
      `/available-skill-experience/user/${idUser}`
    );
    if (!res.data.data) {
      throw new Error("Không lấy được available skill experience của user");
    }
    return res?.data?.data;
  },

  async SaveAvailableSkillExperienceById(
    payload: SaveAvailableSkillExperienceType
  ): Promise<AvailableSkillExperienceType> {
    const res = await api.post<IBaseResponse<AvailableSkillExperienceType>>(
      `/available-skill-experience`,
      payload
    );
    if (!res.data.data) {
      throw new Error("Thêm mới skill user thất bại");
    }
    return res?.data?.data;
  },

  async UpdateAvailableSkillExperienceById(
    payload: UpdateAvailableSkillExperienceType
  ): Promise<AvailableSkillExperienceType> {
    const res = await api.put<IBaseResponse<AvailableSkillExperienceType>>(
      `/available-skill-experience/${payload.availableSkillExperienceId}`,
      payload
    );
    if (!res.data.data) {
      throw new Error("Cập nhật skill user thất bại");
    }
    return res?.data?.data;
  },

  async DeleteAvailableSkillExperienceById(
    payload: DeleteAvailableSkillExperienceType
  ): Promise<AvailableSkillExperienceType> {
    const res = await api.delete<IBaseResponse<AvailableSkillExperienceType>>(
      `/available-skill-experience/${payload.availableSkillExperienceId}`
    );
    if (!res.data.data) {
      throw new Error("Xóa skill user thất bại");
    }
    return res?.data?.data;
  },
};

export default AvailableSkillExperienceService;
