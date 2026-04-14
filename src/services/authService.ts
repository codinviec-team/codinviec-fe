import api from "@/interceptor/api";
import { ILogin } from "@/types/Login";
import { IRegister, RegisterType } from "@/types/Register";
import { IToken } from "@/types/Token";
import { UpdateProfileServiceType } from "@/types/UpdateProfileServiceType";
import { changeSoftSkillType, IUser } from "@/types/User";
import { IBaseResponse } from "@/types/BaseResponse";
import axios from "axios";

// Tạo axios instance riêng cho refresh endpoint để tránh interceptor xử lý lại
const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const authService = {
  async login(loginData: ILogin): Promise<IToken> {
    const res = await api.post<IBaseResponse<IToken>>("/auth/login", loginData);
    if (!res.data.data) {
      throw new Error("Không nhận được token từ server");
    }
    return res.data.data;
  },

  async register(registerData: IRegister): Promise<RegisterType> {
    const res = await api.post<IBaseResponse<RegisterType>>(
      "/auth/register",
      registerData,
    );
    if (!res.data.data) {
      throw new Error("Không lấy được user từ server");
    }
    return res?.data?.data;
  },

  async getProfile(): Promise<IUser> {
    const res = await api.get<IBaseResponse<IUser>>("/auth/profile");
    if (!res.data.data) {
      throw new Error("Không nhận được thông tin người dùng từ server");
    }
    return res.data.data;
  },

  async updateProfile(payload: UpdateProfileServiceType): Promise<IUser> {
    const res = await api.put<IBaseResponse<IUser>>("/auth/profile", payload);
    if (!res.data.data) {
      throw new Error("Không nhận được thông tin người dùng từ server");
    }
    return res.data.data;
  },

  async updateAvatar(payload: FormData): Promise<IUser> {
    const res = await api.put<IBaseResponse<IUser>>(
      "/auth/profile/avatar",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (!res.data.data) {
      throw new Error("Không nhận được cập nhật avatar!");
    }
    return res.data.data;
  },

  async uploadCv(payload: FormData): Promise<IUser> {
    const res = await api.put<IBaseResponse<IUser>>(
      "/auth/profile/uploadCv",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (!res.data.data) {
      throw new Error("Không nhận được  cập nhật cv!");
    }
    return res.data.data;
  },

  async logout(): Promise<void> {
    await api.post<IBaseResponse>(`/auth/logout`);
  },

  async refresh(): Promise<IToken> {
    const res = await refreshApi.post<IBaseResponse<IToken>>("/auth/refresh");
    if (!res.data.data) {
      throw new Error("Không nhận được token mới từ server");
    }
    return res.data.data;
  },

  async changeIsFindJob(): Promise<IUser> {
    const res = await api.put<IBaseResponse<IUser>>("/auth/change-find-job");
    if (!res.data.data) {
      throw new Error("Không thay đổi được trạng thái tìm việc");
    }
    return res.data.data;
  },

  async changeSoftSkill(payload: changeSoftSkillType): Promise<IUser> {
    const res = await api.put<IBaseResponse<IUser>>(
      "/auth/profile/soft-skill",
      {
        softSkill: payload.softSkill,
      },
    );
    if (!res.data.data) {
      throw new Error("Không thay đổi được soft skill");
    }
    return res.data.data;
  },
};
