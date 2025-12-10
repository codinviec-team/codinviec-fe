"use client";

import {motion} from "framer-motion";
import {useAppSelector} from "@/hooks/hooks";
import {RootState} from "@/store";
import {
    BarChartOutlined,
    EyeOutlined,
    FileTextOutlined,
    PlusCircleOutlined,
    RiseOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Button, Card, Col, Row, Statistic, Table, Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import Link from "next/link";
import {demoHRStats, demoJobs, type HRJob} from "@/data/hr/demoData";

const statusConfig = {
  active: { label: "Đang tuyển", color: "success" },
  draft: { label: "Bản nháp", color: "default" },
  closed: { label: "Đã đóng", color: "error" },
  expired: { label: "Hết hạn", color: "warning" },
};

export default function HRDashboardPage() {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "HR Manager";

  // Get recent jobs (last 4)
  const recentJobs = demoJobs.slice(0, 4).map((job) => ({
    key: job.id.toString(),
    ...job,
    date: job.postedAt,
  }));

  const columns: ColumnsType<HRJob & { key: string; date: string }> = [
    {
      title: "Vị trí tuyển dụng",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.department} • {record.location}</div>
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
        <span className="font-semibold text-primary-600">{apps}</span>
      ),
    },
    {
      title: "Ngày đăng",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span className="text-gray-500 text-sm">{date}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Link href={`/hr/jobs/${record.id}`}>
          <Button type="link" size="small">
            Xem chi tiết
          </Button>
        </Link>
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Xin chào, {displayName}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý tuyển dụng và ứng viên của bạn
            </p>
          </div>
          <Link href="/hr/jobs/post">
            <Button type="primary" size="large" className="!rounded-xl">
              + Đăng việc làm mới
            </Button>
          </Link>
        </div>
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
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Việc làm đang tuyển
                  </span>
                }
                value={demoHRStats.activeJobs}
                prefix={
                  <FileTextOutlined className="text-accent-600 text-2xl" />
                }
                suffix={
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <RiseOutlined />
                    <span>3</span>
                  </div>
                }
                valueStyle={{ color: "#4db6ac", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Tổng ứng viên
                  </span>
                }
                value={demoHRStats.totalCandidates}
                prefix={<UserOutlined className="text-primary-600 text-2xl" />}
                suffix={
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <RiseOutlined />
                    <span>24%</span>
                  </div>
                }
                valueStyle={{ color: "#5a3fa6", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Ứng viên mới
                  </span>
                }
                value={demoHRStats.newCandidates}
                prefix={
                  <TeamOutlined className="text-accent-400 text-2xl" />
                }
                suffix={
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <RiseOutlined />
                    <span>12%</span>
                  </div>
                }
                valueStyle={{ color: "#4db6ac", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Tổng lượt xem
                  </span>
                }
                value={demoHRStats.totalViews}
                prefix={<EyeOutlined className="text-secondary-500 text-2xl" />}
                suffix={
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <RiseOutlined />
                    <span>18%</span>
                  </div>
                }
                valueStyle={{ color: "#4b5fbf", fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* Recent Jobs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card
          className="border border-primary-100 rounded-2xl"
          title={
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                Việc làm gần đây
              </span>
              <Link href="/hr/jobs">
                <Button type="link" className="!text-accent-600">
                  Xem tất cả →
                </Button>
              </Link>
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={recentJobs}
            pagination={false}
            className="[&_.ant-table-thead>tr>th]:!bg-primary-50 [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-thead>tr>th]:!text-gray-700"
          />
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-primary-50 to-accent-50"
            >
              <Link href="/hr/jobs/post">
                <div className="text-center">
                  <PlusCircleOutlined className="text-4xl text-accent-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    Đăng việc làm mới
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tạo tin tuyển dụng mới cho công ty của bạn
                  </p>
                </div>
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-accent-50 to-primary-50"
            >
              <Link href="/hr/candidates">
                <div className="text-center">
                  <UserOutlined className="text-4xl text-primary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    Xem ứng viên
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quản lý và xem hồ sơ ứng viên
                  </p>
                </div>
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              className="border border-primary-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-secondary-50 to-primary-50"
            >
              <Link href="/hr/analytics">
                <div className="text-center">
                  <BarChartOutlined className="text-4xl text-secondary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    Xem thống kê
                  </h3>
                  <p className="text-sm text-gray-600">
                    Phân tích hiệu quả tuyển dụng
                  </p>
                </div>
              </Link>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
}

