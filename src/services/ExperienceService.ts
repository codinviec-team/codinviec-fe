import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/BaseResponse";
import { ExperienceType } from "@/types/Experience";

const ExperienceService = {
  async getAllExperience(): Promise<ExperienceType[]> {
    const res = await api.get<IBaseResponse<ExperienceType[]>>("/experience");
    if (!res.data.data) {
      throw new Error("Không lấy được experience");
    }
    return res?.data?.data;
  },
};
export default ExperienceService;
