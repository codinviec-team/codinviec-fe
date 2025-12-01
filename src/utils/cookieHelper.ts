import { TIMECOOKIES } from "@/constants/token";

type StorageValue = string | number | boolean | object | null;
import Cookies from "js-cookie";

// Xác định môi trường production
const isProduction = process.env.NODE_ENV === "production";

// Cookie options cho production (Vercel)
const getCookieOptions = (expires: number): Cookies.CookieAttributes => ({
    expires,
    path: "/",
    sameSite: "lax",
    secure: isProduction, // Chỉ set secure trên HTTPS (production)
});

export const cookieHelper = {
    get(key: string): StorageValue | null {
        const value = Cookies.get(key);
        if (!value) return null;

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    },

    set(key: string, value: StorageValue, expires?: number) {
        const storedvalue =
            typeof value === "string" ? value : JSON.stringify(value);

        const expiresDays = expires !== undefined ? expires : TIMECOOKIES.accessToken;

        Cookies.set(key, storedvalue, getCookieOptions(expiresDays));
    },

    remove(key: string) {
        Cookies.remove(key, { path: "/" });
    }
}
