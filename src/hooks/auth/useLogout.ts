"use client";

import { PATHS } from "@/constants/paths";
import { useAppDispatch } from "@/hooks/hooks";
import { authService } from "@/services/auth/authService";
import { logout } from "@/store/slice/auth/authSlice";
import { useRouter } from "next/navigation";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      router.push(PATHS.SIGNIN);
    } catch (error) {
      dispatch(logout());
      router.push(PATHS.SIGNIN);
    }
  };

  return { handleLogout };
}
