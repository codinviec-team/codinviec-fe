import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/BaseResponse";
import { JobLevelType } from "@/types/JobLevelType";

const LevelJobService = {
  async getAllLevelJob(): Promise<JobLevelType[]> {
    const res = await api.get<IBaseResponse<JobLevelType[]>>("/job-level");
    if (!res.data.data) {
      throw new Error("Không lấy được level job");
    }
    return res?.data?.data;
  },
};
export default LevelJobService;
