"use client";

import Container from "@/components/ui/Container";
import { UIButton } from "@/components/ui/UIButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { authService } from "@/services/auth/authService";
import { RootState } from "@/store";
import { checkAuth } from "@/store/slice/auth/authSlice";
import { IUser } from "@/types/auth/User";
import { formatToLocalDateTime } from "@/utils/DateHelper";
import { alert } from "@/utils/notification";
import {
  CameraOutlined,
  EditOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import {
  Avatar,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Switch,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Option } = Select;

type FormPropsProfiles = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: Date;
  address?: string;
  education: string;
  websiteLink: string;
};

const optionGender = [
  {
    value: "male",
    label: "Nam",
  },
  { value: "female", label: "Nữ" },
];

export default function ProfileClients() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=/profile");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user?.gender,
        birthDate: user.birthDate ? dayjs(user.birthDate) : null,
        address: user.address,
        websiteLink: user.websiteLink,
        education: user.education,
        isFindJob: user.findJob ?? false,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values: FormPropsProfiles) => {
    try {
      console.log("values", values);
      let isChange = false;

      for (const key in values) {
        const k = key as keyof FormPropsProfiles;
        if (user?.[k]) {
          if (k === "birthDate") {
            if (formatToLocalDateTime(values[k]) !== user[k]) {
              isChange = true;
            }
            break;
          }
          if (values[k]?.toLowerCase() !== user[k].toLowerCase()) {
            isChange = true;
          }
        }
      }

      if (!isChange && !avatarFile) {
        setSubmitting(false);
        setEditing(false);
        alert.warning("Không có gì để cập nhật!");
        return;
      }

      setSubmitting(true);
      const payload = {
        email: values?.email?.trim() || "",
        education: values?.education?.trim() || "",
        firstName: values?.firstName?.trim() || "",
        gender: values?.gender?.trim() || "",
        lastName: values?.lastName?.trim() || "",
        address: values?.address?.trim() || "",
        phone: values?.phone?.trim() || "",
        websiteLink: values?.websiteLink?.trim() || "",
        birthDate: values?.birthDate
          ? formatToLocalDateTime(values.birthDate)
          : "",
      };

      const userUpdate = await authService.updateProfile(payload);
      if (userUpdate?.id) {
        if (avatarFile) {
          const formData = new FormData();
          formData.append("avatarFile", avatarFile);
          const updateAvatar = await authService.updateAvatar(formData);
          if (updateAvatar?.id) {
            alert.success("Cập nhật hồ sơ thành công!");
            dispatch(checkAuth()).unwrap();
          }
        }
      }

      setEditing(false);
    } catch (error) {
      alert.error("Cập nhật hồ sơ thành công!");
    } finally {
      setSubmitting(false);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user?.gender,
        birthDate: user.birthDate ? dayjs(user.birthDate) : null,
        address: user.address,
        websiteLink: user.websiteLink,
        education: user.education,
        isFindJob: user.findJob ?? false,
      });
    }
    setEditing(false);
    setAvatarFile(null);
    setPreviewUrl(null);
  };
  const handleChange: UploadProps["onChange"] = (info) => {
    const file = info.file as unknown as File;
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }
  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.email?.split("@")[0] || "User";

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Hồ sơ của tôi</h1>
            {!editing && (
              <UIButton
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setEditing(true)}
                className="!h-10 !rounded-xl"
              >
                Chỉnh sửa
              </UIButton>
            )}
          </div>
          <p className="text-gray-600">
            Quản lý thông tin cá nhân và tài khoản của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="border border-primary-100 rounded-2xl">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar
                    size={120}
                    src={previewUrl || user.avatar}
                    className="bg-gradient-to-br from-primary-400 to-primary-600 border-4 border-white shadow-lg"
                  >
                    {/* Avatar theo chữ */}
                    {!user.avatar && !avatarFile && (
                      <span className="text-white font-bold text-4xl">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </Avatar>
                  {editing && (
                    <Upload
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={handleChange}
                    >
                      <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors shadow-lg border-2 border-white">
                        <CameraOutlined />
                      </button>
                    </Upload>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {displayName}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{user.email}</p>
                {user.role && (
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                    {user.role === "ROLE_ADMIN"
                      ? "Admin"
                      : user.role === "ROLE_EMPLOYER"
                      ? "Nhà tuyển dụng"
                      : "Ứng viên"}
                  </span>
                )}
              </div>
            </Card>
            <div>SKILLS soft</div>
            <div>SKILLS core</div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border border-primary-100 rounded-2xl">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                disabled={!editing}
              >
                {/* Personal Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin cá nhân
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Form.Item
                      name="firstName"
                      label="Họ"
                      rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Nhập họ"
                        className="!rounded-xl"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="lastName"
                      label="Tên"
                      rules={[
                        { required: true, message: "Vui lòng nhập tên!" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Nhập tên"
                        className="!rounded-xl"
                        size="large"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="text-gray-400" />}
                      placeholder="Email"
                      className="!rounded-xl"
                      size="large"
                      disabled
                    />
                  </Form.Item>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Form.Item name="phone" label="Số điện thoại">
                      <Input
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        placeholder="Số điện thoại"
                        className="!rounded-xl"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item name="gender" label="Giới tính">
                      <Select
                        placeholder="Chọn giới tính"
                        className="!rounded-xl"
                        size="large"
                        options={optionGender}
                      ></Select>
                    </Form.Item>
                  </div>

                  <Form.Item name="birthDate" label="Ngày sinh">
                    <DatePicker
                      className="w-full !rounded-xl"
                      size="large"
                      format="DD/MM/YYYY"
                      placeholder="Chọn ngày sinh"
                    />
                  </Form.Item>

                  <Form.Item name="address" label="Địa điểm">
                    <Input
                      placeholder="Gò vắp..."
                      className="!rounded-xl"
                      size="large"
                    />
                  </Form.Item>
                </div>

                <Divider />

                {/* Additional Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin bổ sung
                  </h3>

                  <Form.Item name="education" label="Học vấn">
                    <Input
                      placeholder="VD: Đại học, Cao đẳng..."
                      className="!rounded-xl"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="websiteLink" label="Website/Link cá nhân">
                    <Input
                      prefix={<GlobalOutlined className="text-gray-400" />}
                      placeholder="https://..."
                      className="!rounded-xl"
                      size="large"
                    />
                  </Form.Item>

                  {user.role === "ROLE_USER" && (
                    <Form.Item
                      name="isFindJob"
                      label="Đang tìm việc"
                      valuePropName="checked"
                    >
                      <Switch
                        checkedChildren="Có"
                        unCheckedChildren="Không"
                        className="!bg-gray-300 [&.ant-switch-checked]:!bg-green-500"
                      />
                    </Form.Item>
                  )}
                </div>

                {/* Action Buttons */}
                {editing && (
                  <div className="flex gap-3 justify-end pt-4 border-t border-primary-100">
                    <UIButton
                      onClick={handleCancel}
                      size="large"
                      className="!rounded-xl"
                    >
                      Hủy
                    </UIButton>
                    <UIButton
                      htmlType="submit"
                      variantCustom="primary"
                      className="!h-10"
                      loading={submitting}
                    >
                      <SaveOutlined className="mr-1" />
                      Lưu thay đổi
                    </UIButton>
                  </div>
                )}
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
