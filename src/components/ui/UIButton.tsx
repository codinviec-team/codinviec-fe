"use client";

import { Button as AntdButton, ButtonProps } from "antd";
import clsx from "clsx";

interface ButtonComponentProps extends ButtonProps {
  variantCustom?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "outlineGoogle";
}

export function UIButton({
  children,
  variantCustom = "primary",
  className,
  ...props
}: ButtonComponentProps) {
  const variantCustoms = {
    primary: "!bg-primary !text-white !border-none hover:!bg-primary-500",
    secondary: "!bg-secondary !text-white hover:!bg-secondary-600",
    accent: "!bg-accent !text-white hover:!bg-accent-400",
    outline: "!border !border-red-600 !text-red-400 hover:!bg-primary-100",
    outlineGoogle:
      "!border !border-red-600 !text-red-400 hover:!bg-primary-100",
  };

  return (
    <AntdButton
      type="text" // hoặc "default" nếu muốn có border nhẹ
      className={clsx(
        "!font-semibold !rounded-lg !transition-all !duration-200 !h-[44px] !text-[16px] !flex !items-center !justify-center gap-2",
        variantCustoms[variantCustom],
        className
      )}
      {...props}
    >
      {children}
    </AntdButton>
  );
}

