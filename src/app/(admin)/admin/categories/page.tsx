"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Button, Dropdown, Form, Input, message, Modal, Switch, Table, Tag, Tooltip, Tree,} from "antd";
import type {ColumnsType} from "antd/es/table";
import type {DataNode} from "antd/es/tree";
import {
    AppstoreOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    FolderOutlined,
    MoreOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import {UIButton} from "@/components/ui/UIButton";

interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  parentName?: string;
  jobCount: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  children?: ICategory[];
}

// Sample categories data với hierarchy
const sampleCategories: ICategory[] = [
  {
    id: "1",
    name: "Frontend Developer",
    slug: "frontend-developer",
    description: "Phát triển giao diện người dùng",
    parentId: null,
    jobCount: 850,
    isActive: true,
    order: 1,
    createdAt: "2024-01-01",
    children: [
      {
        id: "1-1",
        name: "ReactJS",
        slug: "reactjs",
        parentId: "1",
        parentName: "Frontend Developer",
        jobCount: 450,
        isActive: true,
        order: 1,
        createdAt: "2024-01-01",
      },
      {
        id: "1-2",
        name: "VueJS",
        slug: "vuejs",
        parentId: "1",
        parentName: "Frontend Developer",
        jobCount: 200,
        isActive: true,
        order: 2,
        createdAt: "2024-01-01",
      },
      {
        id: "1-3",
        name: "Angular",
        slug: "angular",
        parentId: "1",
        parentName: "Frontend Developer",
        jobCount: 150,
        isActive: true,
        order: 3,
        createdAt: "2024-01-01",
      },
    ],
  },
  {
    id: "2",
    name: "Backend Developer",
    slug: "backend-developer",
    description: "Phát triển phía máy chủ",
    parentId: null,
    jobCount: 720,
    isActive: true,
    order: 2,
    createdAt: "2024-01-01",
    children: [
      {
        id: "2-1",
        name: "NodeJS",
        slug: "nodejs",
        parentId: "2",
        parentName: "Backend Developer",
        jobCount: 320,
        isActive: true,
        order: 1,
        createdAt: "2024-01-01",
      },
      {
        id: "2-2",
        name: "Java Spring",
        slug: "java-spring",
        parentId: "2",
        parentName: "Backend Developer",
        jobCount: 280,
        isActive: true,
        order: 2,
        createdAt: "2024-01-01",
      },
      {
        id: "2-3",
        name: "Python Django",
        slug: "python-django",
        parentId: "2",
        parentName: "Backend Developer",
        jobCount: 120,
        isActive: true,
        order: 3,
        createdAt: "2024-01-01",
      },
    ],
  },
  {
    id: "3",
    name: "Mobile Developer",
    slug: "mobile-developer",
    description: "Phát triển ứng dụng di động",
    parentId: null,
    jobCount: 380,
    isActive: true,
    order: 3,
    createdAt: "2024-01-01",
    children: [
      {
        id: "3-1",
        name: "React Native",
        slug: "react-native",
        parentId: "3",
        parentName: "Mobile Developer",
        jobCount: 200,
        isActive: true,
        order: 1,
        createdAt: "2024-01-01",
      },
      {
        id: "3-2",
        name: "Flutter",
        slug: "flutter",
        parentId: "3",
        parentName: "Mobile Developer",
        jobCount: 180,
        isActive: true,
        order: 2,
        createdAt: "2024-01-01",
      },
    ],
  },
  {
    id: "4",
    name: "DevOps/Cloud",
    slug: "devops-cloud",
    description: "DevOps và điện toán đám mây",
    parentId: null,
    jobCount: 290,
    isActive: true,
    order: 4,
    createdAt: "2024-01-01",
  },
  {
    id: "5",
    name: "AI/ML",
    slug: "ai-ml",
    description: "Trí tuệ nhân tạo và Machine Learning",
    parentId: null,
    jobCount: 180,
    isActive: false,
    order: 5,
    createdAt: "2024-01-01",
  },
  {
    id: "6",
    name: "Data Engineer",
    slug: "data-engineer",
    description: "Kỹ sư dữ liệu",
    parentId: null,
    jobCount: 240,
    isActive: true,
    order: 6,
    createdAt: "2024-01-01",
  },
];

// Flatten categories for table view
const flattenCategories = (categories: ICategory[]): ICategory[] => {
  const result: ICategory[] = [];
  categories.forEach((cat) => {
    result.push(cat);
    if (cat.children) {
      cat.children.forEach((child) => {
        result.push({ ...child, parentName: cat.name });
      });
    }
  });
  return result;
};

// Convert to tree data for tree view
const convertToTreeData = (categories: ICategory[]): DataNode[] => {
  return categories.map((cat) => ({
    key: cat.id,
    title: (
      <div className="flex items-center gap-2 py-1">
        <span className="font-medium">{cat.name}</span>
        <Tag className="!text-xs">{cat.jobCount} jobs</Tag>
        {!cat.isActive && <Tag color="red">Inactive</Tag>}
      </div>
    ),
    children: cat.children ? convertToTreeData(cat.children) : undefined,
  }));
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(sampleCategories);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "tree">("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [form] = Form.useForm();

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content:
        "Bạn có chắc chắn muốn xóa danh mục này? Danh mục con cũng sẽ bị xóa.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        setCategories(categories.filter((cat) => cat.id !== id));
        message.success("Đã xóa danh mục!");
      },
    });
  };

  const handleToggleStatus = (id: string) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === id) {
          return { ...cat, isActive: !cat.isActive };
        }
        if (cat.children) {
          return {
            ...cat,
            children: cat.children.map((child) =>
              child.id === id ? { ...child, isActive: !child.isActive } : child
            ),
          };
        }
        return cat;
      })
    );
    message.success("Đã cập nhật trạng thái!");
  };

  const handleOpenModal = (category?: ICategory) => {
    setEditingCategory(category || null);
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
    setModalOpen(true);
  };

  const handleSave = async (values: Partial<ICategory>) => {
    try {
      // TODO: Call API
      if (editingCategory) {
        message.success("Đã cập nhật danh mục!");
      } else {
        message.success("Đã thêm danh mục mới!");
      }
      setModalOpen(false);
      form.resetFields();
    } catch {
      message.error("Có lỗi xảy ra!");
    }
  };

  const columns: ColumnsType<ICategory> = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (name, record) => (
        <div className="flex items-center gap-2">
          {record.parentId && <span className="text-gray-400 ml-4">└</span>}
          <FolderOutlined className="text-primary-500" />
          <span className={record.parentId ? "text-gray-600" : "font-medium"}>
            {name}
          </span>
        </div>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: 180,
      render: (slug) => <code className="text-sm text-gray-600">{slug}</code>,
    },
    {
      title: "Danh mục cha",
      dataIndex: "parentName",
      key: "parentName",
      width: 150,
      render: (parent) =>
        parent ? <Tag>{parent}</Tag> : <span className="text-gray-400">-</span>,
    },
    {
      title: "Số việc làm",
      dataIndex: "jobCount",
      key: "jobCount",
      width: 120,
      align: "center",
      render: (count) => (
        <span className="font-medium text-primary-600">{count}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 120,
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleStatus(record.id)}
          checkedChildren="Hiện"
          unCheckedChildren="Ẩn"
          className="!bg-gray-300 [&.ant-switch-checked]:!bg-green-500"
        />
      ),
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
                key: "edit",
                label: "Chỉnh sửa",
                icon: <EditOutlined />,
                onClick: () => handleOpenModal(record),
              },
              {
                key: "addChild",
                label: "Thêm danh mục con",
                icon: <PlusOutlined />,
                disabled: !!record.parentId,
                onClick: () =>
                  message.info("Chức năng thêm danh mục con đang phát triển"),
              },
              {
                type: "divider",
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

  const flattenedCategories = flattenCategories(categories);
  const filteredCategories = flattenedCategories.filter(
    (cat) =>
      !searchKeyword ||
      cat.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600 mt-1">
            Tổng cộng {categories.length} danh mục chính
          </p>
        </div>
        <Button
          className="!h-10"
          onClick={() => handleOpenModal()}
        >
          <PlusOutlined className="mr-1" />
          Thêm danh mục
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Danh mục chính</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {categories.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Danh mục con</p>
          <p className="text-2xl font-bold text-primary-600 mt-1">
            {categories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {flattenedCategories.filter((c) => c.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-primary-100">
          <p className="text-sm text-gray-500">Tổng việc làm</p>
          <p className="text-2xl font-bold text-accent-600 mt-1">
            {categories
              .reduce((acc, cat) => acc + cat.jobCount, 0)
              .toLocaleString()}
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
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Input
            placeholder="Tìm kiếm danh mục..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="sm:w-80 !rounded-xl"
            allowClear
          />
          <div className="flex gap-2">
            <Tooltip title="Xem dạng bảng">
              <Button
                icon={<UnorderedListOutlined />}
                type={viewMode === "table" ? "primary" : "default"}
                onClick={() => setViewMode("table")}
                className="!rounded-xl"
              />
            </Tooltip>
            <Tooltip title="Xem dạng cây">
              <Button
                icon={<AppstoreOutlined />}
                type={viewMode === "tree" ? "primary" : "default"}
                onClick={() => setViewMode("tree")}
                className="!rounded-xl"
              />
            </Tooltip>
            <Tooltip title="Làm mới">
              <Button
                icon={<ReloadOutlined />}
                onClick={() => setSearchKeyword("")}
                className="!rounded-xl"
              />
            </Tooltip>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden"
      >
        {viewMode === "table" ? (
          <Table
            columns={columns}
            dataSource={filteredCategories}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 15,
              showTotal: (total) => `Tổng ${total} danh mục`,
            }}
            scroll={{ x: 900 }}
            className="[&_.ant-table-thead>tr>th]:!bg-primary-50 [&_.ant-table-thead>tr>th]:!text-gray-700 [&_.ant-table-thead>tr>th]:!font-semibold"
          />
        ) : (
          <div className="p-6">
            <Tree
              treeData={convertToTreeData(categories)}
              defaultExpandAll
              showLine={{ showLeafIcon: false }}
              className="[&_.ant-tree-node-content-wrapper]:!py-1"
            />
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        className="[&_.ant-modal-content]:!rounded-2xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input
              placeholder="VD: Frontend Developer"
              className="!rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
          >
            <Input
              placeholder="VD: frontend-developer"
              className="!rounded-xl"
            />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} className="!rounded-xl" />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Trạng thái"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch
              checkedChildren="Hiện"
              unCheckedChildren="Ẩn"
              className="!bg-gray-300 [&.ant-switch-checked]:!bg-green-500"
            />
          </Form.Item>

          <div className="flex gap-3 justify-end mt-6">
            <Button onClick={() => setModalOpen(false)} className="!rounded-xl">
              Hủy
            </Button>
            <UIButton htmlType="submit" variantCustom="primary" className="!h-10">
              {editingCategory ? "Cập nhật" : "Thêm mới"}
            </UIButton>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

