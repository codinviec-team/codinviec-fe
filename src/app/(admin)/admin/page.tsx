"use client";

import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import {
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  FallOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Statistic, Row, Col, Table, Tag, Progress } from "antd";
import type { ColumnsType } from "antd/es/table";

// Sample data for recent activities
const recentJobs = [
  {
    key: "1",
    title: "Senior Frontend Developer",
    company: "FPT Software",
    status: "approved",
    views: 1250,
    applications: 45,
    date: "2024-01-15",
  },
  {
    key: "2",
    title: "Backend Developer (NodeJS)",
    company: "VNG Corporation",
    status: "pending",
    views: 890,
    applications: 32,
    date: "2024-01-14",
  },
  {
    key: "3",
    title: "DevOps Engineer",
    company: "Shopee Vietnam",
    status: "approved",
    views: 650,
    applications: 18,
    date: "2024-01-13",
  },
  {
    key: "4",
    title: "Mobile Developer (React Native)",
    company: "MoMo",
    status: "rejected",
    views: 420,
    applications: 12,
    date: "2024-01-12",
  },
];

const statusConfig = {
  approved: { label: "Đã duyệt", color: "success" },
  pending: { label: "Chờ duyệt", color: "warning" },
  rejected: { label: "Từ chối", color: "error" },
};

export default function AdminDashboardPage() {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "Admin";

  const columns: ColumnsType<any> = [
    {
      title: "Việc làm",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.company}</div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusConfig) => (
        <Tag color={statusConfig[status].color} className="!rounded-lg">
          {statusConfig[status].label}
        </Tag>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      align: "center",
      render: (views) => (
        <span className="text-gray-600">{views.toLocaleString()}</span>
      ),
    },
    {
      title: "Ứng tuyển",
      dataIndex: "applications",
      key: "applications",
      align: "center",
      render: (apps) => (
        <span className="font-medium text-primary-600">{apps}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Xin chào, {displayName}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Đây là tổng quan về hệ thống của bạn
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-shadow"
              bordered={false}
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Tổng người dùng
                  </span>
                }
                value={1284}
                prefix={
                  <UserOutlined className="text-primary-600 text-2xl" />
                }
                suffix={
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <RiseOutlined />
                    <span>12%</span>
                  </div>
                }
                valueStyle={{ color: "#5a3fa6", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-shadow"
              bordered={false}
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Việc làm đang tuyển
                  </span>
                }
                value={352}
                prefix={
                  <FileTextOutlined className="text-accent-600 text-2xl" />
                }
                suffix={
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <RiseOutlined />
                    <span>8%</span>
                  </div>
                }
                valueStyle={{ color: "#4db6ac", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-shadow"
              bordered={false}
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Lượt xem hôm nay
                  </span>
                }
                value={8945}
                prefix={<EyeOutlined className="text-blue-600 text-2xl" />}
                suffix={
                  <div className="flex items-center gap-1 text-xs text-red-600">
                    <FallOutlined />
                    <span>3%</span>
                  </div>
                }
                valueStyle={{ color: "#4b5fbf", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-shadow"
              bordered={false}
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Chờ phê duyệt
                  </span>
                }
                value={23}
                prefix={
                  <ClockCircleOutlined className="text-orange-600 text-2xl" />
                }
                valueStyle={{ color: "#f97316", fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* Charts Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card
              title={
                <span className="text-gray-900 font-semibold">
                  Việc làm gần đây
                </span>
              }
              className="border border-primary-100 rounded-2xl"
              bordered={false}
            >
              <Table
                columns={columns}
                dataSource={recentJobs}
                pagination={false}
                size="small"
                className="[&_.ant-table-thead>tr>th]:!bg-primary-50 [&_.ant-table-thead>tr>th]:!text-gray-700"
              />
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-4"
          >
            {/* User Distribution */}
            <Card
              title={
                <span className="text-gray-900 font-semibold">
                  Phân bố người dùng
                </span>
              }
              className="border border-primary-100 rounded-2xl"
              bordered={false}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Ứng viên</span>
                    <span className="font-medium text-green-600">856</span>
                  </div>
                  <Progress
                    percent={67}
                    strokeColor="#10b981"
                    showInfo={false}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Nhà tuyển dụng</span>
                    <span className="font-medium text-blue-600">384</span>
                  </div>
                  <Progress
                    percent={30}
                    strokeColor="#4b5fbf"
                    showInfo={false}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Admin</span>
                    <span className="font-medium text-red-600">44</span>
                  </div>
                  <Progress percent={3} strokeColor="#ef4444" showInfo={false} />
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card
              title={
                <span className="text-gray-900 font-semibold">
                  Thống kê nhanh
                </span>
              }
              className="border border-primary-100 rounded-2xl"
              bordered={false}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircleOutlined className="text-green-600 text-xl" />
                    <span className="text-gray-700">Đã duyệt</span>
                  </div>
                  <span className="font-bold text-green-600">329</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ClockCircleOutlined className="text-orange-600 text-xl" />
                    <span className="text-gray-700">Chờ duyệt</span>
                  </div>
                  <span className="font-bold text-orange-600">23</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <TeamOutlined className="text-primary-600 text-xl" />
                    <span className="text-gray-700">Ứng tuyển</span>
                  </div>
                  <span className="font-bold text-primary-600">1,245</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}

