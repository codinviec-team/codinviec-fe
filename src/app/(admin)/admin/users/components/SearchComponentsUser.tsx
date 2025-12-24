import { UIButton } from "@/components/ui/UIButton";
import { RoleType } from "@/types/auth/Role";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Tooltip } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { motion } from "framer-motion";
import React, { ChangeEvent } from "react";

type SearchComponentUserType = {
  dataRoles: RoleType[];
  searchKeyword: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterRole: string | null;
  handleRoleChange: (
    value: string | null,
    option?: DefaultOptionType | DefaultOptionType[]
  ) => void;
  filterStatus: string | null;
  handleStatusChange: (
    value: string | null,
    option?: DefaultOptionType | DefaultOptionType[]
  ) => void;
  handleResetFilter: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const STATUS_OPTION = [
  { value: "active", label: "Hoạt động" },
  { value: "block", label: "Bị khóa" },
];

const SearchComponentUser = ({
  dataRoles,
  searchKeyword,
  handleSearchChange,
  filterRole,
  handleRoleChange,
  filterStatus,
  handleStatusChange,
  handleResetFilter,
}: SearchComponentUserType) => {
  return (
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
          onChange={handleSearchChange}
          className="sm:w-80 !rounded-xl"
          allowClear
        />
        <Select
          placeholder="Vai trò"
          value={filterRole}
          onChange={handleRoleChange}
          allowClear
          className="sm:w-40 [&_.ant-select-selector]:!rounded-xl"
          options={
            dataRoles?.map((role) => {
              return {
                ...role,
                value: role.id,
                label: role.roleName,
              };
            }) || []
          }
        />
        <Select
          placeholder="Trạng thái"
          value={filterStatus}
          onChange={handleStatusChange}
          allowClear
          className="sm:w-40 [&_.ant-select-selector]:!rounded-xl"
          options={STATUS_OPTION}
        />
        <div className="flex gap-2 sm:ml-auto">
          <Tooltip title="Làm mới">
            <Button
              icon={<ReloadOutlined />}
              onClick={handleResetFilter}
              className="!rounded-xl"
            />
          </Tooltip>
        </div>
      </div>
      {/* Bulk Actions
      {selectedRowKeys.length > 0 && (
        <div className="mt-4 pt-4 border-t border-primary-100 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Đã chọn <strong>{selectedRowKeys.length}</strong> người dùng
          </span>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            // onClick={handleBulkDelete}
          >
            Xóa đã chọn
          </Button>
          <Button size="small" onClick={() => setSelectedRowKeys([])}>
            Bỏ chọn
          </Button>
        </div>
      )} */}
    </motion.div>
  );
};
export default SearchComponentUser;
