"use client";
import { Form, FormProps, Input, Select } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { UiButton } from "../base/UiButton";
import clsx from "clsx";
import { motion } from "framer-motion";

type SearchCustomProps = FormProps & {
  showLocation?: boolean;
  locations?: Array<{ value: string; label: string }>;
  placeholder?: string;
  locationPlaceholder?: string;
  withBackground?: boolean;
};

type FieldType = {
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

const SearchCustom = ({
  className,
  showLocation = true,
  locations = defaultLocations,
  placeholder = "Nhập từ khóa, vị trí, công ty...",
  locationPlaceholder = "Địa điểm",
  withBackground = false,
  onFinish,
  ...props
}: SearchCustomProps) => {
  const handleSearch = (values: FieldType) => {
    if (onFinish) {
      onFinish(values);
    } else {
      console.log("Search:", values);
    }
  };

  const formContent = (
    <Form
      onFinish={handleSearch}
      className="flex flex-col md:flex-row gap-3"
      layout="vertical"
      {...props}
    >
      {showLocation && (
        <Form.Item name="location" className="md:w-[180px] !mb-0">
          <Select
            size="large"
            placeholder={locationPlaceholder}
            options={locations}
            defaultValue="all"
            suffixIcon={
              <EnvironmentOutlined className="text-primary-400" />
            }
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
        />
      </Form.Item>

      <Form.Item className="!mb-0">
        <UiButton
          htmlType="submit"
          variantCustom="accent"
          className="!h-[52px] !px-8 !text-base !font-bold"
        >
          <SearchOutlined className="mr-1" />
          Tìm kiếm
        </UiButton>
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

export default SearchCustom;
