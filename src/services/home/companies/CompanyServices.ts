import api from "@/interceptor/api";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { IBaseResponse } from "@/types/common/BaseResponse";
import { BlogType } from "@/types/home/blog/BlogType";
import { CompanyType } from "@/types/home/company/CompanyType";
import { SearchCompanyType } from "./SearchCompanyType";

const CompanyServices = {
  async getAllCompany(): Promise<CompanyType[]> {
    const res = await api.get<IBaseResponse<CompanyType[]>>("/company");
    if (!res.data.data) {
      throw new Error("Không lấy được company");
    }
    return res?.data?.data;
  },

  async getAllCompanyHavePage(
    searchs: SearchCompanyType = {}
  ): Promise<BasePageResponse<CompanyType>> {
    const res = await api.get<IBaseResponse<BasePageResponse<CompanyType>>>(
      "/company",
      {
        params: searchs,
      }
    );
    if (!res.data.data) {
      throw new Error("Không lấy được company");
    }
    return res?.data?.data;
  },
};
export default CompanyServices;
