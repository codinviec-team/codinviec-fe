import Link from "next/link";
import React from "react";

type TagCustomerProps = {
  href?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const TagKeyWordComponent = ({
  href,
  children,
  ...props
}: TagCustomerProps) => {
  return href ? (
    <Link
      href={href ? href : "#"}
      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button
      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
      {...props}
    >
      {children}
    </button>
  );
};
export default TagKeyWordComponent;
