"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Table, Tag, Input, Select, Space } from "antd";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { demoJobs, type HRJob, type JobStatus } from "@/data/hr/demoData";

const statusConfig = {
  active: { label: "Đang tuyển", color: "success" },
  draft: { label: "Bản nháp", color: "default" },
  closed: { label: "Đã đóng", color: "error" },
  expired: { label: "Hết hạn", color: "warning" },
};

export default function HRJobsPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");

  const filteredJobs = demoJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnsType<HRJob> = [
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
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      render: (salary) => (
        <span className="font-medium text-gray-900">{salary}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: JobStatus) => (
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
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Link href={`/hr/jobs/${record.id}`}>
            <Button type="link" icon={<EyeOutlined />} size="small">
              Xem
            </Button>
          </Link>
          <Button type="link" icon={<EditOutlined />} size="small">
            Sửa
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý việc làm</h1>
          <p className="text-gray-600 mt-2">
            Quản lý tất cả các vị trí tuyển dụng của công ty
          </p>
        </div>
        <Link href="/hr/jobs/post">
          <Button type="primary" size="large" icon={<PlusOutlined />} className="!rounded-xl">
            Đăng việc làm mới
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 border border-primary-100"
      >
        <Space className="w-full" direction="vertical" size="middle">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Tìm kiếm việc làm..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 !rounded-xl"
              size="large"
            />
            <Select
              placeholder="Lọc theo trạng thái"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: "Tất cả" },
                { value: "active", label: "Đang tuyển" },
                { value: "draft", label: "Bản nháp" },
                { value: "closed", label: "Đã đóng" },
                { value: "expired", label: "Hết hạn" },
              ]}
              className="md:w-[200px] !rounded-xl"
              size="large"
            />
          </div>
        </Space>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-2xl border border-primary-100 overflow-hidden">
          <Table
            columns={columns}
            dataSource={filteredJobs}
            rowKey="id"
            pagination={{
              total: filteredJobs.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} việc làm`,
            }}
            className="[&_.ant-table-thead>tr>th]:!bg-primary-50 [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-thead>tr>th]:!text-gray-700"
          />
        </div>
      </motion.div>
    </div>
  );
}

