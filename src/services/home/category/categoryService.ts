import { Category } from "@/types/home/Category";
import api from "@/interceptor/api";
import { IBaseResponse } from "@/types/common/BaseResponse";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { PageRequest } from "@/types/common/PageRequest";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await api.get<IBaseResponse<Category[]>>("/category");
    if (!res.data.data) {
      throw new Error("Không lấy được category");
    }
    return res.data?.data;
  },

  async getAllPaginated(
    pageRequest: PageRequest = {}
  ): Promise<BasePageResponse<Category>> {
    const res = await api.get<IBaseResponse<BasePageResponse<Category>>>(
      "/category",
      {
        params: pageRequest,
      }
    );
    if (!res.data.data) {
      throw new Error("Không lấy được category");
    }
    return res.data?.data;
  },
};
