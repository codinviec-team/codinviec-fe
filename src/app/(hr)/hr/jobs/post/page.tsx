"use client";

import {motion} from "framer-motion";
import {Button, Card, Form, Input, Select, Space} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import Link from "next/link";

const { TextArea } = Input;
const { Option } = Select;

export default function HRPostJobPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    router.push("/hr/jobs");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/hr/jobs">
          <Button icon={<ArrowLeftOutlined />} className="!rounded-xl">
            Quay lại
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Đăng việc làm mới</h1>
          <p className="text-gray-600 mt-2">
            Tạo tin tuyển dụng mới cho công ty của bạn
          </p>
        </div>
      </motion.div>

      {/* Form */}
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
            className="max-w-4xl"
          >
            <Form.Item
              label="Tiêu đề việc làm"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input size="large" placeholder="VD: Senior Frontend Developer" className="!rounded-xl" />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Phòng ban"
                name="department"
                rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
              >
                <Select size="large" placeholder="Chọn phòng ban" className="!rounded-xl">
                  <Option value="engineering">Engineering</Option>
                  <Option value="design">Design</Option>
                  <Option value="data">Data</Option>
                  <Option value="qa">Quality Assurance</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Địa điểm"
                name="location"
                rules={[{ required: true, message: "Vui lòng chọn địa điểm" }]}
              >
                <Select size="large" placeholder="Chọn địa điểm" className="!rounded-xl">
                  <Option value="hanoi">Hà Nội</Option>
                  <Option value="hcm">Hồ Chí Minh</Option>
                  <Option value="danang">Đà Nẵng</Option>
                  <Option value="remote">Remote</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Mức lương"
                name="salary"
                rules={[{ required: true, message: "Vui lòng nhập mức lương" }]}
              >
                <Input size="large" placeholder="VD: 25 - 40 triệu" className="!rounded-xl" />
              </Form.Item>

              <Form.Item
                label="Kinh nghiệm"
                name="experience"
                rules={[{ required: true, message: "Vui lòng chọn kinh nghiệm" }]}
              >
                <Select size="large" placeholder="Chọn kinh nghiệm" className="!rounded-xl">
                  <Option value="0-1">0-1 năm</Option>
                  <Option value="1-2">1-2 năm</Option>
                  <Option value="2-4">2-4 năm</Option>
                  <Option value="3-5">3-5 năm</Option>
                  <Option value="5+">5+ năm</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Loại công việc"
                name="jobType"
                rules={[{ required: true, message: "Vui lòng chọn loại công việc" }]}
              >
                <Select size="large" placeholder="Chọn loại công việc" className="!rounded-xl">
                  <Option value="fulltime">Full-time</Option>
                  <Option value="parttime">Part-time</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="internship">Internship</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Trạng thái"
                name="status"
                initialValue="draft"
              >
                <Select size="large" className="!rounded-xl">
                  <Option value="draft">Bản nháp</Option>
                  <Option value="active">Đăng ngay</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Mô tả công việc"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea
                rows={6}
                placeholder="Mô tả chi tiết về vị trí công việc..."
                className="!rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label="Yêu cầu"
              name="requirements"
              rules={[{ required: true, message: "Vui lòng nhập yêu cầu" }]}
            >
              <TextArea
                rows={4}
                placeholder="Liệt kê các yêu cầu cho vị trí này (mỗi yêu cầu một dòng)..."
                className="!rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label="Lợi ích"
              name="benefits"
            >
              <TextArea
                rows={4}
                placeholder="Liệt kê các lợi ích (mỗi lợi ích một dòng)..."
                className="!rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label="Tags (cách nhau bởi dấu phẩy)"
              name="tags"
            >
              <Input size="large" placeholder="VD: React, TypeScript, Next.js" className="!rounded-xl" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" size="large" className="!rounded-xl">
                  Đăng việc làm
                </Button>
                <Button size="large" onClick={() => router.back()} className="!rounded-xl">
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}

