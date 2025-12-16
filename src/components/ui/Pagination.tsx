import { Pagination, PaginationProps } from "antd";
import clsx from "clsx";

type PaginationComponentProps = PaginationProps;

const PaginationComponent = ({
  className = "",
  defaultCurrent = 1,
  total = 50,
  ...props
}: PaginationComponentProps) => {
  return (
    <div className={clsx(className, "flex justify-center items-center")}>
      <Pagination defaultCurrent={defaultCurrent} total={total} {...props} />
    </div>
  );
};
export default PaginationComponent;
