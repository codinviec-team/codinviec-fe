"use client";

import { motion } from "framer-motion";
import { Card, Row, Col, Statistic, Progress } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  EyeOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { demoHRStats } from "@/data/hr/demoData";

export default function HRAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Thống kê tuyển dụng</h1>
        <p className="text-gray-600 mt-2">
          Phân tích hiệu quả tuyển dụng và ứng viên
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border border-primary-100 rounded-2xl">
              <Statistic
                title="Tổng việc làm"
                value={demoHRStats.totalJobs}
                prefix={<FileTextOutlined className="text-accent-600 text-2xl" />}
                valueStyle={{ color: "#4db6ac", fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border border-primary-100 rounded-2xl">
              <Statistic
                title="Tổng ứng viên"
                value={demoHRStats.totalCandidates}
                prefix={<UserOutlined className="text-primary-600 text-2xl" />}
                valueStyle={{ color: "#5a3fa6", fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border border-primary-100 rounded-2xl">
              <Statistic
                title="Tổng lượt xem"
                value={demoHRStats.totalViews}
                prefix={<EyeOutlined className="text-secondary-500 text-2xl" />}
                valueStyle={{ color: "#4b5fbf", fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border border-primary-100 rounded-2xl">
              <Statistic
                title="Đã chấp nhận"
                value={demoHRStats.accepted}
                prefix={<CheckCircleOutlined className="text-green-600 text-2xl" />}
                valueStyle={{ color: "#10b981", fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* Conversion Rates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border border-primary-100 rounded-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tỷ lệ chuyển đổi</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Xem → Ứng tuyển</span>
                <span className="font-semibold text-gray-900">
                  {((demoHRStats.totalApplications / demoHRStats.totalViews) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress
                percent={(demoHRStats.totalApplications / demoHRStats.totalViews) * 100}
                strokeColor="#4db6ac"
                showInfo={false}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Ứng tuyển → Phỏng vấn</span>
                <span className="font-semibold text-gray-900">
                  {((demoHRStats.interviewScheduled / demoHRStats.totalApplications) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress
                percent={(demoHRStats.interviewScheduled / demoHRStats.totalApplications) * 100}
                strokeColor="#5a3fa6"
                showInfo={false}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Phỏng vấn → Chấp nhận</span>
                <span className="font-semibold text-gray-900">
                  {((demoHRStats.accepted / demoHRStats.interviewScheduled) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress
                percent={(demoHRStats.accepted / demoHRStats.interviewScheduled) * 100}
                strokeColor="#10b981"
                showInfo={false}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

