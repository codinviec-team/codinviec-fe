"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";
import { logout } from "@/store/slice/auth/authSlice";
import { authService } from "@/services/auth/authService";
import { PATHS } from "@/constants/paths";
import {toast} from "@/utils/notification";

export function useLogout() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());

            toast.success("Đăng xuất thành công", "Hẹn gặp lại!");
            router.push(PATHS.SIGNIN);
        } catch (error) {
            dispatch(logout());
            router.push(PATHS.SIGNIN);
        }
    };

    return { handleLogout };
}

