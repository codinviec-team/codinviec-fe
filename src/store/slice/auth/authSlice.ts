"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ILogin } from "@/types/auth/Login";
import { IRegister } from "@/types/auth/Register";
import { IUser } from "@/types/auth/User";
import { authService } from "@/services/auth/authService";
import { cookieHelper } from "@/utils/cookieHelper";

interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: ILogin, { rejectWithValue, dispatch }) => {
    try {
      // Gọi service login để lấy token
      const tokenData = await authService.login(loginData);

      // Lưu access token vào cookie
      if (tokenData.accessToken) {
        cookieHelper.set("access_token", tokenData.accessToken);
      }

      // Gọi checkAuth để lấy user info
      return await dispatch(checkAuth()).unwrap();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (registerData: IRegister, { rejectWithValue, dispatch }) => {
    try {
      const res = await authService.register(registerData);

      if (res?.id) {
        const payload: ILogin = {
          email: registerData.email,
          password: registerData.password,
        };

        // Tự động đăng nhập sau khi đăng ký thành công
        return await dispatch(login(payload)).unwrap();
      }
      return null;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = cookieHelper.get("access_token");

      if (!token) {
        throw new Error("Không tìm thấy token!");
      }

      // Gọi service để lấy thông tin user
      return await authService.getProfile();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // Nếu lỗi 401 token không hợp lệ logout
      if (axiosError.response?.status === 401) {
        cookieHelper.remove("access_token");
      }

      return rejectWithValue(axiosError);
    }
  }
);

export const changeIsFindJob = createAsyncThunk(
  "auth/changeisfindjob",
  async (_, { rejectWithValue }) => {
    try {
      // thay đổi trạng thái findjob
      await authService.changeIsFindJob();

      // Gọi service để lấy thông tin user
      return await authService.getProfile();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // Nếu lỗi 401 token không hợp lệ logout
      if (axiosError.response?.status === 401) {
        cookieHelper.remove("access_token");
      }

      return rejectWithValue(axiosError);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      cookieHelper.remove("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login thunk
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Register thunk
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      // CheckAuth thunk
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
