"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Dropdown,
  Modal,
  message,
  Avatar,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  ReloadOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { UiButton } from "@/components/ui/base/UiButton";
import { IUser } from "@/types/auth/User";

// Sample users data
const sampleUsers: IUser[] = [
  {
    id: "1",
    email: "admin@codinviec.com",
    firstName: "Admin",
    lastName: "System",
    role: "ROLE_ADMIN",
    phone: "0901234567",
    createdDate: "2024-01-01",
  },
  {
    id: "2",
    email: "nguyenvana@gmail.com",
    firstName: "Nguyễn Văn",
    lastName: "A",
    role: "ROLE_USER",
    phone: "0912345678",
    isFindJob: true,
    createdDate: "2024-01-10",
  },
  {
    id: "3",
    email: "tranthib@gmail.com",
    firstName: "Trần Thị",
    lastName: "B",
    role: "ROLE_USER",
    phone: "0923456789",
    isFindJob: false,
    createdDate: "2024-01-12",
  },
  {
    id: "4",
    email: "employer@fpt.com",
    firstName: "HR",
    lastName: "Manager",
    role: "ROLE_EMPLOYER",
    companyId: "1",
    phone: "0934567890",
    createdDate: "2024-01-08",
  },
  {
    id: "5",
    email: "suspended@test.com",
    firstName: "Test",
    lastName: "User",
    role: "ROLE_USER",
    createdDate: "2024-01-15",
  },
  {
    id: "6",
    email: "lethic@gmail.com",
    firstName: "Lê Thị",
    lastName: "C",
    role: "ROLE_USER",
    phone: "0945678901",
    isFindJob: true,
    createdDate: "2024-01-14",
  },
  {
    id: "7",
    email: "hr.vng@vng.com.vn",
    firstName: "Nguyễn",
    lastName: "Tuyển Dụng",
    role: "ROLE_EMPLOYER",
    companyId: "2",
    phone: "0956789012",
    createdDate: "2024-01-13",
  },
  {
    id: "8",
    email: "phamvand@gmail.com",
    firstName: "Phạm Văn",
    lastName: "D",
    role: "ROLE_USER",
    phone: "0967890123",
    isFindJob: true,
    createdDate: "2024-01-11",
  },
  {
    id: "9",
    email: "pending@test.com",
    firstName: "Pending",
    lastName: "Account",
    role: "ROLE_USER",
    createdDate: "2024-01-16",
  },
  {
    id: "10",
    email: "hr.shopee@shopee.vn",
    firstName: "Shopee",
    lastName: "Recruiter",
    role: "ROLE_EMPLOYER",
    companyId: "3",
    phone: "0978901234",
    createdDate: "2024-01-09",
  },
];

const roleConfig = {
  ROLE_ADMIN: { label: "Admin", color: "red" },
  ROLE_EMPLOYER: { label: "Nhà tuyển dụng", color: "blue" },
  ROLE_USER: { label: "Ứng viên", color: "green" },
};

const statusConfig = {
  active: { label: "Hoạt động", color: "success" },
  suspended: { label: "Bị khóa", color: "error" },
  pending: { label: "Chờ xác thực", color: "warning" },
};

interface UserWithStatus extends IUser {
  status?: "active" | "suspended" | "pending";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserWithStatus[]>(
    sampleUsers.map((u) => ({ ...u, status: u.id === "5" ? "suspended" : u.id === "9" ? "pending" : "active" }))
  );
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterRole, setFilterRole] = useState<string | undefined>();
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: "Bạn có chắc chắn muốn xóa người dùng này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        setUsers(users.filter((user) => user.id !== id));
        message.success("Đã xóa người dùng!");
      },
    });
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus as any } : user
      )
    );
    message.success(
      newStatus === "active" ? "Đã mở khóa tài khoản!" : "Đã khóa tài khoản!"
    );
  };

  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một người dùng!");
      return;
    }

    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} người dùng đã chọn?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        setUsers(users.filter((user) => !selectedRowKeys.includes(user.id)));
        setSelectedRowKeys([]);
        message.success(`Đã xóa ${selectedRowKeys.length} người dùng!`);
      },
    });
  };

  const columns: ColumnsType<UserWithStatus> = [
    {
      title: "Người dùng",
      key: "user",
      width: 280,
      render: (_, record) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar
            size={42}
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
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
      render: (role: keyof typeof roleConfig) => (
        <Tag color={roleConfig[role]?.color} className="!rounded-lg">
          {roleConfig[role]?.label || role}
        </Tag>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 130,
      render: (phone) => phone || <span className="text-gray-400">-</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: keyof typeof statusConfig) => (
        <Tag color={statusConfig[status]?.color} className="!rounded-lg">
          {statusConfig[status]?.label || status}
        </Tag>
      ),
    },
    {
      title: "Tìm việc",
      dataIndex: "isFindJob",
      key: "isFindJob",
      width: 100,
      align: "center",
      render: (isFindJob, record) =>
        record.role === "ROLE_USER" ? (
          isFindJob ? (
            <Tag color="green" className="!rounded-lg">
              Đang tìm
            </Tag>
          ) : (
            <Tag className="!rounded-lg">Không</Tag>
          )
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 120,
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 100,
      fixed: "right",
      render: (_, record) => (
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
                label:
                  record.status === "active" ? "Khóa tài khoản" : "Mở khóa",
                icon:
                  record.status === "active" ? (
                    <LockOutlined className="text-orange-500" />
                  ) : (
                    <UnlockOutlined className="text-green-500" />
                  ),
                onClick: () =>
                  handleToggleStatus(record.id, record.status || "active"),
              },
              {
                key: "delete",
                label: "Xóa",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => handleDelete(record.id),
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

  const filteredUsers = users.filter((user) => {
    const matchKeyword =
      !searchKeyword ||
      user.email?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    const matchRole = !filterRole || user.role === filterRole;
    const matchStatus = !filterStatus || user.status === filterStatus;
    return matchKeyword && matchRole && matchStatus;
  });

  return (
    <div className="space-y-6">
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
            Tổng cộng {filteredUsers.length} người dùng
          </p>
        </div>
        <UiButton
          variantCustom="primary"
          className="!h-10"
          onClick={() =>
            message.info("Chức năng thêm người dùng đang phát triển")
          }
        >
          <PlusOutlined className="mr-1" />
          Thêm người dùng
        </UiButton>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Tổng người dùng</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {users.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Ứng viên</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {users.filter((u) => u.role === "ROLE_USER").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Nhà tuyển dụng</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {users.filter((u) => u.role === "ROLE_EMPLOYER").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Bị khóa</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {users.filter((u) => u.status === "suspended").length}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-primary-100"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Tìm kiếm theo tên, email..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="sm:w-80 !rounded-xl"
            allowClear
          />
          <Select
            placeholder="Vai trò"
            value={filterRole}
            onChange={setFilterRole}
            allowClear
            className="sm:w-40 [&_.ant-select-selector]:!rounded-xl"
            options={[
              { value: "ROLE_ADMIN", label: "Admin" },
              { value: "ROLE_EMPLOYER", label: "Nhà tuyển dụng" },
              { value: "ROLE_USER", label: "Ứng viên" },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            className="sm:w-40 [&_.ant-select-selector]:!rounded-xl"
            options={[
              { value: "active", label: "Hoạt động" },
              { value: "suspended", label: "Bị khóa" },
              { value: "pending", label: "Chờ xác thực" },
            ]}
          />
          <div className="flex gap-2 sm:ml-auto">
            <Tooltip title="Lọc nâng cao">
              <Button icon={<FilterOutlined />} className="!rounded-xl" />
            </Tooltip>
            <Tooltip title="Làm mới">
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  setSearchKeyword("");
                  setFilterRole(undefined);
                  setFilterStatus(undefined);
                }}
                className="!rounded-xl"
              />
            </Tooltip>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <div className="mt-4 pt-4 border-t border-primary-100 flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Đã chọn <strong>{selectedRowKeys.length}</strong> người dùng
            </span>
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleBulkDelete}
            >
              Xóa đã chọn
            </Button>
            <Button size="small" onClick={() => setSelectedRowKeys([])}>
              Bỏ chọn
            </Button>
          </div>
        )}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden"
      >
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
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
    </div>
  );
}

