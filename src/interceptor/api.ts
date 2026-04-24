"use client";

import axios, { AxiosError } from "axios";
import { authService } from "@/services/authService";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefresh = false;

interface QueueItem {
  resolve: () => void;
  reject: (error: AxiosError) => void;
}

let failedQueue: QueueItem[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isLogoutRequest = originalRequest.url?.includes("/auth/logout");
    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLogoutRequest &&
      !isAuthRequest
    ) {
      if (isRefresh) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve: () => resolve(), reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefresh = true;

      try {
        await authService.refresh();
        processQueue(null);
        isRefresh = false;
        return api(originalRequest);
      } catch (err) {
        isRefresh = false;
        processQueue(err as AxiosError);

        const logoutEvent = new CustomEvent("logout", {
          detail: {
            message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
          },
        });
        window.dispatchEvent(logoutEvent);

        return Promise.reject(err);
      }
    }

    const status =
      error.response?.status || (error.code === "ECONNABORTED" ? 0 : undefined);
    if (status !== undefined && typeof window !== "undefined") {
      const errorMessage =
        (error.response?.data as any)?.message || error.message;
      const apiErrorEvent = new CustomEvent("api-error", {
        detail: {
          status,
          message: errorMessage,
        },
      });
      window.dispatchEvent(apiErrorEvent);
    }

    return Promise.reject(error);
  },
);

export default api;
