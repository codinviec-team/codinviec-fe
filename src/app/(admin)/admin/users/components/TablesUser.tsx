import { IUser } from "@/types/auth/User";
import { formatToDDMMYYYY } from "@/utils/DateHelper";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  MailOutlined,
  MoreOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, message, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { motion } from "framer-motion";
import React, { useState } from "react";

type TableUserType = {
  dataUser: IUser[];
  selectedRowKeys: any;
  setSelectedRowKeys: any;
  loadingPage: boolean;
  handleToggleBlock: (user: IUser) => void;
  handleDeleteUser: (user: IUser) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const TableUser = ({
  dataUser,
  selectedRowKeys,
  setSelectedRowKeys,
  loadingPage,
  handleToggleBlock,
  handleDeleteUser,
}: TableUserType) => {
  const columns: ColumnsType<IUser> = [
    {
      title: "Người dùng",
      key: "user",
      width: 280,
      render: (value, record, index) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar
            size={42}
            src={record?.avatar}
            icon={!record?.avatar && <UserOutlined />}
            className="bg-gradient-to-br from-primary-400 to-primary-600"
          />
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">
              {record.firstName} {record.lastName}
            </p>
            <p className="text-sm text-gray-500 truncate">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (value, record, index) => {
        const role = record?.role?.roleName ?? "gray";

        const color =
          role === "ADMIN"
            ? "red"
            : role === "USER"
            ? "green"
            : role === "HR"
            ? "blue"
            : "default";

        const roleNameText =
          record?.role?.roleName === "ADMIN"
            ? "Quản trị viên"
            : role === "USER"
            ? "Người dùng"
            : role === "HR"
            ? "Người tuyển dụng"
            : "default";

        return (
          <Tag className="!rounded-lg" color={color}>
            {roleNameText || "Chưa xác định"}
          </Tag>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 130,
      render: (value, record, index) =>
        record?.phone || <span className="text-gray-400">-</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (value, record, index) =>
        record?.block === false ? (
          <Tag className="!rounded-lg" color={"green"}>
            Hoạt động{" "}
          </Tag>
        ) : (
          <Tag className="!rounded-lg" color={"red"}>
            <LockOutlined className="mr-[2px]" />
            Bị khóa
          </Tag>
        ),
    },
    {
      title: "Tìm việc",
      dataIndex: "findJob",
      key: "findJob",
      width: 100,
      align: "center",
      render: (value, record, index) =>
        record?.findJob === true ? (
          <Tag color="green" className="!rounded-lg">
            Đang tìm
          </Tag>
        ) : (
          <Tag className="!rounded-lg">Không</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 120,
      render: (value, record, index) =>
        record?.createdDate ? formatToDDMMYYYY(record.createdDate) : "-",
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 100,
      fixed: "right",
      render: (value, record, index) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "Xem chi tiết",
                icon: <EyeOutlined />,
                onClick: () => message.info("Chức năng đang phát triển"),
              },
              {
                key: "edit",
                label: "Chỉnh sửa",
                icon: <EditOutlined />,
                onClick: () => message.info("Chức năng đang phát triển"),
              },
              {
                key: "email",
                label: "Gửi email",
                icon: <MailOutlined />,
                onClick: () => message.info("Chức năng đang phát triển"),
              },
              {
                type: "divider",
              },
              {
                key: "toggle",
                label: record.block === true ? "Mở khóa" : "Khóa tài khoản",
                icon:
                  record.block === true ? (
                    <UnlockOutlined className="text-green-500" />
                  ) : (
                    <LockOutlined className="text-orange-500" />
                  ),
                onClick: () => handleToggleBlock(record),
              },
              {
                key: "delete",
                label: "Xóa",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => handleDeleteUser(record),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden"
    >
      <Table
        columns={columns}
        dataSource={dataUser}
        rowKey="id"
        loading={loadingPage}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} người dùng`,
        }}
        scroll={{ x: 1000 }}
        className="[&_.ant-table-thead>tr>th]:!bg-primary-50 [&_.ant-table-thead>tr>th]:!text-gray-700 [&_.ant-table-thead>tr>th]:!font-semibold"
      />
    </motion.div>
  );
};
export default TableUser;
