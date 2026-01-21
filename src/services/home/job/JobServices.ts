import api from "@/interceptor/api";
import apiServer from "@/interceptor/api-server";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { IBaseResponse } from "@/types/common/BaseResponse";
import {
  JobFilterType,
  JobType,
  SearchJobType,
} from "@/types/home/job/JobType";

const JobServices = {
  async getAllJOb(): Promise<JobType[]> {
    const res = await api.get<IBaseResponse<JobType[]>>("/job");
    if (!res.data.data) {
      throw new Error("Không lấy được công việc");
    }
    return res?.data?.data;
  },

  async getAllJobHavePage(
    searchs: SearchJobType = {}
  ): Promise<BasePageResponse<JobType>> {
    const res = await api.get<IBaseResponse<BasePageResponse<JobType>>>(
      "/job",
      {
        params: searchs,
      }
    );
    if (!res.data.data) {
      throw new Error("Không lấy được công việc");
    }
    return res?.data?.data;
  },

  async getAllJobFilter(
    searchs: JobFilterType = {}
  ): Promise<BasePageResponse<JobType>> {
    const res = await api.get<IBaseResponse<BasePageResponse<JobType>>>(
      "/job/filter",
      {
        params: searchs,
      }
    );
    if (!res.data.data) {
      throw new Error("Không lấy được công việc");
    }
    return res?.data?.data;
  },

  async getJobById(id: number): Promise<JobType> {
    const res = await api.get<IBaseResponse<JobType>>(`/job/${id}`);
    if (!res.data.data) {
      throw new Error("Không lấy được công việc");
    }
    return res?.data?.data;
  },

  async getJobByIdInServer(id: number): Promise<JobType> {
    const res = await apiServer.get<IBaseResponse<JobType>>(`/job/${id}`);
    if (!res.data.data) {
      throw new Error("Không lấy được công việc");
    }
    return res?.data?.data;
  },

  async getJobByIdCompany(id: string): Promise<JobType[]> {
    const res = await api.get<IBaseResponse<JobType[]>>(`/job/company/${id}`);
    if (!res.data.data) {
      throw new Error("Không lấy được công việc");
    }
    return res?.data?.data;
  },
};
export default JobServices;
