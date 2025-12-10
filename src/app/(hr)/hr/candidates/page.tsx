"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Table, Tag, Input, Select, Avatar, Button } from "antd";
import { SearchOutlined, EyeOutlined, StarOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { demoCandidates, type Candidate } from "@/data/hr/demoData";

const statusConfig = {
  new: { label: "Mới", color: "blue" },
  reviewing: { label: "Đang xem xét", color: "orange" },
  interviewing: { label: "Phỏng vấn", color: "purple" },
  accepted: { label: "Chấp nhận", color: "success" },
  rejected: { label: "Từ chối", color: "error" },
};

export default function HRCandidatesPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<Candidate["status"] | "all">("all");

  const filteredCandidates = demoCandidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchText.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnsType<Candidate> = [
    {
      title: "Ứng viên",
      key: "candidate",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} size={40}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Vị trí ứng tuyển",
      dataIndex: "appliedFor",
      key: "appliedFor",
      render: (text) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div className="flex items-center gap-1">
          <StarOutlined className="text-yellow-500" />
          <span className="font-medium">{rating?.toFixed(1)}</span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: Candidate["status"]) => (
        <Tag color={statusConfig[status].color} className="!rounded-lg">
          {statusConfig[status].label}
        </Tag>
      ),
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "appliedAt",
      key: "appliedAt",
      render: (date) => (
        <span className="text-gray-500 text-sm">{date}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Link href={`/hr/candidates/${record.id}`}>
          <Button type="link" icon={<EyeOutlined />} size="small">
            Xem chi tiết
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Quản lý ứng viên</h1>
        <p className="text-gray-600 mt-2">
          Xem và quản lý tất cả ứng viên ứng tuyển
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 border border-primary-100"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Tìm kiếm ứng viên..."
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
              { value: "new", label: "Mới" },
              { value: "reviewing", label: "Đang xem xét" },
              { value: "interviewing", label: "Phỏng vấn" },
              { value: "accepted", label: "Chấp nhận" },
              { value: "rejected", label: "Từ chối" },
            ]}
            className="md:w-[200px] !rounded-xl"
            size="large"
          />
        </div>
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
            dataSource={filteredCandidates}
            rowKey="id"
            pagination={{
              total: filteredCandidates.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} ứng viên`,
            }}
            className="[&_.ant-table-thead>tr>th]:!bg-primary-50 [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-thead>tr>th]:!text-gray-700"
          />
        </div>
      </motion.div>
    </div>
  );
}

