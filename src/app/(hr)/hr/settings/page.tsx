"use client";

import {motion} from "framer-motion";
import {Button, Card, Divider, Form, Input, Switch} from "antd";
import {SaveOutlined} from "@ant-design/icons";

export default function HRSettingsPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-600 mt-2">
          Quản lý cài đặt tài khoản và hệ thống
        </p>
      </motion.div>

      {/* Settings Form */}
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
            className="max-w-3xl"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông báo</h2>
            <Form.Item
              label="Email thông báo khi có ứng viên mới"
              name="emailNewCandidate"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Email thông báo khi việc làm hết hạn"
              name="emailJobExpired"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Email thông báo khi có ứng viên ứng tuyển"
              name="emailNewApplication"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Divider />

            <h2 className="text-xl font-bold text-gray-900 mb-4">Tự động hóa</h2>
            <Form.Item
              label="Tự động đóng việc làm khi hết hạn"
              name="autoCloseJobs"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Tự động gửi email xác nhận cho ứng viên"
              name="autoSendConfirmation"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Divider />

            <h2 className="text-xl font-bold text-gray-900 mb-4">Bảo mật</h2>
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
            >
              <Input.Password size="large" className="!rounded-xl" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
            >
              <Input.Password size="large" className="!rounded-xl" />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
            >
              <Input.Password size="large" className="!rounded-xl" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" icon={<SaveOutlined />} className="!rounded-xl">
                Lưu cài đặt
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}

