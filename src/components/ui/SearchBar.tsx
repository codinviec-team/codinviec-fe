"use client";
import { UIButton } from "@/components/ui/UIButton";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, FormProps, Input, Select } from "antd";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

type SearchBarProps = FormProps & {
  showLocation?: boolean;
  locations?: Array<{ value: string; label: string }>;
  placeholder?: string;
  locationPlaceholder?: string;
  withBackground?: boolean;
  defaultValuesSearch?: string;
  onKeywordChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export type SearchFormFields = {
  keyword?: string;
  location?: string;
};

const defaultLocations = [
  { value: "all", label: "Tất cả thành phố" },
  { value: "hanoi", label: "Hà Nội" },
  { value: "hcm", label: "Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  { value: "other", label: "Khác" },
];

const SearchBar = ({
  className,
  showLocation = true,
  locations = defaultLocations,
  placeholder = "Nhập từ khóa, vị trí, công ty...",
  locationPlaceholder = "Địa điểm",
  withBackground = false,
  defaultValuesSearch = "",
  onKeywordChange,
  onFinish,
  ...props
}: SearchBarProps) => {
  const handleSearch = (values: SearchFormFields) => {
    if (onFinish) {
      onFinish(values);
    }
  };
  const formContent = (
    <Form
      form={props?.form}
      onFinish={handleSearch}
      className="flex flex-col md:flex-row gap-3"
      layout="vertical"
      // giá trị mặc định của form
      initialValues={{
        keyword: defaultValuesSearch,
        location: "all",
      }}
      {...props}
    >
      {showLocation && (
        <Form.Item name="location" className="md:w-[180px] !mb-0">
          <Select
            size="large"
            placeholder={locationPlaceholder}
            options={locations}
            suffixIcon={<EnvironmentOutlined className="text-primary-400" />}
            className="!h-[52px] w-full [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border-primary-200 [&_.ant-select-selection-item]:!leading-[52px]"
          />
        </Form.Item>
      )}

      <Form.Item name="keyword" className="flex-1 !mb-0">
        <Input
          size="large"
          placeholder={placeholder}
          className="!h-[52px] !text-base !rounded-xl !border-primary-200 hover:!border-primary-400 focus:!border-primary-500"
          allowClear
          onChange={onKeywordChange}
        />
      </Form.Item>

      <Form.Item className="!mb-0">
        <UIButton
          htmlType="submit"
          variantCustom="accent"
          className="!h-[52px] !px-8 !text-base !font-bold max-md:!w-full"
        >
          <SearchOutlined className="mr-1" />
          Tìm kiếm
        </UIButton>
      </Form.Item>
    </Form>
  );

  if (withBackground) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={clsx(
          "bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl max-w-3xl mx-auto",
          className
        )}
      >
        {formContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={clsx("w-full", className)}
    >
      {formContent}
    </motion.div>
  );
};

export default SearchBar;
