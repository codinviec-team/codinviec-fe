"use client";

import { Button as AntdButton, ButtonProps } from "antd";
import clsx from "clsx";

interface ButtonComponentProps extends ButtonProps {
  variantCustom?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "outlineGoogle"
    | "primarySmall";
}

export function UIButton({
  children,
  variantCustom = "primary",
  className,
  ...props
}: ButtonComponentProps) {
  const variantCustoms = {
    primary:
      "!bg-primary !font-semibold !text-white !border-none hover:!bg-primary-500 !h-[44px] !text-[16px] ",
    primarySmall:
      "!bg-primary !font-semibold !text-white !border-none hover:!bg-primary-500 !h-[26px] !text-[12px]",
    secondary:
      "!bg-secondary  !text-white hover:!bg-secondary-600 !h-[44px] !text-[16px] ",
    accent:
      "!bg-accent !font-semibold !text-white hover:!bg-accent-400 !h-[44px] !text-[16px] ",
    outline:
      "!border !font-semibold !border-red-600 !text-red-400 hover:!bg-primary-100 !h-[44px] !text-[16px] ",
    outlineGoogle:
      "!border !font-semibold !border-red-600 !text-red-400 hover:!bg-primary-100 !h-[44px] !text-[16px] ",
  };

  return (
    <AntdButton
      type="text" // hoặc "default" nếu muốn có border nhẹ
      className={clsx(
        " !rounded-lg !transition-all !duration-200 !flex !items-center !justify-center gap-2",
        variantCustoms[variantCustom],
        className
      )}
      {...props}
    >
      {children}
    </AntdButton>
  );
}
