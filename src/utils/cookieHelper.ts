import { TIMECOOKIES } from "@/constants/token";

type StorageValue = string | number | boolean | object | null;
import Cookies from "js-cookie";

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

        let expiresDays: number;
        if (expires !== undefined) {
            expiresDays = expires;
        } else {
            expiresDays = TIMECOOKIES.accessToken;
        }

        Cookies.set(key, storedvalue, { expires: expiresDays });
    },

    remove(key: string) {
        Cookies.remove(key);
    }
}