"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Dropdown,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FilterOutlined,
  MoreOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IJob } from "@/types/Job";
import { UIButton } from "@/components/UIButton";

// Sample data với nhiều việc làm
const sampleJobs: IJob[] = [
  {
    id: "1",
    title: "Senior Frontend Developer (ReactJS)",
    description: "Phát triển giao diện người dùng...",
    salary: "25-40 triệu",
    location: "Hà Nội",
    jobType: "fulltime",
    experienceLevel: "senior",
    categoryName: "Frontend",
    companyName: "FPT Software",
    status: "approved",
    viewCount: 1250,
    applicationCount: 45,
    isHot: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Backend Developer (NodeJS/Python)",
    description: "Xây dựng API và hệ thống backend...",
    salary: "30-50 triệu",
    location: "Hồ Chí Minh",
    jobType: "fulltime",
    experienceLevel: "middle",
    categoryName: "Backend",
    companyName: "VNG Corporation",
    status: "pending",
    viewCount: 890,
    applicationCount: 32,
    isUrgent: true,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    description: "Quản lý hệ thống CI/CD...",
    salary: "35-55 triệu",
    location: "Hồ Chí Minh",
    jobType: "fulltime",
    experienceLevel: "senior",
    categoryName: "DevOps",
    companyName: "Shopee Vietnam",
    status: "approved",
    viewCount: 650,
    applicationCount: 18,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Mobile Developer (React Native)",
    description: "Phát triển ứng dụng mobile...",
    salary: "25-40 triệu",
    location: "Hà Nội",
    jobType: "fulltime",
    experienceLevel: "middle",
    categoryName: "Mobile",
    companyName: "MoMo",
    status: "approved",
    viewCount: 420,
    applicationCount: 12,
    isHot: true,
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "AI/ML Engineer",
    description: "Nghiên cứu và phát triển AI...",
    salary: "40-70 triệu",
    location: "Hà Nội",
    jobType: "fulltime",
    experienceLevel: "senior",
    categoryName: "AI/ML",
    companyName: "VinAI",
    status: "pending",
    viewCount: 320,
    applicationCount: 8,
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    title: "Fullstack Developer (MERN Stack)",
    description: "Phát triển full-stack web application...",
    salary: "20-35 triệu",
    location: "Đà Nẵng",
    jobType: "fulltime",
    experienceLevel: "middle",
    categoryName: "Fullstack",
    companyName: "LogiGear",
    status: "approved",
    viewCount: 580,
    applicationCount: 22,
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    title: "UI/UX Designer",
    description: "Thiết kế giao diện và trải nghiệm người dùng...",
    salary: "15-25 triệu",
    location: "Hà Nội",
    jobType: "fulltime",
    experienceLevel: "junior",
    categoryName: "Design",
    companyName: "Tiki",
    status: "approved",
    viewCount: 720,
    applicationCount: 35,
    isUrgent: true,
    createdAt: "2024-01-09",
  },
  {
    id: "8",
    title: "QA/Tester (Manual & Automation)",
    description: "Kiểm thử chất lượng phần mềm...",
    salary: "12-20 triệu",
    location: "Hồ Chí Minh",
    jobType: "fulltime",
    experienceLevel: "junior",
    categoryName: "QA",
    companyName: "Gameloft",
    status: "approved",
    viewCount: 390,
    applicationCount: 28,
    createdAt: "2024-01-08",
  },
  {
    id: "9",
    title: "Data Analyst",
    description: "Phân tích dữ liệu và báo cáo...",
    salary: "18-30 triệu",
    location: "Hà Nội",
    jobType: "fulltime",
    experienceLevel: "middle",
    categoryName: "Data",
    companyName: "Grab Vietnam",
    status: "rejected",
    viewCount: 210,
    applicationCount: 5,
    createdAt: "2024-01-07",
  },
  {
    id: "10",
    title: "Business Analyst",
    description: "Phân tích nghiệp vụ và yêu cầu hệ thống...",
    salary: "20-35 triệu",
    location: "Hồ Chí Minh",
    jobType: "fulltime",
    experienceLevel: "middle",
    categoryName: "BA",
    companyName: "Vietcombank",
    status: "draft",
    viewCount: 0,
    applicationCount: 0,
    createdAt: "2024-01-06",
  },
];

const statusConfig = {
  draft: {
    label: "Nháp",
    color: "default",
    icon: <EditOutlined />,
  },
  pending: {
    label: "Chờ duyệt",
    color: "warning",
    icon: <ClockCircleOutlined />,
  },
  approved: {
    label: "Đã duyệt",
    color: "success",
    icon: <CheckCircleOutlined />,
  },
  rejected: {
    label: "Từ chối",
    color: "error",
    icon: <CloseCircleOutlined />,
  },
  expired: {
    label: "Hết hạn",
    color: "default",
    icon: <ExclamationCircleOutlined />,
  },
};

const jobTypeLabels = {
  fulltime: "Toàn thời gian",
  parttime: "Bán thời gian",
  remote: "Làm từ xa",
  contract: "Hợp đồng",
  internship: "Thực tập",
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<IJob[]>(sampleJobs);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: "Bạn có chắc chắn muốn xóa việc làm này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        setJobs(jobs.filter((job) => job.id !== id));
        message.success("Đã xóa việc làm!");
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một việc làm!");
      return;
    }

    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} việc làm đã chọn?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        setJobs(jobs.filter((job) => !selectedRowKeys.includes(job.id)));
        setSelectedRowKeys([]);
        message.success(`Đã xóa ${selectedRowKeys.length} việc làm!`);
      },
    });
  };

  const handleApprove = (id: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status: "approved" as const } : job,
      ),
    );
    message.success("Đã duyệt việc làm!");
  };

  const handleReject = (id: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status: "rejected" as const } : job,
      ),
    );
    message.success("Đã từ chối việc làm!");
  };

  const columns: ColumnsType<IJob> = [
    {
      title: "Việc làm",
      dataIndex: "title",
      key: "title",
      width: 300,
      render: (_, record) => (
        <div className="py-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 line-clamp-1">
              {record.title}
            </span>
            {record.isHot && (
              <Tag color="red" className="!text-xs !px-1.5 !py-0">
                🔥 Hot
              </Tag>
            )}
            {record.isUrgent && (
              <Tag color="orange" className="!text-xs !px-1.5 !py-0">
                ⚡ Gấp
              </Tag>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{record.companyName}</p>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      width: 120,
      render: (text) => <Tag className="!rounded-lg">{text}</Tag>,
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      width: 120,
    },
    {
      title: "Loại hình",
      dataIndex: "jobType",
      key: "jobType",
      width: 130,
      render: (type: keyof typeof jobTypeLabels) => (
        <span className="text-sm">{jobTypeLabels[type]}</span>
      ),
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      width: 130,
      render: (text) => (
        <span className="text-accent-600 font-medium">{text}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: keyof typeof statusConfig) => (
        <Tag
          icon={statusConfig[status].icon}
          color={statusConfig[status].color}
          className="!rounded-lg !px-2"
        >
          {statusConfig[status].label}
        </Tag>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "viewCount",
      key: "viewCount",
      width: 100,
      align: "center",
      render: (count) => (
        <span className="text-gray-600">{count?.toLocaleString() || 0}</span>
      ),
    },
    {
      title: "Ứng tuyển",
      dataIndex: "applicationCount",
      key: "applicationCount",
      width: 100,
      align: "center",
      render: (count) => (
        <span className="font-medium text-primary-600">{count || 0}</span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "Xem chi tiết",
                icon: <EyeOutlined />,
              },
              {
                key: "edit",
                label: "Chỉnh sửa",
                icon: <EditOutlined />,
                onClick: () => message.info("Chức năng đang phát triển"),
              },
              ...(record.status === "pending"
                ? [
                    {
                      type: "divider" as const,
                    },
                    {
                      key: "approve",
                      label: "Duyệt",
                      icon: <CheckCircleOutlined className="text-green-500" />,
                      onClick: () => handleApprove(record.id),
                    },
                    {
                      key: "reject",
                      label: "Từ chối",
                      icon: <CloseCircleOutlined className="text-red-500" />,
                      onClick: () => handleReject(record.id),
                    },
                  ]
                : []),
              {
                type: "divider" as const,
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

  const filteredJobs = jobs.filter((job) => {
    const matchKeyword =
      !searchKeyword ||
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchStatus = !filterStatus || job.status === filterStatus;
    return matchKeyword && matchStatus;
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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý việc làm</h1>
          <p className="text-gray-600 mt-1">
            Tổng cộng {filteredJobs.length} việc làm
          </p>
        </div>
        <UIButton
          variantCustom="primary"
          className="!h-10"
          onClick={() =>
            message.info("Chức năng thêm việc làm đang phát triển")
          }
        >
          <PlusOutlined className="mr-1" />
          Thêm việc làm
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
          <p className="text-sm text-gray-500">Tổng việc làm</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{jobs.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Đã duyệt</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {jobs.filter((j) => j.status === "approved").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Chờ duyệt</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {jobs.filter((j) => j.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Tổng ứng tuyển</p>
          <p className="text-2xl font-bold text-primary-600 mt-1">
            {jobs.reduce((acc, j) => acc + (j.applicationCount || 0), 0)}
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
            placeholder="Tìm kiếm việc làm, công ty..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="sm:w-80 !rounded-xl"
            allowClear
          />
          <Select
            placeholder="Trạng thái"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            className="sm:w-40 [&_.ant-select-selector]:!rounded-xl"
            options={[
              { value: "draft", label: "Nháp" },
              { value: "pending", label: "Chờ duyệt" },
              { value: "approved", label: "Đã duyệt" },
              { value: "rejected", label: "Từ chối" },
              { value: "expired", label: "Hết hạn" },
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
              Đã chọn <strong>{selectedRowKeys.length}</strong> việc làm
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
          dataSource={filteredJobs}
          rowKey="id"
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} việc làm`,
          }}
          scroll={{ x: 1200 }}
          className="[&_.ant-table-thead>tr>th]:!bg-primary-50 [&_.ant-table-thead>tr>th]:!text-gray-700 [&_.ant-table-thead>tr>th]:!font-semibold"
        />
      </motion.div>
    </div>
  );
}
