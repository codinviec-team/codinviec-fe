"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { checkAuth } from "@/store/slice/auth/authSlice";
import { cookieHelper } from "@/utils/cookieHelper";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Kiểm tra nếu có token thì gọi checkAuth để khôi phục session
        const token = cookieHelper.get("access_token");
        if (token) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

    return <>{children}</>;
}


