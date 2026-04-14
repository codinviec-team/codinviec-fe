import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type DivProps = HTMLAttributes<HTMLDivElement>;

type BlogListProps = {
  children: ReactNode;
  className?: string;
} & DivProps;

const BlogList = ({ children, className, ...rest }: BlogListProps) => {
  return (
    <div
      className={clsx(
        className,
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
export default BlogList;
