import { Tag } from "antd";
import { ReactNode } from "react";

type TagTableProps = {
  colorTag?: string;
  children: ReactNode;
};

const TagTable = ({ colorTag = "success", children }: TagTableProps) => {
  return (
    <Tag color={colorTag} className="!rounded-lg">
      {children}
    </Tag>
  );
};

export default TagTable;
