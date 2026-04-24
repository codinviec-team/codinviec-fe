"use client";
import { UIButton } from "@/components/UIButton";
import Container from "@/components/Container";
import { PATHS } from "@/constants/paths";
import { ILogin } from "@/types/Login";
import { Form, FormProps, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { login } from "@/store/slice/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { alert } from "@/utils/notification";
import { getGoogleErrorMessages } from "@/utils/errorGoogle";

type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const [submitting, setSubmitting] = useState(false);

  const handleGoogleLogin = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      alert.error(
        "Lỗi cấu hình",
        "Không tìm thấy cấu hình API. Vui lòng liên hệ quản trị viên.",
      );
      return;
    }
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  // Redirect về HOME nếu đã đăng nhập (AuthProvider đã gọi checkAuth khi mount)
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(PATHS.HOME);
    }
  }, [isAuthenticated, loading, router]);

  // Xử lý lỗi từ Google OAuth callback
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      alert.error("Đăng nhập thất bại", getGoogleErrorMessages(error));
      router.replace(PATHS.SIGNIN);
    }
  }, [searchParams, router]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const loginData: ILogin = {
      email: values.email!,
      password: values.password!,
    };

    setSubmitting(true);
    try {
      await dispatch(login(loginData)).unwrap();
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {};

  if (loading || isAuthenticated) {
    return null;
  }

  return (
    <>
      <Container className="flex justify-center items-center flex-1">
        <div className="flex gap-[20px] w-full">
          <div className="signin_left basis-1/2 flex-shrink-0 max-md:basis-full">
            <h1 className="mb-[20px] text-[28px] text-accent-300 font-semibold max-md:text-center">
              Chào mừng đến với CodinViec
            </h1>
            <UIButton
              variantCustom="outlineGoogle"
              className="!mb-[20px] !w-full"
              onClick={handleGoogleLogin}
              disabled={submitting}
            >
              <Image
                src="/google-icon.svg"
                alt="google icon"
                width={20}
                height={20}
              />
              Sign In with Google
            </UIButton>
            {/* line */}
            <div className="line bg-text-default w-full relative h-[1px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-50 flex justify-center items-center px-[5px]">
                or
              </div>
            </div>
            <Form
              className="!mt-[15px]"
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Email của bạn"
                name="email"
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
                style={{ marginBottom: "10px" }}
              >
                <Input size="large" placeholder="codinviec@gmail.com" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mật khẩu "
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                style={{ marginBottom: "10px" }}
              >
                <Input.Password
                  className="w-full"
                  size="large"
                  placeholder="******"
                />
              </Form.Item>

              <Form.Item label={null} style={{ marginTop: "20px" }}>
                <UIButton
                  className="w-full"
                  htmlType="submit"
                  loading={submitting}
                  disabled={submitting}
                >
                  Đăng nhập với email
                </UIButton>

                <p className="mt-[10px] text-[14px] ">
                  bạn không có tài khoản?{" "}
                  <Link href={PATHS.SIGNUP} className="text-text-link">
                    {" "}
                    Đăng ký ngay!
                  </Link>
                </p>
              </Form.Item>
            </Form>
          </div>
          <div className="signin_right basis-1/2 flex justify-center items-center max-md:!hidden">
            <Image
              src="/login-image.svg"
              alt="login image"
              width={100}
              height={200}
              className="w-[70%] h-auto max-lg:w-full"
            />
          </div>
        </div>
      </Container>
    </>
  );
};
export default LoginPage;
