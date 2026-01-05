import React from "react";

type TagCustomerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const TagCustomer = ({ children, ...props }: TagCustomerProps) => {
  return (
    <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full">
      {children}
    </span>
  );
};
export default TagCustomer;
