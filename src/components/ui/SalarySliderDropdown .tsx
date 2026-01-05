import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Popover, Slider } from "antd";

const SalarySliderDropdown = ({
  value,
  onChange,
  min,
  max,
}: {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
}) => {
  const content = (
    <div className="p-4 w-64">
      <div className="text-sm font-medium mb-3">
        {value[0]} – {value[1]} đ
      </div>

      <Slider
        range
        min={min}
        max={max}
        step={1}
        value={value}
        tooltip={{ formatter: (v) => `${v} đ` }}
        onChange={(v) => onChange(v as [number, number])}
      />

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{min} đ</span>
        <span>{max} đ</span>
      </div>
    </div>
  );

  const label =
    value[0] === min && value[1] === max
      ? "Salary"
      : `Salary: ${value[0]} – ${value[1]} đ`;

  return (
    <Popover content={content} trigger="click" placement="bottomLeft">
      <Button
        size="large"
        className="!h-10 !px-4 !rounded-lg !border-primary-200 hover:!border-primary-400 flex items-center gap-2"
        icon={<FilterOutlined />}
      >
        {label}
        <DownOutlined className="text-xs" />
      </Button>
    </Popover>
  );
};
export default SalarySliderDropdown;
