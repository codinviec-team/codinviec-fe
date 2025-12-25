"use client";
import { UIButton } from "@/components/ui/UIButton";
import UserService from "@/services/auth/UserServices";
import { RoleType } from "@/types/auth/Role";
import { SaveUserType } from "@/types/auth/User";
import { CompanyType } from "@/types/home/company/CompanyType";
import { formatToLocalDateTime } from "@/utils/DateHelper";
import { alert } from "@/utils/notification";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, FormProps, Input, Modal, Select } from "antd";
import { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { GeneralUserType } from "../page";

type HeaderUserAdminType = {
  generalUserInfo: GeneralUserType;
  dataCompany: CompanyType[];
  dataRoles: RoleType[];
  loadingPage: boolean;
  refetchUserData: () => void;
  handleOpenEditUser: (open: boolean) => void;
  openEditUser: boolean;
  editUserInfo: (UserEditFormValues & { id: string }) | null;
  handleChangeEditUserInfo: (
    userInfo: (UserEditFormValues & { id: string }) | null
  ) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export type UserEditFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
  birthDate?: Dayjs;
  education?: string;
  address?: string;
  websiteLink?: string;
  companyId: string;
  roleId: string;
};

const HeaderUserAdmin = ({
  generalUserInfo,
  dataCompany,
  dataRoles,
  loadingPage,
  refetchUserData,
  handleOpenEditUser,
  openEditUser,
  editUserInfo,
  handleChangeEditUserInfo,
}: HeaderUserAdminType) => {
  const [form] = Form.useForm();

  const onFinishUserEdit: FormProps<UserEditFormValues>["onFinish"] = async (
    values
  ) => {
    const {
      email,
      firstName,
      lastName,
      phone,
      gender,
      birthDate,
      education,
      address,
      websiteLink,
      companyId,
      roleId,
    } = values;

    const payload: SaveUserType = {
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phone || "",
      gender: gender || "",
      education: education || "",
      address: address || "",
      websiteLink: websiteLink || "",
      birthDate: formatToLocalDateTime(birthDate) || "",
      companyId: companyId || null,
      roleId: roleId || "",
    };

    console.log("editUserInfo", editUserInfo);
    if (!editUserInfo) {
      // tạo mới user
      console.log("payload tạo mới", payload);
      const userData = await UserService.saveUser(payload);
      if (userData?.id) {
        alert.success("Thêm user thành công!");
        refetchUserData?.();
      } else {
        alert.error("Thêm user thất bại!");
      }
    } else {
      console.log("payload cập nhật", payload);

      // cập nhật user
      const userData = await UserService.updateUser({
        ...payload,
        id: editUserInfo?.id,
      });
      if (userData?.id) {
        alert.success("Cập nhật user thành công!");
        refetchUserData?.();
      } else {
        alert.error("Cập nhật user thất bại!");
      }
      handleChangeEditUserInfo(null);
    }
    handleOpenEditUser?.(false);
  };

  useEffect(() => {
    if (editUserInfo && editUserInfo?.id) {
      form.setFieldsValue({ ...editUserInfo });
    } else {
      form.resetFields();
    }
  }, [editUserInfo]);

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý người dùng
          </h1>
          <p className="text-gray-600 mt-1">
            Tổng cộng {generalUserInfo.total} người dùng
          </p>
        </div>
        <UIButton
          variantCustom="primary"
          className="!h-10"
          onClick={() => handleOpenEditUser(true)}
        >
          <PlusOutlined className="mr-1" />
          Thêm người dùng
        </UIButton>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Admin</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {generalUserInfo.admin}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Ứng viên</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {generalUserInfo.candidates}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Nhà tuyển dụng</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {generalUserInfo.hired}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Bị khóa</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {generalUserInfo.blocked}
          </p>
        </div>
      </motion.div>

      <Modal
        title="Thêm người dùng"
        open={openEditUser}
        onCancel={() => {
          handleOpenEditUser(false);
          handleChangeEditUserInfo(null);
        }}
        onOk={() => form.submit()}
        confirmLoading={loadingPage}
        width={700}
      >
        <Form layout="vertical" form={form} onFinish={onFinishUserEdit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email không được để trống" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" disabled={!!editUserInfo?.email} />
          </Form.Item>

          <div className="flex gap-[20px]">
            <Form.Item
              label="Họ"
              name="firstName"
              className="basis-1/2"
              rules={[
                { required: true, message: "Họ không được để trống" },
                { min: 1, max: 50, message: "Họ từ 1 - 50 ký tự" },
              ]}
            >
              <Input placeholder="Nhập họ" />
            </Form.Item>

            <Form.Item
              label="Tên"
              name="lastName"
              className="basis-1/2"
              rules={[
                { required: true, message: "Tên không được để trống" },
                { min: 1, max: 50, message: "Tên từ 1 - 50 ký tự" },
              ]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
          </div>

          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <div className="flex gap-[20px]">
            <Form.Item label="Giới tính" name="gender" className="basis-1/2">
              <Select
                placeholder="Chọn giới tính"
                options={[
                  { label: "Nam", value: "male" },
                  { label: "Nữ", value: "female" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Ngày sinh" name="birthDate" className="basis-1/2">
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </div>

          <Form.Item label="Trình độ học vấn" name="education">
            <Input placeholder="Nhập trình độ" />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item label="Website" name="websiteLink">
            <Input placeholder="Nhập website" />
          </Form.Item>

          <div className="flex gap-[20px]">
            <Form.Item label="Công ty" name="companyId" className="basis-1/2">
              <Select
                placeholder="Chọn công ty"
                options={[
                  { label: "— Không chọn —", value: "" },
                  ...dataCompany.map((c) => ({
                    ...c,
                    label: c.name,
                    value: c.id,
                  })),
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Role"
              name="roleId"
              rules={[{ required: true, message: "Role không được để trống" }]}
              className="basis-1/2"
            >
              <Select
                placeholder="Chọn quyền"
                options={dataRoles.map((r) => ({
                  ...r,
                  label: r.roleName,
                  value: r.id,
                }))}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default HeaderUserAdmin;
