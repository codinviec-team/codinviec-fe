import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover } from "antd";

const CheckboxDropdown = ({
  label,
  values,
  options,
  onChange,
}: {
  label: string;
  values: string[];
  options: { label: string; value: string }[];
  onChange: (values: string[]) => void;
}) => {
  const overlay = (
    <div className="p-3 w-52 bg-white">
      <Checkbox.Group
        className="flex flex-col gap-2"
        value={values}
        onChange={(checked) => {
          console.log("checked", checked);
          onChange(checked as string[]);
        }}
      >
        {options.map((opt) => (
          <Checkbox key={opt.value} value={opt.value}>
            {opt.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );

  const labelText =
    values.length === 0
      ? label
      : values.length <= 2
      ? `${label}: ${values.join(", ")}`
      : `${label} (${values.length})`;

  return (
    <Popover
      content={overlay}
      trigger={"click"}
      placement="bottomLeft"
      autoAdjustOverflow={false}
    >
      <Button
        size="large"
        className="!h-10 !px-4 !rounded-lg !border-primary-200 hover:!border-primary-400 flex items-center gap-2"
        icon={<FilterOutlined />}
      >
        {labelText}
        <DownOutlined className="text-xs" />
      </Button>
    </Popover>
  );
};
export default CheckboxDropdown;
