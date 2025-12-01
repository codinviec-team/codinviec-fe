"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, alert } from "@/utils/notification";
import { cookieHelper } from "@/utils/cookieHelper";

export default function GlobalHandler() {
    const router = useRouter();

    useEffect(() => {
        const handleError = (e: CustomEvent<{ status: number; message?: string }>) => {
            const { status, message } = e.detail;

            // Lấy message mặc định nếu không có
            const defaultMessages: Record<number, string> = {
                0: "Không thể kết nối với server. Vui lòng kiểm tra kết nối internet và thử lại!",
                400: "Vui lòng kiểm tra lại thông tin đã nhập!",
                401: "Tài khoản hoặc mật khẩu không đúng!",
                403: "Bạn không có quyền thực hiện hành động này. Vui lòng thực hiện lại sau!",
                404: "Dữ liệu không tồn tại!",
                409: "Dữ liệu đã tồn tại hoặc bị xung đột. Vui lòng kiểm tra lại!",
                422: "Thông tin bạn nhập không đúng định dạng. Vui lòng kiểm tra lại!",
                429: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi một chút rồi thử lại!",
                500: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục!",
                502: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục!",
                503: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục!",
            };
            const errorMessage = message || defaultMessages[status] || "Đã xảy ra lỗi không xác định. Vui lòng thử lại sau!";

            switch (status) {
                case 0:
                    alert.error("Lỗi kết nối", errorMessage);
                    break;
                case 400:
                    toast.warning("Dữ liệu không hợp lệ", errorMessage);
                    break;
                case 401:
                    alert.error("Đăng nhập thất bại", errorMessage);
                    break;
                case 403:
                    alert.warning("Không có quyền truy cập", errorMessage);
                    break;
                case 404:
                    toast.info("Không tìm thấy", errorMessage);
                    break;
                case 409:
                    alert.error("Đăng nhập thất bại", errorMessage);
                    break;
                case 422:
                    toast.warning("Dữ liệu không hợp lệ", errorMessage);
                    break;
                case 429:
                    toast.error("Quá nhiều yêu cầu", errorMessage);
                    break;
                case 500:
                case 502:
                case 503:
                    alert.error("Lỗi hệ thống", errorMessage);
                    break;
                default:
                    toast.error("Đã xảy ra lỗi", errorMessage);
            }
        };

        const logout = async (e: Event) => {
            const customEvent = e as CustomEvent<{ message?: string }>;
            const message = customEvent.detail?.message || "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!";

            cookieHelper.remove("access_token");

            // Logout với redirect - Cần xác nhận → Alert
            await alert.warning("Phiên đăng nhập hết hạn", message);
            router.push("/login");
        };

        window.addEventListener("api-error", handleError as EventListener);
        window.addEventListener("logout", logout);

        return () => {
            window.removeEventListener("api-error", handleError as EventListener);
            window.removeEventListener("logout", logout);
        };
    }, [router]);

    return null;
}

