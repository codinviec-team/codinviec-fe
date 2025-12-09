"use client";

import { motion } from "framer-motion";
import { Card, Form, Input, Button, Upload, Avatar } from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";

export default function HRCompanyPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Company updated:", values);
    // Handle update company logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Thông tin công ty</h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông tin và cài đặt công ty
        </p>
      </motion.div>

      {/* Company Info Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border border-primary-100 rounded-2xl">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: "FPT Software",
              industry: "Software Outsourcing",
              size: "5,000 - 10,000",
              location: "Hà Nội, Hồ Chí Minh, Đà Nẵng",
              website: "https://fptsoftware.com",
              description: "FPT Software là công ty phần mềm hàng đầu Việt Nam với hơn 30 năm kinh nghiệm.",
            }}
            className="max-w-3xl"
          >
            <Form.Item label="Logo công ty">
              <div className="flex items-center gap-4">
                <Avatar size={80} src="https://placehold.co/120x60/6b46c1/ffffff?text=FPT" />
                <Upload>
                  <Button icon={<UploadOutlined />} className="!rounded-xl">
                    Tải lên logo mới
                  </Button>
                </Upload>
              </div>
            </Form.Item>

            <Form.Item
              label="Tên công ty"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
            >
              <Input size="large" className="!rounded-xl" />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Ngành nghề"
                name="industry"
                rules={[{ required: true, message: "Vui lòng nhập ngành nghề" }]}
              >
                <Input size="large" className="!rounded-xl" />
              </Form.Item>

              <Form.Item
                label="Quy mô"
                name="size"
                rules={[{ required: true, message: "Vui lòng nhập quy mô" }]}
              >
                <Input size="large" className="!rounded-xl" />
              </Form.Item>

              <Form.Item
                label="Địa điểm"
                name="location"
                rules={[{ required: true, message: "Vui lòng nhập địa điểm" }]}
              >
                <Input size="large" className="!rounded-xl" />
              </Form.Item>

              <Form.Item
                label="Website"
                name="website"
              >
                <Input size="large" className="!rounded-xl" />
              </Form.Item>
            </div>

            <Form.Item
              label="Mô tả công ty"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <Input.TextArea rows={6} className="!rounded-xl" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" icon={<SaveOutlined />} className="!rounded-xl">
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}

