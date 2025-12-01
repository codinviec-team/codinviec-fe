import { IBaseResponse } from "@/types/common/BaseResponse";
import { ILogin } from "@/types/auth/Login";
import { IRegister, RegisterType } from "@/types/auth/Register";
import { IToken } from "@/types/auth/Token";
import { IUser } from "@/types/auth/User";
import api from "@/interceptor/api";
import axios from "axios";
import { BasePageResponse } from "@/types/common/BasePageResponse";

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
      registerData
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
};
