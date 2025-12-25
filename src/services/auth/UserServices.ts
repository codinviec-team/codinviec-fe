import api from "@/interceptor/api";
import {
  BlockUserType,
  DeleteUserType,
  IUser,
  SaveUserType,
  SearchUserType,
  UpdateUserType,
} from "@/types/auth/User";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { IBaseResponse } from "@/types/common/BaseResponse";

const UserService = {
  async getAllUserHavePage(
    searchs: SearchUserType = {}
  ): Promise<BasePageResponse<IUser>> {
    const res = await api.get<IBaseResponse<BasePageResponse<IUser>>>("/user", {
      params: searchs,
    });
    if (!res.data.data) {
      throw new Error("Không lấy được user");
    }
    return res?.data?.data;
  },

  async blockUser(params: BlockUserType): Promise<BasePageResponse<IUser>> {
    const res = await api.put<IBaseResponse<BasePageResponse<IUser>>>(
      `/user/block/${params?.userId}`
    );
    if (!res.data.data) {
      throw new Error("Không lấy được user");
    }
    return res?.data?.data;
  },
  async unblockUser(params: BlockUserType): Promise<BasePageResponse<IUser>> {
    const res = await api.put<IBaseResponse<BasePageResponse<IUser>>>(
      `/user/unblock/${params?.userId}`
    );
    if (!res.data.data) {
      throw new Error("Không lấy được user");
    }
    return res?.data?.data;
  },

  async saveUser(payload: SaveUserType): Promise<IUser> {
    const res = await api.post<IBaseResponse<IUser>>("/user", payload);
    if (!res.data.data) {
      throw new Error("Không lấy được user");
    }
    return res?.data?.data;
  },

  async updateUser(payload: UpdateUserType): Promise<IUser> {
    const res = await api.put<IBaseResponse<IUser>>(
      `/user/${payload?.id}`,
      payload
    );
    if (!res.data.data) {
      throw new Error("Không lấy được user");
    }
    return res?.data?.data;
  },

  async deleteUser(payload: DeleteUserType): Promise<IUser> {
    const res = await api.delete<IBaseResponse<IUser>>(
      `/user/${payload.userId}`
    );
    if (!res.data.data) {
      throw new Error("Không lấy được user");
    }
    return res?.data?.data;
  },
};

export default UserService;
