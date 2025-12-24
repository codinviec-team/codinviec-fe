import { UIButton } from "@/components/ui/UIButton";
import { IUser } from "@/types/auth/User";
import {
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Card,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  Select,
  Switch,
} from "antd";
import { motion } from "framer-motion";
import { FormPropsProfiles } from "./ProfileClients";

const optionGender = [
  {
    value: "male",
    label: "Nam",
  },
  { value: "female", label: "Nữ" },
];

type generalInfoType = {
  user: IUser;
  form: FormInstance;
  handleSubmit: (values: FormPropsProfiles) => Promise<void>;
  editing: boolean;
  handleCancel: () => void;
  submitting: boolean;
};

const GeneralInfo = ({
  user,
  form,
  handleSubmit,
  editing,
  handleCancel,
  submitting,
}: generalInfoType) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="lg:col-span-2"
    >
      <Card className="border border-primary-100 rounded-2xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={!editing}
        >
          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin cá nhân
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label="Họ"
                rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Nhập họ"
                  className="!rounded-xl"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Tên"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Nhập tên"
                  className="!rounded-xl"
                  size="large"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Email"
                className="!rounded-xl"
                size="large"
                disabled
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item name="phone" label="Số điện thoại">
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="Số điện thoại"
                  className="!rounded-xl"
                  size="large"
                />
              </Form.Item>

              <Form.Item name="gender" label="Giới tính">
                <Select
                  placeholder="Chọn giới tính"
                  className="!rounded-xl"
                  size="large"
                  options={optionGender}
                ></Select>
              </Form.Item>
            </div>

            <Form.Item name="birthDate" label="Ngày sinh">
              <DatePicker
                className="w-full !rounded-xl"
                size="large"
                format="DD/MM/YYYY"
                placeholder="Chọn ngày sinh"
              />
            </Form.Item>

            <Form.Item name="address" label="Địa điểm">
              <Input
                placeholder="Gò vắp..."
                className="!rounded-xl"
                size="large"
              />
            </Form.Item>
          </div>

          <Divider />

          {/* Additional Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin bổ sung
            </h3>

            <Form.Item name="education" label="Học vấn">
              <Input
                placeholder="VD: Đại học, Cao đẳng..."
                className="!rounded-xl"
                size="large"
              />
            </Form.Item>

            <Form.Item name="websiteLink" label="Website/Link cá nhân">
              <Input
                prefix={<GlobalOutlined className="text-gray-400" />}
                placeholder="https://..."
                className="!rounded-xl"
                size="large"
              />
            </Form.Item>

            {user?.role?.roleName === "ROLE_USER" && (
              <Form.Item
                name="isFindJob"
                label="Đang tìm việc"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Có"
                  unCheckedChildren="Không"
                  className="!bg-gray-300 [&.ant-switch-checked]:!bg-green-500"
                />
              </Form.Item>
            )}
          </div>

          {/* Action Buttons */}
          {editing && (
            <div className="flex gap-3 justify-end pt-4 border-t border-primary-100">
              <UIButton
                onClick={handleCancel}
                size="large"
                className="!rounded-xl"
              >
                Hủy
              </UIButton>
              <UIButton
                htmlType="submit"
                variantCustom="primary"
                className="!h-10"
                loading={submitting}
              >
                <SaveOutlined className="mr-1" />
                Lưu thay đổi
              </UIButton>
            </div>
          )}
        </Form>
      </Card>
    </motion.div>
  );
};

export default GeneralInfo;
