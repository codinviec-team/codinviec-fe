import clsx from "clsx";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={clsx(
        "w-full container mx-auto px-[6rem] max-xl:px-[40px] max-lg:px-[32px] max-sm:px-[16px] py-[60px]",
        className
      )}
    >
      {children}
    </div>
  );
};
export default Container;

