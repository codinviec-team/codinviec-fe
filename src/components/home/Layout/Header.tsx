"use client";
import dynamic from "next/dynamic";

const HeaderClient = dynamic(() => import("./HeaderClient"), { ssr: false });

const Header = () => {
  return <HeaderClient />;
};
export default Header;
