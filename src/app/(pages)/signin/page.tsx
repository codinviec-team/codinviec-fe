"use client";
import { UiButton } from "@/components/ui/base/UiButton";
import ContainerPage from "@/components/ui/container/page";
import PATH from "@/constant/path";
import { Form, FormProps, Input } from "antd";
import Image from "next/image";
import Link from "next/link";

type FieldType = {
  email?: string;
  password?: string;
};

const signinPage = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ContainerPage className="flex justify-center items-center">
        <div className="flex gap-[20px] w-full">
          <div className="signin_left basis-1/2 flex-shrink-0 max-md:basis-full">
            <h1 className="mb-[20px] text-[28px] text-[var(--color-accent-300)] font-semibold max-md:text-center">
              Chào mừng đến với FindJob
            </h1>
            <UiButton
              variantCustom="outlineGoogle"
              className="!mb-[20px] !w-full"
            >
              <Image
                src="/google-icon.svg"
                alt="google icon"
                width={20}
                height={20}
              />
              Sign In with Google
            </UiButton>
            {/* line */}
            <div className="line bg-[var(--text-default)] w-full relative h-[1px]">
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
                <Input size="large" placeholder="findjob@gmail.com" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mật khẩu "
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 12, message: "Mật khẩu phải có ít nhất 12 ký tự!" },
                ]}
                style={{ marginBottom: "10px" }}
              >
                <Input.Password
                  className="w-full"
                  size="large"
                  placeholder="******"
                />
              </Form.Item>

              <Form.Item label={null} style={{ marginTop: "20px" }}>
                <UiButton className="w-full" htmlType="submit">
                  Đăng nhập với email
                </UiButton>

                <p className="mt-[10px] text-[14px] ">
                  bạn không có tài khoản?{" "}
                  <Link href={PATH.SIGNUP} className="text-[var(--text-link)]">
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
      </ContainerPage>
    </>
  );
};
export default signinPage;
